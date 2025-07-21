// services/checkoutService.js
import api from './api';

/**
 * CheckoutService: Giao tiếp với backend để tạo/capture thanh toán PayPal
 */
const CheckoutService = {
  /**
   * Tạo PayPal Order (sẽ redirect người dùng sang PayPal)
   * @returns {Promise<{id: string, links: array}>}
   */
  createPaypalOrder: async () => {
    try {
      const response = await api.post('/payment/paypal/create');
      return response.data; // { id, links }
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Capture kết quả thanh toán sau khi PayPal redirect
   * (hàm này thường dùng trong web, với React Native nên xử lý redirect từ WebView)
   * @param {string} token - PayPal order token
   * @param {string|number} userId - ID người dùng
   */
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
