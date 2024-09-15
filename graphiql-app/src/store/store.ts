import { create } from 'zustand';
import { AuthState } from './types';

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoginForm: true,

  toggleForm: () => set((state) => ({ isLoginForm: !state.isLoginForm })),
  setForm: (form) => set({ isLoginForm: form }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

export default useAuthStore;
