import { createContext, useReducer, useState } from "react";
import { turnsReducer } from "./TurnsReducer";
import client from "../../service/clientAxios";
import { GET_DOCTORS, GET_TURNS, UPDATE_TURNS } from "./types";
import { tokenAuth } from "../../service/authTokenHeaders";

export const TurnsContext = createContext();

const TurnsProvider = ({ children }) => {
  const initialState = {
    turns: [],
    doctors: [],
    doctor_selected: null,
  };
  const [state, dispatch] = useReducer(turnsReducer, initialState);
  const [loading, setLoading] = useState(false);

  const getDoctors = async () => {
    const { data } = await client.get("/get_doctors");

    dispatch({
      type: GET_DOCTORS,
      payload: data,
    });
  };

  const getTurns = async (id) => {
    try {
      setLoading(true);
      const { data } = await client.get("/turns", {
        params: { id },
        ...tokenAuth(),
      });

      dispatch({
        type: GET_TURNS,
        payload: data,
      });
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setLoading(false);
    }
  };

  const handleReserveTurn = async (turn, user) => {
    try {
      setLoading(true);
      const { data } = await client.post(
        "/turns",
        {
          id_turn: turn.id,
          id_patient: user.id,
        },
        tokenAuth()
      );
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setLoading(false);
    }
  };

  const handleCancelTurns = async (turn, user) => {
    try {
      setLoading(true);
      const { data } = await client.patch(
        "/turns",
        {
          id_turn: turn.id,
          id_patient: user.id,
        },
        tokenAuth()
      );
  
      const turnsFiltered = state.turns.filter((turn) => turn.id !== data.id);
  
      dispatch({
        type: UPDATE_TURNS,
        payload: turnsFiltered,
      });
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setLoading(false);
    }
  
  };

  return (
    <TurnsContext.Provider
      value={{
        state,
        loading,
        getDoctors,
        getTurns,
        handleReserveTurn,
        handleCancelTurns,
      }}
    >
      {children}
    </TurnsContext.Provider>
  );
};

export default TurnsProvider;
