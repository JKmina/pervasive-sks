const supabase = require("../config/db");

class OrderModel {
  /** =========================
   * GET ALL ORDERS (with details + product)
   ========================== */
  static async getAllOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        cust_name,
        status,
        usr_id,
        created_at,
        orderdetails (
          id,
          prod_id,
          qty,
          total_price,
          product:product (
            id,
            name,
            price
          )
        )
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  /** =========================
   * GET ORDER BY ID
   ========================== */
  static async getOrderById(id) {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        cust_name,
        status,
        usr_id,
        created_at,
        orderdetails (
          id,
          prod_id,
          qty,
          total_price,
          product:product (
            id,
            name,
            price
          )
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  /** =========================
   * CREATE ORDER + DETAILS + STOCK (SAFE)
   ========================== */
  static async createOrder({ order, items }) {
    let createdOrder = null;

    try {
      /* =========================
         1️⃣ Fetch products (price + stock)
      ========================== */
      const productIds = items.map((i) => i.prod_id);

      const { data: products, error: productError } = await supabase
        .from("product")
        .select("id, price, stock")
        .in("id", productIds);

      if (productError) throw productError;

      /* =========================
         2️⃣ Validate stock
      ========================== */
      for (const item of items) {
        const product = products.find((p) => p.id === item.prod_id);

        if (!product) throw new Error("Product not found");
        if (item.qty <= 0)
          throw new Error("Quantity must be greater than zero");

        if (product.stock < item.qty) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }
      }

      /* =========================
         3️⃣ Create order
      ========================== */
      const { data: newOrder, error: orderError } = await supabase
        .from("orders")
        .insert([order])
        .select()
        .single();

      if (orderError) throw orderError;
      createdOrder = newOrder;

      /* =========================
         4️⃣ Insert order details
      ========================== */
      const orderDetails = items.map((item) => {
        const product = products.find((p) => p.id === item.prod_id);

        return {
          ord_id: newOrder.id,
          prod_id: item.prod_id,
          qty: item.qty,
          total_price: product.price * item.qty,
        };
      });

      const { error: detailError } = await supabase
        .from("orderdetails")
        .insert(orderDetails);

      if (detailError) throw detailError;

      /* =========================
         5️⃣ Deduct stock
      ========================== */
      for (const item of items) {
        const product = products.find((p) => p.id === item.prod_id);

        const { error: stockError } = await supabase
          .from("product")
          .update({ stock: product.stock - item.qty })
          .eq("id", product.id);

        if (stockError) throw stockError;
      }

      return {
        orderId: newOrder.id,
        message: "Order created successfully",
      };
    } catch (err) {
      /* =========================
         🔥 ROLLBACK
      ========================== */
      if (createdOrder) {
        await supabase
          .from("orderdetails")
          .delete()
          .eq("ord_id", createdOrder.id);

        await supabase.from("orders").delete().eq("id", createdOrder.id);
      }

      throw err;
    }
  }

  /** =========================
   * UPDATE ORDER + DETAILS + STOCK (SAFE)
   ========================== */
  static async updateOrder(id, { order, items }) {
    try {
      /* =========================
         1️⃣ Get old details
      ========================== */
      const { data: oldDetails, error: oldError } = await supabase
        .from("orderdetails")
        .select("prod_id, qty")
        .eq("ord_id", id);

      if (oldError) throw oldError;

      /* =========================
         2️⃣ Restore old stock
      ========================== */
      for (const d of oldDetails) {
        const { data: product } = await supabase
          .from("product")
          .select("stock")
          .eq("id", d.prod_id)
          .single();

        await supabase
          .from("product")
          .update({ stock: product.stock + d.qty })
          .eq("id", d.prod_id);
      }

      /* =========================
         3️⃣ Update order
      ========================== */
      const { error: orderError } = await supabase
        .from("orders")
        .update(order)
        .eq("id", id);

      if (orderError) throw orderError;

      /* =========================
         4️⃣ Remove old details
      ========================== */
      await supabase.from("orderdetails").delete().eq("ord_id", id);

      /* =========================
         5️⃣ Re-create details safely
      ========================== */
      return await this.createOrder({
        order: { ...order, id },
        items,
      });
    } catch (err) {
      throw err;
    }
  }

  /** =========================
   * DELETE ORDER (RESTORE STOCK)
   ========================== */
  static async deleteOrder(id) {
    // restore stock first
    const { data: details } = await supabase
      .from("orderdetails")
      .select("prod_id, qty")
      .eq("ord_id", id);

    for (const d of details) {
      const { data: product } = await supabase
        .from("product")
        .select("stock")
        .eq("id", d.prod_id)
        .single();

      await supabase
        .from("product")
        .update({ stock: product.stock + d.qty })
        .eq("id", d.prod_id);
    }

    await supabase.from("orderdetails").delete().eq("ord_id", id);
    await supabase.from("orders").delete().eq("id", id);

    return { message: "Order deleted successfully" };
  }
}

module.exports = OrderModel;
