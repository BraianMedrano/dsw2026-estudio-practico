# Respuestas — Banco de preguntas

Rutas del front relativas a `src/modules/` salvo que se indique otra cosa.
Back = repo `dsw2026-tpi`.

## A. Las que el profe dijo en clase que pregunta

1. **Protección por rol.** En `src/App.jsx` cada layout privado está envuelto en
   `<ProtectedRoute role={ROLES.ADMIN}>` o `role={ROLES.PATIENT}`.
   `auth/components/ProtectedRoute.jsx` chequea en dos pasos: primero si hay
   sesión (si no, al login del área) y después si el rol coincide (si no, al
   inicio de su propio rol, `HOME_BY_ROLE`). En el back:
   `[Authorize(Policy = Policies.AdminPolicy)]` en `SpecialtiesController` y
   `DoctorController`, y `PatientPolicy` en `AppointmentsController`.
2. **Query params.** El back usa `[FromQuery]` en los parámetros de las
   acciones (por ej. `AppointmentsController.cs`). El front los manda con la
   opción `params` de axios: `specialties/services/getSpecialties.js`.
3. **Sesión.** `shared/helpers/session.js` es el **único** archivo que toca
   `localStorage` (`getSession`, `saveSession`, `clearSession`, `getToken`).
   `AuthProvider` y `axiosInstance` usan esas funciones.
4. **Recargar.** En `auth/context/AuthProvider.jsx`:
   `useState(getSession)` arranca el estado leyendo `localStorage`.
5. **401.** En `shared/api/axiosInstance.js`, el interceptor de respuesta:
   si es 401 y no es un login, hace `clearSession()` y manda al login del área
   (`/admin/login` o `/login`). Un 401 en el login es "credenciales inválidas"
   y lo muestra el formulario.
6. **JWT.** No se decodifica. El rol viene en la respuesta del login y se
   guarda en la sesión. Quien valida el token es siempre el back.
7. **Usuario del layout.** De `useAuth()` (`email`) en
   `dashboard/components/DashboardLayout.jsx` y
   `patients/components/PatientLayout.jsx`. Nada escrito fijo.
8. **Lógica.** En custom hooks; el componente solo dibuja. Ejemplo:
   `specialties/hooks/useSpecialties.js` pide los datos, pagina, busca y maneja
   errores; `specialties/pages/SpecialtiesPage.jsx` solo los muestra.
   Las llamadas HTTP están en `services/`.
9. **Atomic design.** `shared/components/`: `DataTable` (recibe columnas y
   datos), `TablePagination`, `Input`, `Button`, `Field`, `Modal`,
   `ConfirmDialog`… Todas las tablas usan el mismo `DataTable`.
10. **Baja.** Lógica. El front llama a `DELETE`
    (`specialties/services/deleteSpecialty.js`) y el back no borra la fila:
    marca la entidad con `MarkAsDeleted()` (`Domain/Entities/Speciality.cs`).
11. **Selectores con paginación.** `getAllSpecialties` en
    `specialties/services/getSpecialties.js` pide páginas de 100 hasta juntar
    el `total`. El profe prefería un endpoint sin paginar; esto es parecido a
    "pedir una página grande".
12. **`/` y `/admin`.** Son dos áreas con diseños distintos: cada una tiene su
    layout (`PatientLayout` y `DashboardLayout`) y su login.

## B. Probables aunque no las dijo

13. **Context.** Comparte datos con todo el árbol sin pasarlos por props.
    `useAuth` (`auth/hook/useAuth.js`) hace `useContext` y, si da `undefined`,
    es que se usó fuera de `<AuthProvider>`: falla rápido con un mensaje claro.
14. **Router afuera.** Si se crea dentro de `App`, se crea de nuevo en cada
    render y se pierde el estado de la navegación (comentario en `App.jsx`).
15. **Outlet.** Es el lugar del layout donde se dibuja la ruta hija activa
    (`DashboardLayout.jsx` lo usa).
16. **Proxy.** Toda petición a `/api` la reenvía Vite al back. Para el
    navegador es el mismo origen, así que no hay problemas de CORS.
17. **Token en cada petición.** Interceptor de **request** de
    `axiosInstance.js`: agrega `Authorization: Bearer <token>`.
18. **Errores del back.** `shared/helpers/apiError.js` (`getApiError`)
    traduce el `errorCode` a un mensaje en español y normaliza `details`.
    El form (por ej. `SpecialtyForm.jsx`) hace `setError(campo, …)` por cada
    detalle, o `setError('root', …)` si no corresponde a un campo.
19. **Back apagado.** Si el error no tiene `response`, `getApiError` devuelve
    "No se pudo conectar con el servidor. Revisá tu conexión."
20. **Límites.** `FIELD_LIMITS` en `shared/helpers/inputRules.js`. El atributo
    `maxLength` del input **no deja escribir** de más; la regla de
    react-hook-form **muestra el mensaje** si igual llega un valor largo.
21. **Solo números.** `digitsOnly` en `inputRules.js` envuelve el `onChange`
    de `register` y borra todo lo que no es dígito (`replace(/\D/g, '')`).
    Se usa en `PatientLoginPage.jsx` y `AppointmentsSearchPage.jsx`.
22. **trim.** Sin eso, `"   "` cumple `required` y `minLength`. Con `trim`
    queda vacío y salta el error.
23. **Doble envío.** `isSubmitting` deshabilita el botón y, además,
    `SpecialtyForm.jsx` usa un `useRef` (`pending`) que corta un segundo envío
    mientras el primero no termina.
24. **Cleanup.** Corre antes del siguiente efecto o al desmontar. En los hooks
    marca `active = false`, cancela el timer o aborta la petición
    (`AbortController` en `useSpecialtyForm.js`), para que una respuesta vieja
    no pise el estado.
25. **Dependencias.** Son los valores que, si cambian, vuelven a ejecutar el
    efecto. `[]` = solo al montar.
26. **300 ms y 3 caracteres.** Es un debounce para no pedir en cada tecla
    (`setTimeout` en `useSpecialties.js`). El back responde 400 con menos de
    3 caracteres, por eso no se pide.
27. **noValidate.** Apaga los globos de validación del navegador para mostrar
    los mensajes de react-hook-form, todos con el mismo estilo.
28. **Paciente en `/admin`.** `ProtectedRoute` ve que el rol no coincide y lo
    manda a `/` (`HOME_BY_ROLE`).
29. **¿Es seguridad?** No, es solo de interfaz. La seguridad real la hace el
    back validando token y rol en cada petición (401/403).
30. **URL inexistente.** La ruta `'*'` de `App.jsx` redirige a `/`; dentro de
    `/admin`, a `/admin/home`.
31. **Carpetas por dominio.** Screaming architecture: la estructura "grita" de
    qué trata la app (médicos, especialidades, turnos), no qué tecnología usa.
    Cada módulo tiene `services`, `hooks`, `pages`, `components`.
32. **Lint y build.** `npm run lint` y `npm run build`.

## D. Sesión: dónde se guarda y por qué

33. **Qué y dónde.** En `localStorage`, a través de
    `shared/helpers/session.js`: `token` (el JWT del login), `role` (para
    `ProtectedRoute`), `dni` (el JWT no lo trae y lo necesitan los turnos del
    paciente) y `email` (se muestra en el layout).
34. **Diferencias.**
    - `localStorage`: queda guardado aunque cierres el navegador, se comparte
      entre pestañas y solo lo lee JavaScript; no viaja solo al servidor.
    - `sessionStorage`: igual, pero se borra al cerrar la pestaña y cada
      pestaña tiene el suyo.
    - Cookies: el navegador las manda **solas** en cada petición al mismo
      dominio. Con `HttpOnly`, JavaScript no las puede leer.
35. **¿Por qué `localStorage`?** Para que la sesión sobreviva a recargar la
    página y a abrir otra pestaña. Con `sessionStorage`, abrir un link en una
    pestaña nueva te mandaría al login.
36. **Cookies.** No se usan. El token viaja en el encabezado
    `Authorization: Bearer <token>`, que agrega el interceptor de
    `axiosInstance.js` (el comentario del archivo aclara que no se usa
    `withCredentials` por eso).
37. **Riesgo.** Si alguien logra meter JavaScript en la página (XSS), puede
    leer `localStorage` y robarse el token. La alternativa es una cookie
    `HttpOnly` + `Secure` + `SameSite` que pone el backend: JavaScript no la
    ve, pero hay que cuidarse de CSRF y configurar CORS con credenciales.
    Lo que mitiga el riesgo en el TPI: React escapa el texto que muestra, el
    token vence y el backend revalida token y rol en cada petición.
38. **Logout.** `signOut` en `AuthProvider.jsx` avisa al back para que revoque
    el token (`auth/services/logout.js`) y, en el `finally`, borra la sesión
    local con `clearSession()` **aunque la petición falle**.
39. **¿Solo el estado de React?** El estado vive en memoria: al recargar se
    pierde y el usuario vuelve al login. Por eso el estado arranca leyendo
    `localStorage` (`useState(getSession)`). El estado de React sirve para
    que la interfaz se actualice; `localStorage` sirve para que dure.
40. **No mezclar.** Si un dato está en un lado y otro en el otro, quedan
    desincronizados (por ejemplo, el token sigue en `localStorage` pero el rol
    se borró al cerrar la pestaña) y no sabés dónde buscar. Lo dijo el profe:
    la sesión en **un solo lugar**.

## E. Vocabulario

41. **Virtual DOM.** React arma una copia del árbol en memoria; cuando cambia
    un estado vuelve a ejecutar el componente (re-render), compara la copia
    nueva con la anterior y toca en el DOM real solo lo que cambió.
42. **Estado vs. props.** El estado es del componente y lo cambia él
    (`useState`); las props vienen del padre y son de solo lectura. Ejemplo:
    `AppointmentsPage` tiene `appointmentToCancel` en su estado y se lo pasa
    a `ConfirmDialog` como prop `isOpen`.
43. **Flujo unidireccional.** Los datos bajan por props (page → componente);
    los eventos suben por funciones que el padre pasa como props
    (`onConfirm`, `onClose` de `ConfirmDialog`).
44. **Inmutabilidad.** React detecta el cambio comparando referencias: si
    modificás el mismo array, la referencia no cambia y no re-renderiza.
    Por eso `usePatientAppointments.js` crea un array nuevo con `filter`.
45. **Renderizado condicional.** `cond && <X />`, `cond ? <A /> : <B />` y
    un `return` temprano (`ProtectedRoute` devuelve `<Navigate />` antes).
    En `AppointmentsPage` está el ternario cargando / error / vacío / lista.
46. **Custom Hook.** Una función que empieza con `use` y usa otros hooks
    para encapsular lógica reutilizable. Ej.: `useSpecialties`,
    `usePatientAppointments`, `useAuth`.
47. **Ciclo de vida.** `useEffect(fn, [])` corre una vez al montar;
    con `[dep]` corre al montar y cada vez que `dep` cambia; la función que
    devuelve (cleanup) corre antes del próximo efecto y al desmontar (ej.:
    cancelar el `setTimeout` de la búsqueda).
48. **Atomic Design.** Átomos: `Button`, `Input`, `StatusBadge`. Moléculas:
    `Field` (label + input + error), `SearchInput`. Organismos: `DataTable`,
    `ConfirmDialog`. Páginas: `pages/` de cada módulo.
49. **Screaming Architecture.** `src/modules/doctors`, `specialties`,
    `patients`, `appointments`: al abrir la carpeta se ve el dominio (turnos
    médicos), no la técnica. Lo compartido va en `shared`.
50. **Dato derivado.** Si se calcula a partir de otro estado, se calcula en
    el render. Guardarlo aparte obliga a sincronizar dos estados y termina
    desfasado.

## F. SOLID y roles

51. **SRP.** Las páginas dibujan; la lógica está en `hooks/` y las llamadas
    HTTP en `services/`. Ej.: `useSpecialties.js` vs. `SpecialtiesPage.jsx`.
52. **OCP.** `Button` y `Modal` reciben `children` y `Button` pasa
    `...restProps` al `<button>` (`disabled`, `onClick`, `aria-*`): se
    extienden por composición sin tocar su código.
53. **ISP.** `DataTable` recibe solo `columns` (con su `render`), las filas y
    el mensaje de vacío. No sabe qué es un médico: por eso sirve para todas
    las tablas.
54. **DIP.** No: las páginas usan hooks, los hooks usan services y los
    services usan la instancia de axios de `shared/api`. Si cambia la API se
    toca el service, no la vista.
55. **allowedRoles.** No: recibe `role` (uno). Cambiaría la prop a
    `allowedRoles` (array) y la condición a
    `!allowedRoles.includes(userRole)`; en `App.jsx`,
    `allowedRoles={[ROLES.ADMIN]}`. Sirve cuando dos roles ven la misma
    página.
56. **Centralizada.** El rol sale de `useAuth()` (que lee `AuthProvider`) y
    se valida en un solo lugar, `ProtectedRoute`, que envuelve cada layout en
    `App.jsx`. Las vistas no chequean el rol.
57. **Tercer rol.** `auth/constants/roles.js` (nuevo rol), `HOME_BY_ROLE` en
    `ProtectedRoute.jsx`, la ruta y su layout en `App.jsx`. Con
    `allowedRoles` sería agregar el rol a la lista de las rutas que ve.
