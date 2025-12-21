import api from "./axios";

export const fetchOrders = () => api.get("/orders");

export const createOrder = (payload) => api.post("/orders", payload);

export const updateOrder = (id, payload) => api.put(`/orders/${id}`, payload);

export const deleteOrder = (id) => api.delete(`/orders/${id}`);
