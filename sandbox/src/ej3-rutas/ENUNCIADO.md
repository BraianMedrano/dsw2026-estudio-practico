# Ejercicio 3 — Sesión y rutas por rol (30 min)

Las preguntas que el profe **dijo** que hace: dónde se protege por rol y dónde
se maneja la sesión.

Hoy `ProtectedRoute` deja pasar a cualquiera. Arreglalo en este orden:

1. `session.js`: **único** archivo que toca `localStorage`. Funciones
   `getSession()` → `{ token, role }`, `saveSession({ token, role })` y
   `clearSession()`.
2. `AuthProvider.jsx`: guarda la sesión en un `useState` que arranca leyendo
   `getSession` (así sobrevive a recargar). Expone `isAuthenticated`, `role`,
   `signIn(role)` y `signOut()`. `signIn` guarda un token inventado.
3. `useAuth.js`: `useContext(AuthContext)`; si no hay contexto, tirá un error.
4. `ProtectedRoute.jsx`: recibe `allowedRoles`, una **lista** de roles (la
   rúbrica lo nombra así). Sin sesión → `<Navigate to={redirectTo} replace />`.
   Con sesión pero con un rol que no está en `allowedRoles` → al inicio de
   **su** rol. Si todo bien → `children`. Pista: `allowedRoles.includes(role)`.

`LoginPage`, `AdminPage` y `PatientPage` ya están hechas.

## Probalo

- Sin login, escribí `/ej3/admin` en la URL → tiene que ir al login.
- Entrá como paciente y escribí `/ej3/admin` → tiene que volver a `/ej3/patient`.
- Recargá estando logueado → la sesión sigue.
- Cerrá sesión y apretá "atrás" en el navegador → no vuelve a entrar.

## Compará con el TPI

- `src/modules/shared/helpers/session.js`
- `src/modules/auth/context/AuthProvider.jsx`
- `src/modules/auth/hook/useAuth.js`
- `src/modules/auth/components/ProtectedRoute.jsx` (`HOME_BY_ROLE`). Ojo: el
  TPI recibe `role` (uno solo), no una lista. Tenés que poder explicar qué
  cambiarías para que acepte `allowedRoles` y en qué caso conviene (una página
  que pueden ver dos roles).
- `src/App.jsx` → cómo se envuelve cada layout
- `src/modules/shared/api/axiosInstance.js` → qué pasa con un 401 (en el
  sandbox no hay backend, pero te lo van a preguntar)

## Extra — localStorage vs sessionStorage (10 min)

Con el ejercicio terminado, cambiá `localStorage` por `sessionStorage` **solo
en `session.js`**. Logueate y probá:

- Recargar la página.
- Abrir `/ej3/admin` en una pestaña nueva.
- Cerrar la pestaña y volver a abrirla.

Anotá qué cambia y volvé a `localStorage`. Fijate que tocaste **un solo
archivo**: esa es la ventaja de tener la sesión en un solo lugar, y es lo que
el profe pidió en clase.
