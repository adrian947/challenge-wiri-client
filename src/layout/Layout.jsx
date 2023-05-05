import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthProvider";
import { Header } from "../Components/Header";
import { PatientLayout } from "../pages/PatientLayout";
import TurnsProvider from "../context/Turns/TurnsProvider";

export const Layout = () => {
  const { state, loading } = useContext(AuthContext);

  if (loading) return null;
  return (
    <div className='layout-container'>
      <div className='layout'>
        {!state.auth && <Navigate to='/' />}

        {state.role === "doctor" ? (
          <h1>hola doctor</h1>
        ) : (
          <>
            <TurnsProvider>
              <Header />
              <PatientLayout />
            </TurnsProvider>
          </>
        )}
      </div>
    </div>
  );
};
