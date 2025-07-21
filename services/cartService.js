// services/cartService.js
import api from './api';

const CartService = {
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  addToCart: async (data) => {
    try {
      const response = await api.post('/cart', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  removeFromCart: async (productId) => {
    try {
      const response = await api.delete(`/cart/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateCartItem: async (productId, quantity) => {
    try {
      const response = await api.put(`/cart/${productId}`, { quantity });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default CartService;
