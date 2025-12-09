import { useState, useEffect } from "react";
import { supabase } from "../supabaseclient";

export default function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newOrder, setNewOrder] = useState({
    cust_name: "",
    prod_id: "",
    qty: "",
  });

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  async function fetchOrders() {
    const { data, error } = await supabase.from("orders").select(`
      *,
      orderdetails (*)
    `);
    if (!error) setOrders(data);
    else console.error("Error fetching orders:", error.message);
  }

  async function fetchProducts() {
    const { data, error } = await supabase.from("product").select("*");
    if (!error) setProducts(data);
    else console.error("Error fetching products:", error.message);
  }

  async function createOrder() {
    if (user.role !== "admin") return alert("You cannot create orders!");

    const selectedProduct = products.find((p) => p.id === newOrder.prod_id);
    if (!selectedProduct) return alert("Please select a product.");

    const qty = parseInt(newOrder.qty, 10);
    if (isNaN(qty) || qty <= 0) return alert("Enter a valid quantity.");

    const { data: latestProd, error: stockError } = await supabase
      .from("product")
      .select("stock, price")
      .eq("id", newOrder.prod_id)
      .single();

    if (stockError) return alert("Failed to check stock.");
    if (!latestProd) return alert("Product not found.");

    if (qty > latestProd.stock) {
      return alert(
        `Not enough stock! Available: ${latestProd.stock}, Requested: ${qty}`
      );
    }

    const { data: orderData, error: orderErr } = await supabase
      .from("orders")
      .insert([
        { cust_name: newOrder.cust_name, status: "pending", usr_id: user.id },
      ])
      .select();

    if (orderErr) return alert(orderErr.message);

    const orderId = orderData[0].id;
    const totalPrice = latestProd.price * qty;

    const { error: detailErr } = await supabase.from("orderdetails").insert([
      {
        prod_id: newOrder.prod_id,
        qty,
        total_price: totalPrice,
        ord_id: orderId,
      },
    ]);
    if (detailErr) return alert(detailErr.message);

    const { error: updateErr } = await supabase
      .from("product")
      .update({ stock: latestProd.stock - qty })
      .eq("id", newOrder.prod_id);
    if (updateErr) return alert(updateErr.message);

    alert("Order created successfully!");
    setNewOrder({ cust_name: "", prod_id: "", qty: "" });
    fetchOrders();
    fetchProducts();
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Orders</h3>

      {user.role === "admin" && (
        <div className="border p-3 rounded mb-3">
          <h5 className="text-center mb-3">Create New Order</h5>
          <input
            className="form-control mb-2"
            placeholder="Customer Name"
            value={newOrder.cust_name}
            onChange={(e) =>
              setNewOrder({ ...newOrder, cust_name: e.target.value })
            }
          />
          <select
            className="form-select mb-2"
            value={newOrder.prod_id}
            onChange={(e) =>
              setNewOrder({ ...newOrder, prod_id: e.target.value })
            }
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (Stock: {p.stock})
              </option>
            ))}
          </select>
          <input
            className="form-control mb-2"
            type="number"
            placeholder="Quantity"
            min="1"
            max={
              newOrder.prod_id
                ? products.find((p) => p.id === newOrder.prod_id)?.stock || 1
                : 1
            }
            value={newOrder.qty}
            onChange={(e) => setNewOrder({ ...newOrder, qty: e.target.value })}
          />
          <button className="btn btn-success w-100" onClick={createOrder}>
            Add Order
          </button>
        </div>
      )}

      <div className="table-responsive shadow-sm">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary text-center">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Products</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No orders available.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => {
                const orderTotal = order.orderdetails?.reduce(
                  (sum, item) => sum + item.total_price,
                  0
                );

                // Combine product names and qtys cleanly (no bullet list)
                const productNames = order.orderdetails
                  ?.map((d) => {
                    const product = products.find((p) => p.id === d.prod_id);
                    return product ? product.name : "Unknown";
                  })
                  .join(", ");

                const productQtys = order.orderdetails
                  ?.map((d) => d.qty)
                  .join(", ");

                return (
                  <tr key={order.id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{order.cust_name}</td>
                    <td className="text-capitalize text-center">
                      {order.status}
                    </td>
                    <td>{productNames || <em>No items</em>}</td>
                    <td className="text-center">{productQtys || "-"}</td>
                    <td className="text-center">Rp. {orderTotal || 0}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
