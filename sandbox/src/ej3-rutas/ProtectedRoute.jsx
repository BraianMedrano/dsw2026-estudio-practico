// Ejercicio 3: hoy deja pasar a cualquiera. Arreglalo.
// Props: children (la página), allowedRoles (lista de roles que pueden
// entrar, por ejemplo ['ADMINISTRADOR']) y redirectTo (login).
export default function ProtectedRoute({ children, allowedRoles, redirectTo }) {
  // TODO: chequear sesión y después que el rol esté en allowedRoles
  // (useAuth + Navigate).
  console.log(allowedRoles, redirectTo);

  return children;
}
