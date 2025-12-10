const supabase = require("../config/db");

class UserModel {
  static async getAllUsers() {
    const { data, error } = await supabase.from("user").select("*");
    if (error) throw error;
    return data;
  }

  static async getUserById(id) {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  }

  static async getUserByUsername(username) {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("username", username)
      .single();
    if (error) throw error;
    return data;
  }

  static async createUser(payload) {
    const { data, error } = await supabase
      .from("user")
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

module.exports = UserModel;
