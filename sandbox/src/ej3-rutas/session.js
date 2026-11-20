// Ejercicio 3: ÚNICO archivo que toca localStorage.

export function getSession() {
  // TODO: devolver { token, role } leyendo localStorage.
  return { token: null, role: null };
}

export function saveSession({ token, role }) {
  // TODO
  console.log(token, role);
}

export function clearSession() {
  // TODO
}
