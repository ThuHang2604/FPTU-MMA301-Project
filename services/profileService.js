import api from './api';

const ProfileService = {
  // get user's profile
  getProfile: async () => {
    try {
      const response = await api.get('/profile'); 
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // edit profile
  updateProfile: async ({ username, email, phoneNumber, address }) => {
    try {
      const response = await api.put('/profile', {
        username,
        email,
        phoneNumber,
        address,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default ProfileService;
