import { createContext, useReducer, useState } from "react";
import { turnsReducer } from "./TurnsReducer";
import client from "../../service/clientAxios";
import { GET_DOCTORS, GET_TURNS, UPDATE_TURNS } from "./types";
import { tokenAuth } from "../../service/authTokenHeaders";
import { useAlert } from "../../hooks/useAlert";

export const TurnsContext = createContext();

const TurnsProvider = ({ children }) => {
  const { alert, showAlert } = useAlert();
  const initialState = {
    turns: [],
    doctors: [],
    doctor_selected: null,
  };
  const [state, dispatch] = useReducer(turnsReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(false);

  const getDoctors = async () => {
    try {
      const { data } = await client.get("/get_doctors", tokenAuth());

      dispatch({
        type: GET_DOCTORS,
        payload: data,
      });
    } catch (error) {
      showAlert({
        msg: error.response.data.msg ?? error.message,
        error: true,
      });
      setLoading(false);
    }
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
      showAlert({
        msg: error.response.data.msg ?? error.message,
        error: true,
      });
      setLoading(false);
    }
  };

  const handleReserveTurn = async (turn, user, id_doctor) => {
    try {
      setLoading(true);
      const { data } = await client.post(
        "/turns",
        {
          id_turn: turn.id,
          id_patient: user.id,
          id_doctor,
        },
        tokenAuth()
      );
      setLoading(false);
      showAlert({
        msg: data.msg,
        error: false,
      });
      return data;
    } catch (error) {
      setLoading(false);
      showAlert({
        msg: error.response.data.msg ?? error.message,
        error: true,
      });      
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
      showAlert({
        msg: "Tu turno se cancelo correctamente",
        error: false,
      });
      setLoading(false);
    } catch (error) {     
      setLoading(false);
      showAlert({
        msg: error.response.data.msg ?? error.message,
        error: true,
      });    
    }
  };
  const handleGetTurnsDoctor = async ({ id, start_date, end_date }) => {
    try {
      setLoading(true);
      const { data } = await client.get("/turns-doctor", {
        params: { id, start_date, end_date },
        ...tokenAuth(),
      });

      dispatch({
        type: GET_TURNS,
        payload: data,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showAlert({
        msg: error.response.data.msg ?? error.message,
        error: true,
      });    
    }
  };

  return (
    <TurnsContext.Provider
      value={{
        state,
        loading,
        alert,
        title,
        getDoctors,
        getTurns,
        handleReserveTurn,
        handleCancelTurns,
        setTitle,
        handleGetTurnsDoctor,
      }}
    >
      {children}
    </TurnsContext.Provider>
  );
};

export default TurnsProvider;
