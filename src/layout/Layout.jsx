import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthProvider";
import { Header } from "../components/Header";
import { MainScreen } from "../pages/MainScreen";

import TurnsProvider from "../context/Turns/TurnsProvider";

export const Layout = () => {
  const { state: user, loading } = useContext(AuthContext);

  if (loading) return null;
  return (
    <div className='layout-container'>
      <div className='layout'>
        {!user.auth && <Navigate to='/' />}
        <TurnsProvider>
          <Header user={user} />
          <MainScreen />
        </TurnsProvider>
      </div>
    </div>
  );
};
