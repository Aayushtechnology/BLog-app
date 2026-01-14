import api from './config'

export const authApi = {
  register: async (userData) => {
    const response = await api.post('/api/auth/register', {
      username: userData.username,
      email: userData.email,
      userNumber: userData.userNumber,
      password: userData.password,
    })
    return response.data
  },

  login: async (credentials) => {
    const response = await api.post('/api/auth/login', {
      email: credentials.email,
      password: credentials.password,
    })
    return response.data
  },

  forgotPassword: async (email) => {
    const response = await api.post('/api/auth/forgotpassword', { email })
    return response.data
  },

  verifyOTP: async (email, otp) => {
    const response = await api.post('/api/auth/verifyotp', { email, otp })
    return response.data
  },

  resetPassword: async (email, newPassword, confirmPassword) => {
    const response = await api.post('/api/auth/resetpassword', {
      email,
      newPassword,
      confirmPassword,
    })
    return response.data
  },
}
