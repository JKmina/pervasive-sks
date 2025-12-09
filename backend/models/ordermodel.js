const supabase = require("../config/db");

class OrderModel {
  static async getAllOrders() {
    const { data, error } = await supabase.from("orders").select("*");

    if (error) throw error;
    return data;
  }

  static async getOrderById(id) {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createOrder(order) {
    const { data, error } = await supabase
      .from("orders")
      .insert([order])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateOrder(id, updateData) {
    const { error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", id);

    if (error) throw error;
  }

  static async deleteOrder(id) {
    const { error } = await supabase.from("orders").delete().eq("id", id);

    if (error) throw error;
  }
}

module.exports = OrderModel;
