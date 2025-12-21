import { useState, useEffect } from "react";
import { fetchOrders, createOrder, deleteOrder } from "../api/orders";
import { fetchProducts } from "../api/products";

export default function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newOrder, setNewOrder] = useState({
    cust_name: "",
    prod_id: "",
    qty: "",
  });

  /* =========================
     FETCH DATA (ON LOAD)
  ========================== */
  useEffect(() => {
    loadOrders();
    loadProducts();
  }, []);

  async function loadOrders() {
    try {
      const res = await fetchOrders();
      setOrders(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  async function loadProducts() {
    try {
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  /* =========================
     CREATE ORDER
  ========================== */
  async function handleCreateOrder() {
    if (user.role !== "admin") {
      return alert("You are not allowed to create orders");
    }

    if (!newOrder.cust_name || !newOrder.prod_id || !newOrder.qty) {
      return alert("Please fill all fields");
    }

    const payload = {
      order: {
        cust_name: newOrder.cust_name,
        usr_id: user.id,
      },
      items: [
        {
          prod_id: newOrder.prod_id,
          qty: Number(newOrder.qty),
        },
      ],
    };

    try {
      await createOrder(payload);
      alert("Order created successfully!");
      setNewOrder({ cust_name: "", prod_id: "", qty: "" });
      loadOrders();
      loadProducts();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create order");
    }
  }

  /* =========================
     DELETE ORDER
  ========================== */
  async function handleDeleteOrder(id) {
    if (!window.confirm("Delete this order?")) return;

    try {
      await deleteOrder(id);
      loadOrders();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete order");
    }
  }

  /* =========================
     RENDER
  ========================== */
  return (
    <div className="page-container">
      {/* =========================
          LEFT SIDE – ORDERS TABLE
      ========================== */}
      <div className="page-left">
        <h3 className="fw-bold mb-3">Orders</h3>

        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-warning">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Products</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No orders
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => {
                  const total = order.orderdetails?.reduce(
                    (sum, d) => sum + d.total_price,
                    0
                  );

                  const productNames = order.orderdetails
                    ?.map((d) => d.product?.name)
                    .join(", ");

                  const qtys = order.orderdetails
                    ?.map((d) => d.qty)
                    .join(", ");

                  return (
                    <tr key={order.id}>
                      <td>{index + 1}</td>
                      <td>{order.cust_name}</td>
                      <td>{order.status}</td>
                      <td>{productNames}</td>
                      <td>{qtys}</td>
                      <td>Rp {total}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================
          RIGHT SIDE – CREATE ORDER
      ========================== */}
      <div className="page-right">
        {user.role === "admin" && (
          <div className="mb-4">
            <h6 className="fw-semibold mb-3">Create Order</h6>

            <div className="d-flex flex-column align-items-center gap-2 w-100">
              <input
                className="form-control w-50"
                placeholder="Customer Name"
                value={newOrder.cust_name}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, cust_name: e.target.value })
                }
              />

              <select
                className="form-control w-50"
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
                type="number"
                className="form-control w-50"
                placeholder="Qty"
                value={newOrder.qty}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, qty: e.target.value })
                }
              />

              <button
                className="btn btn-success px-4 mt-2"
                onClick={handleCreateOrder}
              >
                Add Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
