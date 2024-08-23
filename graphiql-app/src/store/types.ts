interface AuthState {
  isAuthenticated: boolean;
  isLoginForm: boolean;
  toggleForm: () => void;
  setForm: (form: boolean) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
}

export default AuthState;
