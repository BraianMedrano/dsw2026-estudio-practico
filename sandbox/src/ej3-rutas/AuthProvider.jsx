import { createContext } from 'react';
// TODO: importá lo que necesites de './session'.

const AuthContext = createContext();

// Ejercicio 3: hoy no guarda nada. Completalo según ENUNCIADO.md.
function AuthProvider({ children }) {
  // TODO: useState que arranque con la sesión guardada.
  // TODO: signIn(role) y signOut().

  const value = {
    isAuthenticated: false,
    role: null,
    signIn: () => {},
    signOut: () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
