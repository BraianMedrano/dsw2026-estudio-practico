import { Link } from 'react-router-dom';
import DataTable from './DataTable';
import usePatients from './usePatients';

// TODO: definí las columnas (Nombre, DNI, Email).
const columns = [];

// Ejercicio 2: esta page SOLO dibuja lo que le da el hook.
export default function PatientsPage() {
  const result = usePatients();

  // TODO: "Cargando...", error, lista vacía, tabla y botones Anterior/Siguiente.
  console.log(result);

  return (
    <main>
      <Link to="/">← Inicio</Link>
      <h1>Pacientes</h1>
      <DataTable columns={columns} data={[]} />
    </main>
  );
}
