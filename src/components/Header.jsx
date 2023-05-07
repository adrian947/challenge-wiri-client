import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthProvider";
import { TurnsContext } from "../context/Turns/TurnsProvider";
import { useForm } from "../hooks/useForm";

export const Header = ({ user }) => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  const {
    getDoctors,
    state: stateTurns,
    getTurns,
    setTitle,
    handleGetTurnsDoctor,
  } = useContext(TurnsContext);

  const initialForm = {
    startDate: "",
    endDate: "",
  };

  const [doctorSelected, setDoctorSelected] = useState("");
  const [values, handleInputChange, reset] = useForm(initialForm);

  useEffect(() => {
    if (user.role === "patient") {
      getDoctors();
    } else {
      handleGetTurnsDoctor({ id: user.id });
      setTitle("Estos son tus turnos");
    }
  }, []);

  useEffect(() => {
    setDoctorSelected("");
  }, [stateTurns]);

  useEffect(() => {
    if (user.role === "patient") {
      getTurns(user.id);
      setTitle("Tus turnos");
    }
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();  

    handleGetTurnsDoctor({
      id: user.id,
      start_date: values.startDate,
      end_date: values.endDate,
    });
  };

  const patientContent = (
    <div className='header__optionContainer'>
      <div className='header__selectContainer'>
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
          getTurns(user.id);
          setTitle("Tus turnos");
        }}
      >
        Mis Turnos
      </button>
    </div>
  );

  const doctorContent = (
    <form onSubmit={handleSubmit} className='header__form'>
      <div>
        <label className='header__label'>desde</label>
        <input
          type='date'
          className='header__input'
          onChange={handleInputChange}
          value={values.startDate}
          name='startDate'
        />
      </div>
      <div>
        <label className='header__label'>hasta</label>
        <input
          type='date'
          className='header__input'
          onChange={handleInputChange}
          value={values.endDate}
          name='endDate'
        />
      </div>
      <div className='header__buttonContainer'>
        <button type='submit' className='header__button'>
          Filtrar
        </button>
        <button
          type='submit'
          className='header__button'
          onClick={() => reset()}
        >
          Reset
        </button>
      </div>
    </form>
  );

  return (
    <header className='header'>
      {user.role === "patient" ? patientContent : doctorContent}
      <div className='header__left'>
        <p className='header__p'>Hola! {user.name} </p>
        <button type='button' className='header__button' onClick={handleLogOut}>
          Cerrar Sesion
        </button>
      </div>
    </header>
  );
};
