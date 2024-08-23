interface AuthState {
  isAuthenticated: boolean;
  isLoginForm: boolean;
  login: () => void;
  logout: () => void;
  toggleForm: () => void;
  setForm: (form: boolean) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
}

export default AuthState;
