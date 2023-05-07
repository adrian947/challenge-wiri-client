import { useContext } from "react";
import { AuthContext } from "../context/Auth/AuthProvider";
import { TurnsContext } from "../context/Turns/TurnsProvider";
import { parseDate } from "../utils/parseDate";
import moment from "moment/moment";

export const CardsTurnsPatient = ({ turn }) => {
  const { handleCancelTurns } = useContext(TurnsContext);
  const { state: user } = useContext(AuthContext);

  const now = moment();
  return (
    <div className='turns__card' key={turn.id}>
      <div className='turns__image'>
        <img src={turn.patient.photo_url} alt={turn.patient.name} />
      </div>
      <div className='turns__info'>
        <div className='turns__infoContainer'>
          <p className='turns__primaryInfo'>Paciente: {turn.patient.name}</p>
          <p className='turns__secondaryInfo'>Ir a la ficha medica</p>
        </div>
        <div className='turns__dateInfoContainer'>
          <p>Fecha: {parseDate(turn.date)}</p>
          <p>Hora:{turn.hour}</p>
          <p>Precio: {turn.patient.coverage ? "Cobertura Wiri" : "$1500"}</p>
          <p className='turns__status'>
            Estado:{" "}
            <span className='turns__status-green'>
              {moment(turn.date).isBefore(now) ? "Atendido" : "Reservado"}
            </span>
          </p>
        </div>
        {moment(turn.date).isBefore(now) ? (
          <div style={{ width: "8rem" }}></div>
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
