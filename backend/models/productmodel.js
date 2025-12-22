const supabase = require("../config/db");

class ProductModel {
  static async getAllProducts() {
    const { data, error } = await supabase.from("product").select("*");
    if (error) throw error;
    return data;
  }

  static async getProductById(id) {
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  }

  static async createProduct(payload) {
    const { data, error } = await supabase
      .from("product")
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async updateProduct(id, payload) {
    // 1. Kita 'bersihkan' data biar sesuai kolom database
    const cleanData = {
      name: payload.name,
      category: payload.category,
      stock: payload.stock,
      price: payload.price,
    };

    // 2. Debugging: Cek apa yang dikirim di terminal backend
    console.log("Update ID:", id);
    console.log("Data:", cleanData);

    const { data, error } = await supabase
      .from("products") // <--- CEK INI: 'product' atau 'products'? Sesuaikan dg Supabase!
      .update(cleanData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.log("Error Supabase:", error.message); // Biar ketahuan errornya apa
      throw error;
    }
    return data;
  }

  static async deleteProduct(id) {
    const { error } = await supabase.from("product").delete().eq("id", id);
    if (error) throw error;
  }
}

module.exports = ProductModel;
