import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

// Ya hecha: página privada del rol PACIENTE.
export default function PatientPage() {
  const { role, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <main>
      <h1>Área PACIENTE</h1>
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
