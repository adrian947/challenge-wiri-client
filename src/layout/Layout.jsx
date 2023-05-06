import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthProvider";
import { Header } from "../components/Header";
import { PatientScreen } from "../pages/PatientScreen";
import { DoctorScreen } from "../pages/DoctorScreen";

export const Layout = () => {
  const { state, loading } = useContext(AuthContext);

  if (loading) return null;
  return (
    <div className='layout-container'>
      <div className='layout'>
        {!state.auth && <Navigate to='/' />}
        <Header role={state.role} />

        {state.role === "doctor" ? <DoctorScreen/> : <PatientScreen />}
      </div>
    </div>
  );
};
