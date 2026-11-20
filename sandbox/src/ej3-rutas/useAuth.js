import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

// Ejercicio 3: TODO: si no hay contexto, tirar un Error con un mensaje claro.
export default function useAuth() {
  return useContext(AuthContext);
}
