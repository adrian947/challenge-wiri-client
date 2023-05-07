import { useContext } from "react";
import { AuthContext } from "../context/Auth/AuthProvider";
import { TurnsContext } from "../context/Turns/TurnsProvider";
import { parseDate } from "../utils/parseDate";

export const CardsTurnsDoctor = ({ turn }) => {
  const { handleReserveTurn, getTurns, handleCancelTurns, setTitle } =
    useContext(TurnsContext);
  const { state: user } = useContext(AuthContext);

  return (
    <div className='turns__card' key={turn.id}>
      <div className='turns__image'>
        <img src={turn.doctor.photo_url} alt={turn.doctor.name} />
      </div>
      <div className='turns__info'>
        <div className='turns__infoContainer'>
          <p className='turns__primaryInfo'>Doctor: {turn.doctor.name}</p>
          <p className='turns__secondaryInfo'>
            Matricula: 999999 - Clinica medica
          </p>
        </div>
        <div className='turns__dateInfoContainer'>
          <p>Fecha: {parseDate(turn.date)}</p>
          <p>Hora:{turn.hour}</p>
          <p>Lugar: {turn.doctor.address}</p>
          <p>Precio: {user.coverage ? "Cobertura Wiri" : "$1500"}</p>
          <p className='turns__status'>
            Estado:{" "}
            <span
              className={
                turn.status === "busy"
                  ? "turns__status-red"
                  : "turns__status-green"
              }
            >
              {turn.status === "busy" ? "Ocupado" : "Disponible"}
            </span>
          </p>
        </div>
        {turn.status === "available" ? (
          <button
            className='turns__button'
            onClick={() =>
              handleReserveTurn(turn, user, turn.id_doctor).then(() => {
                setTitle("Tus turnos");
                getTurns(user.id);
              })
            }
          >
            Reservar
          </button>
        ) : (
          <button
            className='turns__button-cancel'
            onClick={() => handleCancelTurns(turn, user)}
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
};
