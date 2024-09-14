export interface AuthState {
  isAuthenticated: boolean;
  isLoginForm: boolean;
  toggleForm: () => void;
  setForm: (form: boolean) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
}

export interface RequestEntry {
  method: string;
  link: string;
  dateTime: string;
  url: string;
}

export interface HistoryState {
  request: RequestEntry | null;
  addRequest: (link: string, url: string) => void;
}
