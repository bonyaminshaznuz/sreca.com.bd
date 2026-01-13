import api from './axios';

// Signup API
export const signup = async (userData) => {
  try {
    const response = await api.post('/account/api/signup/', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      'confirm-password': userData.confirmPassword,
    });
    return response.data;
  } catch (error) {
    // Extract error message from response
    const errorData = error.response?.data || {};
    const errorMessage = errorData.message || error.message || 'An error occurred during signup';
    throw { message: errorMessage, data: errorData };
  }
};

// Login API
export const login = async (email, password) => {
  try {
    const response = await api.post('/account/api/login/', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    // Extract error message from response
    const errorData = error.response?.data || {};
    const errorMessage = errorData.message || error.message || 'An error occurred during login';
    throw { message: errorMessage, data: errorData };
  }
};

// Forgot Password - Send OTP
export const sendPasswordResetOTP = async (email) => {
  try {
    const response = await api.post('/account/api/forgot-password/send-otp/', {
      email,
    });
    return response.data;
  } catch (error) {
    const errorData = error.response?.data || {};
    const errorMessage = errorData.message || error.message || 'An error occurred';
    throw { message: errorMessage, data: errorData };
  }
};

// Forgot Password - Verify OTP
export const verifyPasswordResetOTP = async (email, otp) => {
  try {
    const response = await api.post('/account/api/forgot-password/verify-otp/', {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    const errorData = error.response?.data || {};
    const errorMessage = errorData.message || error.message || 'An error occurred';
    throw { message: errorMessage, data: errorData };
  }
};

// Forgot Password - Reset Password
export const resetPassword = async (email, otp, password, confirmPassword) => {
  try {
    const response = await api.post('/account/api/forgot-password/reset/', {
      email,
      otp,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    const errorData = error.response?.data || {};
    const errorMessage = errorData.message || error.message || 'An error occurred';
    throw { message: errorMessage, data: errorData };
  }
};

// Forgot Password - Resend OTP
export const resendPasswordResetOTP = async (email) => {
  try {
    const response = await api.post('/account/api/forgot-password/resend-otp/', {
      email,
    });
    return response.data;
  } catch (error) {
    const errorData = error.response?.data || {};
    const errorMessage = errorData.message || error.message || 'An error occurred';
    throw { message: errorMessage, data: errorData };
  }
};

// Profile API functions
export const getProfile = async (userId) => {
  try {
    const response = await api.get('/account/api/profile/', {
      params: { user_id: userId }
    });
    return response.data;
  } catch (error) {
    const errorData = error.response?.data || {};
    const errorMessage = errorData.message || error.message || 'An error occurred';
    throw { message: errorMessage, data: errorData };
  }
};

export const updateProfile = async (profileData, imageFile = null) => {
  try {
    // If image file exists, use FormData, otherwise use JSON
    if (imageFile) {
      const formData = new FormData();
      
      // Append all profile data fields
      Object.keys(profileData).forEach(key => {
        if (profileData[key] !== null && profileData[key] !== undefined) {
          formData.append(key, profileData[key]);
        }
      });
      
      // Append image file
      formData.append('profile_image', imageFile);
      
      const response = await api.post('/account/api/profile/update/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // No image, send as JSON
      const response = await api.post('/account/api/profile/update/', profileData);
      return response.data;
    }
  } catch (error) {
    const errorData = error.response?.data || {};
    const errorMessage = errorData.message || error.message || 'An error occurred';
    throw { message: errorMessage, data: errorData };
  }
};
