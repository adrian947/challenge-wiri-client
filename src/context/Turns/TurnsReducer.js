import { DOCTOR_SELECTED, GET_DOCTORS, GET_TURNS, UPDATE_TURNS } from "./types";

export const turnsReducer = (state, action) => {  
  switch (action.type) {
    case GET_TURNS:
      return {
        ...state,
        turns: action.payload,
      };
    case GET_DOCTORS:
      return {
        ...state,
        doctors: action.payload,
      };
    case DOCTOR_SELECTED:
      return {
        ...state,
        doctor_selected: action.payload,
      };
    case UPDATE_TURNS:
      return {
        ...state,
        turns: action.payload,
      };
    default:
      return state;
  }
};
