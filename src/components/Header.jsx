import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthProvider";
import { TurnsContext } from "../context/Turns/TurnsProvider";

export const Header = () => {
  const navigate = useNavigate();
  const { state, logOut } = useContext(AuthContext);
  const { getDoctors, state: stateTurns, getTurns } = useContext(TurnsContext);

  const [doctorSelected, setDoctorSelected] = useState("");

  useEffect(() => {
    getDoctors();
  }, []);

  const handleLogOut = () => {
    navigate("/");
    localStorage.clear();
    logOut();
  };

  const handleSelection = (event) => {
    setDoctorSelected(event.target.value);
    getTurns(event.target.value);
  };

  return (
    <header className='header'>
      <div className='header__selectContainer'>
        <p>Elije tu medico</p>
        {stateTurns.doctors.length && (
          <select
            value={doctorSelected}
            onChange={handleSelection}
            className='header__select'
          >
            <option value='' disabled>
              Elegir medico
            </option>
            {stateTurns.doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className='header__left'>
        <p className='header__p'>Hola! {state.name} </p>
        <button type='button' className='header__button' onClick={handleLogOut}>
          Cerrar Sesion
        </button>
      </div>
    </header>
  );
};
