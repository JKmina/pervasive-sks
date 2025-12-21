import { useEffect, useState } from "react";
import inventoryApi from "../api/inventory";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await inventoryApi.getInventory();
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async () => {
    try {
      await inventoryApi.createProduct({
        ...newProduct,
        stock: Number(newProduct.stock),
        price: Number(newProduct.price),
      });

      setNewProduct({ name: "", category: "", stock: "", price: "" });
      fetchProducts(); // refresh table
    } catch (err) {
      setError("Failed to add product");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await inventoryApi.deleteProduct(id);
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product.id);
    setNewProduct({
      name: product.name,
      category: product.category,
      stock: product.stock,
      price: product.price,
    });
  };

  const saveEdit = async () => {
    try {
      await inventoryApi.updateProduct(editingProduct, {
        ...newProduct,
        stock: Number(newProduct.stock),
        price: Number(newProduct.price),
      });

      setEditingProduct(null);
      setNewProduct({ name: "", category: "", stock: "", price: "" });
      fetchProducts();
    } catch (err) {
      setError("Failed to update product");
    }
  };



  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
  });

  const [editingProduct, setEditingProduct] = useState(null);


  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page-container">
      <div className="page-left">
        <h3 className="fw-bold mb-3">Inventory Manager</h3>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-warning">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price (Rp)</th>
                <th></th>
                <th></th>
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
                    <td className="text-center">
                      <button className="btn btn-warning btn-sm" onClick={()=> startEdit(products)}>
                        Edit 
                      </button>
                    </td>
                    <td className="text-center">
                      <button className = "btn btn-warning btn-sm" onClick={()=>deleteProduct(products.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="page-right">
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
            <button
              className={`btn ${editingProduct ? "btn-primary" : "btn-success"} px-4 mt-2`}
              onClick={editingProduct ? saveEdit : addProduct}
            >
              {editingProduct ? "Save Changes" : "Add"}
            </button>
          </div>

          <div className="rfid-container mt-4">
            <h6 className="fw-semibold mb-3">RFID Reader</h6>
            <div className="d-flex flex-column align-items-center gap-2 w-100">
              <input
                className="form-control w-50"
                placeholder="RFID"
              />
              <button className="btn btn-success px-4 mt-2">Scan</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
