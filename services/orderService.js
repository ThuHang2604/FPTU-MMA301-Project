import api from './api';

const orderService = {
  async getOrderHistory() {
    try {
      const response = await api.get('/orders/history');
      return response.data.orders; 
    } catch (error) {
      console.error('❌ Failed to fetch order history:', error);
      throw error;
    }
  },
};

export default orderService;
