import supabase from "./supabase";

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
  try {
    const { data, error } = await supabase
      .from("cabins")
      .insert([newCabin])
      .select();

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Yeni kabin eklenirken hata oluştu:", err.message);
    throw err;
  }
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
