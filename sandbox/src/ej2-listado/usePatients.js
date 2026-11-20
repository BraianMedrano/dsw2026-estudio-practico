import { useState } from 'react';
import { getPatients } from './fakeApi';

const pageSize = 10;

// Ejercicio 2: el hook tiene TODA la lógica. La page solo dibuja.
export default function usePatients() {
  const [pageIndex, setPageIndex] = useState(0);

  // TODO: estados para la página recibida, isLoading y error.

  // TODO: useEffect que llame a getPatients({ pageIndex, pageSize }) con
  // async/await y try/catch. ¿Qué va en el array de dependencias?
  // ¿Qué pasa si cambiás de página antes de que llegue la respuesta anterior?
  console.log(getPatients, setPageIndex);

  return {
    patients: [],
    total: 0,
    pageIndex,
    pageSize,
    isLoading: false,
    error: '',
    nextPage: () => {},
    previousPage: () => {},
  };
}
