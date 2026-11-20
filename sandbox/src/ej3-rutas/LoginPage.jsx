import { Link, useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

// Ya hecha: simula el login devolviendo el rol, como el back del TPI.
export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  function enter(role, path) {
    signIn(role);
    navigate(path, { replace: true });
  }

  return (
    <main>
      <Link to="/">← Inicio</Link>
      <h1>Login (ejercicio 3)</h1>
      <button onClick={() => enter('ADMINISTRADOR', '/ej3/admin')}>Entrar como admin</button>{' '}
      <button onClick={() => enter('PACIENTE', '/ej3/patient')}>Entrar como paciente</button>
    </main>
  );
}
