/**
 * Default string delimiter
 */
export const DELIMITER = '/';

/**
 * Route names
 */
export const RouteNames = Object.freeze({
  CALLBACK: 'callback',
  DEVELOPER: 'developer',
  FORBIDDEN: 'forbidden',
  HOME: 'home',
  LOGIN: 'login',
  LOGOUT: 'logout',
  SECURED: 'secured',
  STYLINGS: 'stylings',
  GENERATE_CREDENTIALS: 'generateCredentials'
});

/**
 * Application storage keys
 */
export const StorageKey = Object.freeze({
  AUTH: 'entrypoint',
  CONFIG: 'config'
});

/**
 * Default toast message display times
 */
export const ToastTimeout = Object.freeze({
  ERROR: 5000,
  INFO: 3000,
  SUCCESS: 3000,
  WARNING: 5000
});
