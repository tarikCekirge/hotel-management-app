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

export const createCabin = async (newCabin) => {
  const imageFile = newCabin.image;
  const imageName = `${Date.now()}-${imageFile.name}`.replaceAll("/", "");

  // 1. Görseli Supabase Storage'a yükle
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, imageFile, {
      cacheControl: "3600",
      upsert: false,
      contentType: imageFile.type,
    });

  if (storageError) {
    console.error(storageError);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Resim yüklenemedi!");
  }

  // 2. Görselin public URL'ini oluştur
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 3. Veritabanına kayıt
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: publicUrl }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Kabin verisi kaydedilemedi!");
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
