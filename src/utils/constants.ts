export const APP_NAME = 'Juspay Dashboard';

export const DRAWER_WIDTH = {
  LEFT: 240,
  RIGHT: 320,
};

export const ORDER_STATUS = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const;

export const API_ENDPOINTS = {
  ORDERS: '/api/orders',
  USERS: '/api/users',
  AUTH: '/api/auth',
} as const;

export const LOCAL_STORAGE_KEYS = {
  THEME_MODE: 'themeMode',
  AUTH_TOKEN: 'authToken',
} as const;
