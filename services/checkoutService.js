import api from './api';

const CheckoutService = {
  createPaypalOrder: async () => {
    try {
      const response = await api.post('/payment/paypal/create');
      return response.data; // { id, links }
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  capturePaypalOrder: async (token, userId) => {
    try {
      const response = await api.get(`/payment/paypal-success?token=${token}&userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default CheckoutService;
