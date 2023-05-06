import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthProvider";
import { TurnsContext } from "../context/Turns/TurnsProvider";

export const Header = ({ role }) => {
  const navigate = useNavigate();
  const { state, logOut } = useContext(AuthContext);
  const {
    getDoctors,
    state: stateTurns,
    getTurns,
    setTitle,
  } = useContext(TurnsContext);

  const [doctorSelected, setDoctorSelected] = useState("");

  useEffect(() => {
    if (role === "patient") {
      getDoctors();
    }
  }, []);

  useEffect(() => {
    setDoctorSelected("");
  }, [stateTurns]);

  const handleLogOut = () => {
    navigate("/");
    localStorage.clear();
    logOut();
  };

  const handleSelection = (event) => {
    const nameDoctor =
      event.target.options[event.target.selectedIndex].getAttribute("name");
    setTitle(`Estos son los turnos de ${nameDoctor}`);
    setDoctorSelected(event.target.value);
    getTurns(event.target.value);
  };

  const patientContent = (
    <>
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
              <option key={doc.id} value={doc.id} name={doc.name}>
                {doc.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <button
        className='header__button'
        onClick={() => {
          getTurns(state.id);
          setTitle("Tus turnos");
        }}
      >
        Mis Turnos
      </button>
    </>
  );

  const doctorContent = (
    <div>
      <label>desde</label>
      <input type='date' />
      <label>hasta</label>
      <input type='date' />
    </div>
  );

  return (
    <header className='header'>
      {role === "patient" ? patientContent : doctorContent}
      <div className='header__left'>
        <p className='header__p'>Hola! {state.name} </p>
        <button type='button' className='header__button' onClick={handleLogOut}>
          Cerrar Sesion
        </button>
      </div>
    </header>
  );
};
