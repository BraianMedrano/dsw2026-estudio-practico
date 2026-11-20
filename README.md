# Estudio práctico — Defensa TPI DSW 2026

Objetivo: llegar a la defensa sabiendo **cómo** se hace cada cosa (escribiéndola a
mano) y **dónde** está en el TPI (contestando preguntas en voz alta).

## Cómo usar esta carpeta

| Momento | Qué hacer | Dónde |
|---|---|---|
| Con compu, 20–30 min | Un ejercicio del sandbox | `sandbox/src/ej*/ENUNCIADO.md` |
| Sin compu (colectivo, espera) | Preguntas en voz alta, 1–2 frases, nombrando el archivo | `PREGUNTAS.md` |
| Después de contestar | Corregirte | `RESPUESTAS/preguntas.md` |
| Antes de la defensa | Simulacro completo (ver abajo) | TPI |

Reglas:

1. El código lo escribís vos, a mano. Sin IA. Se puede mirar la documentación.
2. Al terminar cada ejercicio, abrí los archivos del TPI que indica el enunciado
   y compará. Esa comparación es la que te enseña **dónde** está cada cosa.
3. Si algo no te sale en 30 minutos, mirá el TPI, cerralo y escribilo de nuevo.

## Orden (por riesgo en la defensa)

0. `ej0-calentamiento` — lo del teórico (eventos, arrays, async/await,
   useEffect, storage) aplicado en React. **Empezá acá si nunca escribiste
   React.**
1. `ej1-formulario` — inputs con límites, solo números y errores del backend.
   **Es lo que más prueba el profe.**
2. `ej2-listado` — service → hook → page, tabla reutilizable y paginación.
3. `ej3-rutas` — sesión en un solo lugar y `ProtectedRoute` por sesión y rol.
4. `ej4-modificaciones` — **modificaciones en vivo** sobre código que ya
   funciona: validación, filtro y renderizado condicional, verificadas con
   DevTools (Network y Console) contra una API de práctica.
5. Las mismas modificaciones, pero sobre el TPI (abajo). **Recién acá entrás
   al TPI.**

## Levantar el sandbox

```bash
cd sandbox
npm install   # solo la primera vez
npm run dev
```

Abrí la URL que muestra Vite. La página de inicio tiene un link a cada
ejercicio.

## Cómo te evalúan (rúbrica individual del profe)

| Qué | Peso | Para el 100% |
|---|---|---|
| Comprensión del código (C) | 35% | Explicar estructura, flujo unidireccional de datos, hooks y la integración con la API |
| Modificación en vivo (M) | 30% | Resolver solo, rápido y limpio: **agregar una regla de validación, crear un filtro o condicionar un renderizado** |
| Verificación (V) | 20% | Probar en el navegador **y** con DevTools: Network (petición y payload) y Console limpia |
| Vocabulario (F) | 15% | Usar los términos correctos (ver `PREGUNTAS.md`, sección E) |

Mirar la pantalla y decir "se ve bien" te deja en 60% de V. Siempre hacé el
recorrido de abajo.

## Cómo verificar un cambio (20% de la nota)

Hacelo en voz alta, como en la defensa:

1. DevTools abierto (F12) **antes** de probar. Pestaña **Console** limpia
   (botón de vaciar).
2. Probá el caso que falla (dato inválido) y el que funciona.
3. **Network**, filtro `Fetch/XHR`: hacé clic en la petición y mirá
   - **Headers**: método, URL con sus query params y `Authorization: Bearer ...`.
   - **Payload**: el cuerpo que mandaste (en un POST/PUT).
   - **Response**: lo que devolvió el back y el código (200, 201, 400, 401...).
4. Si la validación es del front, **no** tiene que aparecer ninguna petición
   cuando el dato es inválido. Decilo: "no salió la petición porque lo
   frenó react-hook-form".
5. Volvé a **Console**: sin errores ni warnings en rojo/amarillo.
6. `npm run lint` y `npm run build` sin errores.

## Ejercicio 5 — Modificaciones en vivo sobre el TPI

Hacelo **después** del `ej4` del sandbox: son las mismas consignas, ahora en
el código real, para aprender **dónde** está cada cosa. Rama descartable y
con reloj (15–20 min cada una). **Escribí el código vos.**

```bash
git switch -c practica/modificacion-1   # al terminar: git switch development
git switch development && git branch -D practica/modificacion-1   # descartar
```

Las tres primeras son las que la rúbrica nombra textualmente. Hacé las tres.

### 5.1 Agregar una regla de validación

- Consigna: "la descripción de una especialidad tiene que tener al menos 10
  caracteres" (o "la matrícula del médico solo letras, números y guiones").
- Dónde: `shared/helpers/inputRules.js` (límites y patrones) y el form, por
  ejemplo `specialties/components/SpecialtyForm.jsx` (`register` con
  `minLength` / `pattern` y su `message`).
- Verificá: con el dato inválido aparece el error debajo del campo y **no**
  sale petición en Network; con el dato válido sale el POST/PUT y en Payload
  ves el valor.

### 5.2 Crear un filtro

- Consigna: "en Mis turnos, que el paciente pueda ver solo los turnos de una
  especialidad" (un `<select>` arriba de las tarjetas, con "Todas" y las
  especialidades que aparecen en sus turnos).
- Dónde: `patients/pages/AppointmentsPage.jsx`. Un `useState` para la
  especialidad elegida y la lista filtrada **calculada** con `.filter()` antes
  del `return` (no la guardes en otro estado: es un dato derivado). Las
  opciones también se calculan desde `appointments` (sin repetidas). El select
  con `Select` de `shared/components`. Cambiá el `.map` para que recorra la
  lista filtrada.
- Verificá: al cambiar el filtro **no** sale petición nueva (filtra en el
  front sobre lo que ya llegó). Explicá la diferencia con un filtro del back:
  ese iría por hook → service → query param, como en
  `appointments/hooks/useAppointmentSearch.js`, y en Network lo verías en la
  URL (`?status=...`).
- Variante admin: en `doctors/pages/DoctorsPage.jsx`, filtrar la página
  actual por especialidad.

### 5.3 Condicionar un renderizado

- Consigna: "en Mis turnos, mostrar una etiqueta 'Hoy' en los turnos de hoy"
  o "mostrar 'Tenés N turnos activos' solo cuando hay más de uno".
- Dónde: la page (`patients/pages/AppointmentsPage.jsx`) hace el `.map` y
  le pasa cada turno a `patients/components/appointments/AppointmentCard.jsx`,
  que es la que dibuja la tarjeta. "Hoy" va en `AppointmentCard` (es un dato
  de un turno); "Tenés N turnos activos" va en la page (es un dato de la
  lista). Usá `&&` o el ternario `? :` en el JSX. Para "Hoy", compará `appointment.date` con la fecha de hoy (mirá cómo
  llega el formato en Network → Response antes de escribir la comparación).
- Verificá: con un turno que cumple y otro que no. En Console, nada en rojo
  (ojo con las fechas `undefined`).

### 5.4 Extras si te sobra tiempo

| Tipo | Ejemplo | Archivos que vas a tocar |
|---|---|---|
| Columna | Mostrar en una tabla un dato que ya viene del backend y no se muestra | la page del listado y sus `columns` para `DataTable` |
| Ruta / rol | Agregar una página nueva solo para el admin | `App.jsx` (dentro de los `children` de `/admin`) y el menú de `DashboardLayout.jsx` |
| Mensaje de error | Traducir un `errorCode` nuevo del backend | `shared/helpers/apiError.js` |

## Simulacro final

1. `npm run lint` y `npx prettier --check .` en el TPI (la rúbrica grupal
   pide los dos limpios).
2. Recorrer **toda** la UI rompiendo cada input (ver la checklist al final de
   `PREGUNTAS.md`).
3. Contestar `PREGUNTAS.md` entero en voz alta, sin mirar, como en la defensa.
   Las secciones E y F salen de la rúbrica y del prompt que usa el profe.
4. Una modificación en vivo con 15 minutos de reloj, verificándola con el
   recorrido de DevTools de arriba **en voz alta**.
