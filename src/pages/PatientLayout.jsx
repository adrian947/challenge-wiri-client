import { useContext, useState } from "react";
import { TurnsContext } from "../context/Turns/TurnsProvider";

export const PatientLayout = () => {
  const { state } = useContext(TurnsContext);

  const [currentPage, setCurrentPage] = useState(1);
  const objectPerPage = 10;

  if (!state.turns.length) return <h3 className='turns__title'>No hay turnos disponibles</h3>;

  // Calcula la cantidad total de páginas según el número de objetos y la cantidad de objetos por página
  const quantityPage = Math.ceil(state.turns.length / objectPerPage);

  // Obtiene los objetos que se mostrarán en la página actual
  const indexLastObject = currentPage * objectPerPage;
  const indexFirstObject = indexLastObject - objectPerPage;
  const turns = state.turns.slice(indexFirstObject, indexLastObject);

  function handleClickAnterior() {
    setCurrentPage((currentPage) => currentPage - 1);
  }

  function handleClickSiguiente() {
    setCurrentPage((currentPage) => currentPage + 1);
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
              </div>
              <button className='turns__button'>Resevar</button>
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
          disabled={currentPage === quantityPage}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
