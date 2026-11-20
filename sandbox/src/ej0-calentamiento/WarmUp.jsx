import { Link } from 'react-router-dom';
import { fakeLoad } from './fakeLoad';

// Ejercicio 0: leé ENUNCIADO.md. Hacé las partes A, B, C y D en orden.
const names = ['Cardiología', 'Pediatría', 'Dermatología'];

export default function WarmUp() {
  // TODO A: estado del texto + onChange con límite de 100.
  // TODO D: que el estado arranque desde localStorage y se guarde al cambiar.
  // TODO C: estados de datos, loading y error + useEffect con fakeLoad.
  console.log(fakeLoad);

  return (
    <main>
      <Link to="/">← Inicio</Link>
      <h1>Calentamiento</h1>

      <label htmlFor="text">Buscar</label>
      <input id="text" />
      {/* TODO A: contador n/100 */}

      {/* TODO B: lista filtrada con map */}
      <ul>
        <li>{names[0]}</li>
      </ul>
    </main>
  );
}
