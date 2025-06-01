import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { secureStorage } from './secureStorage';

/**
 * Authentication store using Zustand with persistence.
 * @typedef {Object} AuthState
 * @property {string|null} accessToken - The access token stored in memory (not persisted).
 * @property {boolean} isAuthenticated - Authentication status (persisted).
 * @property {Object|null} profiles - User profiles (persisted).
 */

/**
 * Authentication store actions.
 * @typedef {Object} AuthActions
 * @property {(token: string) => void} setAccessToken - Sets the access token.
 * @property {() => void} clearAccessToken - Clears the access token.
 * @property {() => void} login - Marks the user as authenticated.
 * @property {() => void} logout - Marks the user as logged out.
 * @property {(profiles: Object) => void} setProfiles - Sets user profiles.
 * @property {() => void} clearProfiles - Clears user profiles.
 * @property {() => void} clearAuth - Clears authentication data (token, profiles, authentication status).
 */

/**
 * Zustand authentication store with persistence.
 * @type {(import('zustand').UseBoundStore<import('zustand').StoreApi<AuthState & AuthActions>>)}
 */
export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null, // Store the access token in memory (not persisted)
      isAuthenticated: false, // You can persist authentication status
      profiles: null, // You can persist profiles if needed

      // Set the access token after login (this is only stored in memory)
      setAccessToken: (token) => set({ accessToken: token }),

      // Clear the access token on logout
      clearAccessToken: () => set({ accessToken: null }),

      // Function to set authentication status
      login: () => set({ isAuthenticated: true }),

      // Function to log out
      logout: () => set({ isAuthenticated: false }),

      // Set the user profiles
      setProfiles: (profiles) => set({ profiles }),

      // Clear the profiles on logout
      clearProfiles: () => set({ profiles: null }),

      // Clear both access token and profiles
      clearAuth: () =>
        set({ accessToken: null, profiles: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        profiles: state.profiles,
      }),
    }
  )
);
