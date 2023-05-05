import moment from "./../utils/moment";
import { useContext } from "react";
import { TurnsContext } from "../context/Turns/TurnsProvider";
import { AuthContext } from "./../context/Auth/AuthProvider";
import { PushSpinner } from "react-spinners-kit";
import { Alert } from "../components/Alert";
import { usePagination } from "../hooks/usePagination";

export const PatientLayout = () => {
  const {
    state,
    handleReserveTurn,
    getTurns,
    handleCancelTurns,
    loading,
    alert,
    title,
    setTitle,
  } = useContext(TurnsContext);
  const { state: user } = useContext(AuthContext);

  const { currentPage, currentItems, totalPages, nextPage, prevPage } =
    usePagination(state.turns);

  if (loading)
    return (
      <div className='spinner_container'>
        <PushSpinner size={30} color='#00bb2d' loading={loading} />
      </div>
    );

  if (!state.turns.length)
    return <h3 className='turns__title'>No hay turnos disponibles</h3>;

  function parseDate(date) {
    return moment(date).format("dddd, D [de] MMMM [de] YYYY");
  }

  return (
    <div className='turns__container'>
      <div className='turns__cardContainer'>
        {alert.msg && <Alert alert={alert} />}
        <h3 className='turns__title'>{title}</h3>
        {currentItems.map((turn) => (
          <div className='turns__card' key={turn.id}>
            <div className='turns__image'>
              <img src={turn.doctor.photo_url} alt={turn.doctor.name} />
            </div>
            <div className='turns__info'>
              <div>
                <p className='turns__primaryInfo'>Doctor: {turn.doctor.name}</p>
                <p className='turns__secondaryInfo'>
                  Matricula: 999999 - Clinica medica
                </p>
              </div>
              <div className='turns__dateInfoContainer'>
                <p>Fecha: {parseDate(turn.date)}</p>
                <p>Hora:{turn.hour}</p>
                <p>{turn.doctor.address}</p>
                <p>
                  Precio: {turn.doctor.coverage ? "Cobertura Wiri" : "$1500"}
                </p>
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
                  Resevar
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
        ))}
      </div>
      <div className='turns__buttonContainer'>
        <button
          className='turns__button'
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button
          className='turns__button'
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
