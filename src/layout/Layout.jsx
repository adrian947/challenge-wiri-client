import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthProvider";
import { Header } from "../Components/Header";
import { PatientLayout } from "../pages/PatientLayout";

export const Layout = () => {
  const { state, loading } = useContext(AuthContext);

  if (loading) return null;
  return (
    <div className='layout-container'>
      <div className='layout'>
        {!state.auth && <Navigate to='/' />}
        <Header role={state.role} />

        {state.role === "doctor" ? <h1>hola doctor</h1> : <PatientLayout />}
      </div>
    </div>
  );
};
