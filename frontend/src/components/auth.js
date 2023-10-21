import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const initialUserValue = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  roleId: 0,
  role: "",
  password: "",
};

const initialState = {
  setUser: () => {},
  user: initialUserValue,
  signOut: () => {},
  appInitialize: false,
};

export const AuthContext = createContext(initialState);
export const AuthWrapper = ({ children }) => {
  const [appInitialize, setAppInitialize] = useState(false);
  const [user, _setUser] = useState(initialUserValue);

  const navigate = useNavigate();
  const { pathName } = useLocation();

  const setUser = (user) => {
    localStorage.setItem(Shared.LocalStorageKeys.USER, JSON.stringify(user));
    _setUser(user);
  };

  useEffect(() => {
    const itemStr =
      JSON.parse(localStorage.getItem(Shared.LocalStorageKeys.USER)) ||
      initialUserValue;
    if (!itemStr.id) {
      navigate("/login");
    }
    setUser(itemStr);
  }, []);

  const signOut = () => {
    setUser(initialUserValue);
    localStorage.removeItem(Shared.LocalStorageKeys.USER);
    navigate("/login");
  };

  let value = {
    user,
    setUser,
    signOut,
    appInitialize,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
