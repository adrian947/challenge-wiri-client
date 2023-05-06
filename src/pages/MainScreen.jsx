import { useContext } from "react";
import { TurnsContext } from "../context/Turns/TurnsProvider";
import { PushSpinner } from "react-spinners-kit";
import { Alert } from "../components/Alert";
import { usePagination } from "../hooks/usePagination";
import { CardsTurnsDoctor } from "../components/CardsTurnsDoctor";
import { CardsTurnsPatient } from "../components/CardsTurnsPatient";

export const MainScreen = () => {
  const {
    state,
    loading,
    alert,
    title,
  } = useContext(TurnsContext);  

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

  return (
    <div className='turns'>
      <div className='turns__cardContainer'>
        {alert.msg && <Alert alert={alert} />}
        <h3 className='turns__title'>{title}</h3>
        {currentItems.map((turn) =>
          turn.doctor ? (
            <CardsTurnsDoctor turn={turn} key={turn.id} />
          ) : (
            <CardsTurnsPatient turn={turn} key={turn.id} />
          )
        )}
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
