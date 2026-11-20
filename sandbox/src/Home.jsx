import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      <h1>Sandbox práctica — Defensa TPI</h1>
      <p>Cada ejercicio tiene su ENUNCIADO.md en src/.</p>
      <ul>
        <li>
          <Link to="/ej0">Ejercicio 0 — Calentamiento (teoría aplicada)</Link>
        </li>
        <li>
          <Link to="/ej1">Ejercicio 1 — Formulario con límites</Link>
        </li>
        <li>
          <Link to="/ej2">Ejercicio 2 — Listado paginado</Link>
        </li>
        <li>
          <Link to="/ej3/login">Ejercicio 3 — Sesión y rutas por rol</Link>
        </li>
        <li>
          <Link to="/ej4">
            Ejercicio 4 — Modificaciones en vivo (con DevTools)
          </Link>
        </li>
      </ul>
    </main>
  );
}
