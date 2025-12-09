import { useState, useEffect } from "react";
import { supabase } from "../supabaseclient";

export default function Inventory({ user }) {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from("product").select("*");
    if (error) console.error(error);
    else setProducts(data);
  }

  async function addProduct() {
    const { error } = await supabase.from("product").insert([newProduct]);
    if (error) alert(error.message);
    else {
      setNewProduct({ name: "", stock: "", price: "", category: "" });
      fetchProducts();
    }
  }

  return (
    <div className="container mt-5 text-center">
      <h3 className="fw-bold mb-3">Inventory</h3>

      {/* Add Product Section */}
      <div className="mb-4">
        <h6 className="fw-semibold mb-3">Add New Product</h6>
        <div className="d-flex flex-column align-items-center gap-2 w-100">
          <input
            className="form-control w-50"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            className="form-control w-50"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
          />
          <input
            className="form-control w-50"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            className="form-control w-50"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          />
          <button className="btn btn-success px-4 mt-2" onClick={addProduct}>
            Add
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-warning">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price (Rp)</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No products yet
                </td>
              </tr>
            ) : (
              products.map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.stock}</td>
                  <td>{p.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
