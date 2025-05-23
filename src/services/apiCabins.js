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
