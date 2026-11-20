import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

// Ya hecha: página privada del rol ADMINISTRADOR.
export default function AdminPage() {
  const { role, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <main>
      <h1>Área ADMINISTRADOR</h1>
      <p>Rol en la sesión: {role ?? '(ninguno)'}</p>
      <button
        onClick={() => {
          signOut();
          navigate('/ej3/login', { replace: true });
        }}
      >
        Cerrar sesión
      </button>
    </main>
  );
}
