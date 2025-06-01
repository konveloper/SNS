import { decryptAES, encryptAES } from '@/utils/EncUtils';

/**
 * Secure Storage Utility
 * Provides encrypted localStorage operations using AES encryption.
 */
export const secureStorage = {
  getItem: name => {
    const data = localStorage.getItem(name);
    if (!data) return null;
    try {
      const decrypted = decryptAES(atob(data));
      return decrypted || null;
    } catch (error) {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      const encrypted = btoa(encryptAES(value));
      localStorage.setItem(name, encrypted);
    } catch (error) {
      console.error(`[secureStorage] Encryption failed for ${name}:`, error);
    }
  },
  removeItem: name => {
    localStorage.removeItem(name);
  },
};
