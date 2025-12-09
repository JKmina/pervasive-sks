const supabase = require("../config/db");

class OrderDetailModel {
  static async getDetailsByOrderId(orderId) {
    const { data, error } = await supabase
      .from("orderdetails")
      .select("*")
      .eq("ord_id", orderId);

    if (error) throw error;
    return data;
  }

  static async addMultiple(items) {
    const { error } = await supabase.from("orderdetails").insert(items);

    if (error) throw error;
  }

  static async deleteDetailsByOrderId(orderId) {
    const { error } = await supabase
      .from("orderdetails")
      .delete()
      .eq("ord_id", orderId);

    if (error) throw error;
  }
}

module.exports = OrderDetailModel;
