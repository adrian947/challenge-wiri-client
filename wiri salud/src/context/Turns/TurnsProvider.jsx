import { createContext, useReducer } from "react";
import { turnsReducer } from "./TurnsReducer";
import client from "../../service/clientAxios";
import { GET_DOCTORS, GET_TURNS } from "./types";
import { tokenAuth } from "../../service/authTokenHeaders";

export const TurnsContext = createContext();

const TurnsProvider = ({ children }) => {
  const initialState = {
    turns: [],
    doctors: [],
    doctor_selected: null,
  };
  const [state, dispatch] = useReducer(turnsReducer, initialState);

  const getDoctors = async () => {
    const { data } = await client.get("/get_doctors");

    dispatch({
      type: GET_DOCTORS,
      payload: data,
    });
  };

  const getTurns = async (id) => {
    try {
      const { data } = await client.get("/turns", {
        params: { id },
        ...tokenAuth(),
      });

      dispatch({
        type: GET_TURNS,
        payload: data,
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  };

  return (
    <TurnsContext.Provider value={{ state, getDoctors, getTurns }}>
      {children}
    </TurnsContext.Provider>
  );
};

export default TurnsProvider;
