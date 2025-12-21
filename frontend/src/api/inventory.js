import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

const getInventory = () => axios.get(API_URL);
const getProductsById = (id) => axios.get(`${API_URL}/${id}`);
const createProduct = (data) => axios.post(API_URL, data);
const updateProduct = (id, data) => axios.put(`${API_URL}/${id}`, data);
const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);

const inventoryApi = {
  getInventory,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default inventoryApi;
