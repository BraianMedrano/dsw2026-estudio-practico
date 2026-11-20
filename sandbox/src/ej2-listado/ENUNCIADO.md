# Ejercicio 2 — Listado paginado (30 min)

Arquitectura del TPI: **service → hook → page**. La page solo dibuja.

`fakeApi.js` ya está hecho (es el "backend"). Completá:

1. `usePatients.js` (custom hook): pide la página con `getPatients` en un
   `useEffect` y devuelve `{ patients, total, pageIndex, isLoading, error,
   nextPage, previousPage }`.
2. `DataTable.jsx` (reutilizable): recibe `columns` y `data` y dibuja la tabla.
   No sabe nada de pacientes.
3. `PatientsPage.jsx`: usa el hook y la tabla; muestra "Cargando...", el error,
   "No hay pacientes" si la lista está vacía, y los botones Anterior/Siguiente
   (deshabilitados en la primera y la última página).

## Datos

`getPatients({ pageIndex, pageSize })` devuelve después de 600 ms:
`{ pageIndex, pageSize, total, data: [{ id, name, dni, email }] }`.
`pageIndex` empieza en 0 (igual que el back del TPI).

## Probalo

- Pasá todas las páginas: ¿se deshabilita "Siguiente" en la última?
- Backend caído: en la consola del navegador
  `localStorage.setItem('backendDown', '1')` y recargá. Para volver:
  `localStorage.removeItem('backendDown')`.

## Extra (si te sobra tiempo)

Búsqueda por nombre: mínimo 3 caracteres y que espere 300 ms antes de pedir
(debounce con `setTimeout` + cleanup). `getPatients` acepta `name`.

## Compará con el TPI

- `src/modules/specialties/services/getSpecialties.js` → el service
- `src/modules/specialties/hooks/useSpecialties.js` → el hook (debounce, cleanup, `active`)
- `src/modules/specialties/pages/SpecialtiesPage.jsx` → la page
- `src/modules/shared/components/DataTable.jsx` y `TablePagination.jsx`
