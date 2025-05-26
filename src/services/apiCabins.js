import supabase from "./supabase";
const supabaseUrl = import.meta.env.VITE_API_URL;

export const getCabins = async () => {
  try {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Cabins verisi alınamadı");
    }

    return data;
  } catch (err) {
    console.error("getCabins catch hatası:", err);
    throw err;
  }
};

export const createEditCabin = async (newCabin, id) => {
  const isEditing = Boolean(id);
  const isFile = newCabin.image && typeof newCabin.image === "object";

  let imageUrl = newCabin.image;

  if (isFile) {
    const imageFile = newCabin.image;
    const imageName = `${Date.now()}-${imageFile.name}`.replaceAll("/", "");

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, imageFile, {
        cacheControl: "3600",
        upsert: true,
        contentType: imageFile.type,
      });

    if (storageError) {
      console.error(storageError);
      throw new Error("Resim yüklenemedi!");
    }

    imageUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  const cabinData = {
    ...newCabin,
    image: imageUrl,
  };

  if (isFile) delete cabinData.image;

  let query = supabase.from("cabins");

  if (!isEditing) {
    const { data, error } = await query
      .insert([{ ...cabinData, image: imageUrl }])
      .select()
      .single();

    if (error) {
      console.error(error);
      throw new Error("Kabin verisi kaydedilemedi!");
    }

    return data;
  }

  // Güncelleme yap
  const { data, error } = await query
    .update({ ...cabinData, image: imageUrl })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Kabin güncellenemedi!");
  }

  return data;
};

export const deleteCabin = async (id) => {
  try {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
      console.error("Supabase delete error:", error);
      throw new Error("Cabin silinemedi");
    }

    return id;
  } catch (err) {
    console.error("deleteCabin catch hatası:", err);
    throw err;
  }
};
