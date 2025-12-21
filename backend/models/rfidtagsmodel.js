const supabase = require("../config/db");

class RFIDTagsModel {
  static async getAllTags() {
    const { data, error } = await supabase.from("rfidtags").select("*");
    if (error) throw error;
    return data;
  }

  static async getTagsForProduct(prod_id) {
    const { data, error } = await supabase
      .from("rfidtags")
      .select("*")
      .eq("prod_id", prod_id);
    if (error) throw error;
    return data;
  }

  static async createTag(payload) {
    const { data, error } = await supabase
      .from("rfidtags")
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

module.exports = RFIDTagsModel;
