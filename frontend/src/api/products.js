import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const fetchProducts = () => {
  return axios.get(API_URL);
};
