import {
  createContext,
  useEffect,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

export type Role = "user" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  isPremium: boolean;
  // token: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "LOADING_COMPLETE" };

interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>;
}

// === Context kreiranje ===
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// === Reducer ===
export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "LOADING_COMPLETE":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

// === Provider ===
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const userData: User = JSON.parse(stored);
      dispatch({ type: "LOGIN", payload: userData });
    }

    dispatch({ type: "LOADING_COMPLETE" });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
