/// <reference types="vite/client" />

export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL,
    API_VERSION: import.meta.env.VITE_API_VERSION,
    TIMEOUT: 10000,
    RETRY_ATTEMPS: 3,
    RETRY_DELAY: 1000
} as const;

export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}/auth/login`,
      REGISTER: `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}/auth/register`,
      LOGOUT: `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}/auth/logout`,
      REFRESH: `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}/auth/refresh`,
      ME: `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}/auth/me`,
      FORGOT_PASSWORD: `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}/auth/forgot-password`,
      RESET_PASSWORD: `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION }/auth/reset-password`,
    },
    USERS: {
      BASE: `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}/users`,
      PROFILE: `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}/users/profile`,
      UPDATE_PROFILE: `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}/users/profile`,
    },
  } as const;