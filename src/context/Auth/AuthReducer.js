import { LOGIN, LOGOUT } from "./types";

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        id: action.payload.id,
        auth: true,
        name: action.payload.name,
        role: action.payload.role,
        email: action.payload.email,
      };
      
    case LOGOUT:
      return {
        ...state,
        token: null,
        auth: false,
        name: null,
        role: null,
        email: null,
        id: null,
      };

    default:
      return state;
  }
};
