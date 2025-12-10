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
    const { data, error } = await supabase
      .from("product")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async deleteProduct(id) {
    const { error } = await supabase.from("product").delete().eq("id", id);
    if (error) throw error;
  }
}

module.exports = ProductModel;
