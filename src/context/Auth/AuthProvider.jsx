import { createContext, useEffect, useReducer, useState } from "react";
import client from "../../service/clientAxios";
import { tokenAuth } from "../../service/authTokenHeaders";
import { useAlert } from "../../hooks/useAlert";
import { authReducer } from "./AuthReducer";
import { LOGIN, LOGOUT } from "./types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { alert, showAlert } = useAlert();

  const initialState = {
    token: localStorage.getItem("token"),
    id: null,
    auth: null,
    name: null,
    role: null,
    email: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return setLoading(false);

      try {
        const { data } = await client.get("/me", tokenAuth());

        dispatch({
          type: LOGIN,
          payload: data,
        });
      } catch (error) {
        localStorage.removeItem("token");
      }
      setLoading(false);
    };

    authUser();
  }, []);

  const loginUser = async (user) => {
    try {
      setLoading(true);
      const { data } = await client.post("/login", user);

      localStorage.setItem("token", data.token);

      dispatch({
        type: LOGIN,
        payload: data,
      });
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      showAlert({
        msg: error ? "error" : error.response.data.msg,
        error: true,
      });
    }
  };

  const logOut = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        alert,
        state,
        loading,
        showAlert,
        loginUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
