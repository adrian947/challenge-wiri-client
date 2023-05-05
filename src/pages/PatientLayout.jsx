import { useContext, useState } from "react";
import { TurnsContext } from "../context/Turns/TurnsProvider";
import { AuthContext } from "./../context/Auth/AuthProvider";
import { PushSpinner } from "react-spinners-kit";

export const PatientLayout = () => {
  const { state, handleReserveTurn, getTurns, handleCancelTurns, loading } =
    useContext(TurnsContext);
  const { state: user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const objectsPerPage = 10;

  if (loading)
    return (
      <div className='spinner_container'>
        <PushSpinner size={30} color='#00bb2d' loading={loading} />
      </div>
    );

  if (!state.turns.length)
    return <h3 className='turns__title'>No hay turnos disponibles</h3>;

  // Calcula la cantidad total de páginas según el número de objetos y la cantidad de objetos por página
  const quantityPages = Math.ceil(state.turns.length / objectsPerPage);

  // Obtiene los objetos que se mostrarán en la página actual
  const indexLastObject = currentPage * objectsPerPage;
  const indexFirstObject = indexLastObject - objectsPerPage;
  const turns = state.turns.slice(indexFirstObject, indexLastObject);
  function handleClickAnterior() {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  }

  function handleClickSiguiente() {
    if (currentPage < quantityPages) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  }
  return (
    <div className='turns__container'>
      <div className='turns__cardContainer'>
        {turns.map((turn) => (
          <div className='turns__card' key={turn.id}>
            <div className='turns__image'>
              <img
                src='	https://randomuser.me/api/portraits/men/16.jpg'
                alt={turn.doctor.name}
              />
            </div>
            <div className='turns__info'>
              <div>
                <p className='turns__primaryInfo'>Doctor: {turn.doctor.name}</p>
                <p className='turns__secondaryInfo'>
                  Matricula: 999999 - Clinica medica
                </p>
              </div>
              <div className='turns__dateInfoContainer'>
                <p>Fecha: {turn.date}</p>
                <p>Hora:{turn.hour}</p>
                <p>{turn.doctor.address}</p>
                <p>Precio: {turn.coverage ?? "Cobertura Wiri"}</p>
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
                    handleReserveTurn(turn, user).then(() => getTurns(user.id))
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
          onClick={handleClickAnterior}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button
          className='turns__button'
          onClick={handleClickSiguiente}
          disabled={currentPage === quantityPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
