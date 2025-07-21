import api from "./api";

const ProductService = {
  getAllProducts: async (filters = {}) => {
    try {
      const response = await api.get("/products", { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // get product detail
  getProductById: async (productId) => {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default ProductService;
