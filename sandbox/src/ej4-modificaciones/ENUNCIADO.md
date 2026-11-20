# Ejercicio 4 — Modificaciones en vivo (60–75 min)

Es el formato de la defensa: te dan código **que ya funciona y que no
escribiste vos**, y te piden "agregame esto". La rúbrica nombra tres
consignas: **regla de validación, filtro y renderizado condicional**. Acá
practicás las tres escribiendo el código a mano y verificando con DevTools.

La pantalla "Mis turnos" ya anda contra una API de práctica
(`/api/appointments`, en `sandbox/mockApi.js`, que **no** se toca). Se
reinicia al cortar y volver a correr `npm run dev`.

## Paso 0 — Leer antes de tocar (10 min)

Antes de escribir, recorré el código y decilo en voz alta (es lo que evalúa
"Comprensión", 35%):

1. `AppointmentsPage.jsx` → ¿de dónde salen `appointments`, `isLoading`,
   `error`?
2. `useAppointments.js` → ¿cuándo corre el `useEffect`? ¿Por qué `create` y
   `cancel` arman un array nuevo?
3. `appointmentsService.js` → ¿qué URL, método y headers manda?
4. Abrí DevTools → **Network** (filtro `Fetch/XHR`), recargá y hacé clic en
   `appointments`: mirá **Headers** (método, URL, `Authorization`) y
   **Response**. Tiene que coincidir con lo que leíste.

## Modificación 1 — Regla de validación (15 min)

> "El motivo es obligatorio, de 10 a 200 caracteres, y no vale escribir solo
> espacios. El input no tiene que dejar escribir más de 200."

- Dónde: `AppointmentForm.jsx`, el `register('reason')`.
- **Antes de tocar**: dejá el motivo vacío y guardá. En Network vas a ver un
  `POST` con **400** y en Response el `details` del back. Ese error se
  muestra bajo el campo gracias a `setError`. En Console vas a ver
  `Failed to load resource: ... 400`: es el navegador avisando que la
  petición volvió con error, no un error de tu código. Después del cambio
  desaparece porque la petición ya no sale.
- **Después**: con el motivo vacío o corto, el error aparece **y no sale
  ninguna petición** en Network. Con un motivo válido sale el `POST`, en
  **Payload** ves el texto y la respuesta es **201**.
- Pistas: `required`, `minLength` y `maxLength` con `{ value, message }`,
  `validate` o `setValueAs: (v) => v.trim()` para los espacios, y el atributo
  `maxLength` en el `<textarea>`.

## Modificación 2 — Filtro (20 min)

> "Arriba de la lista, un selector para ver Todas o solo una especialidad."

- Dónde: `AppointmentsPage.jsx`.
- Un `useState` para la especialidad elegida (`''` = todas).
- La lista filtrada se **calcula** antes del `return` con `.filter()`. No la
  guardes en otro `useState`: es un dato derivado.
- Las opciones del `<select>` salen de los turnos, sin repetidas
  (`new Set(...)`).
- El `.map` tiene que recorrer la lista filtrada. Si el filtro deja la lista
  vacía, mostrá "No hay turnos de esa especialidad".
- Verificá: al cambiar el filtro **no sale petición** en Network (filtra en el
  front lo que ya llegó). Explicalo en voz alta.

### Variante: el filtro en el back (si te sobra tiempo)

> "Que el selector sea Todos / Pendientes / Cancelados y que filtre el
> backend."

La API acepta `GET /api/appointments?status=PENDING` (o `CANCELLED`). El
cambio atraviesa las tres capas: el **service** recibe `status` y arma el
query param (`URLSearchParams`), el **hook** guarda el estado y lo pone en
las dependencias del `useEffect`, y la **page** solo muestra el selector.
Verificá en Network que la URL lleve `?status=...` y que cambie la respuesta.

## Modificación 3 — Renderizado condicional (15 min)

> "a) No mostrar el botón Cancelar en los turnos cancelados.
> b) Mostrar una etiqueta 'Hoy' en los turnos de hoy.
> c) Mostrar 'Tenés N turnos pendientes' solo si hay más de uno."

- Dónde: a) y b) en `AppointmentCard.jsx`; c) en `AppointmentsPage.jsx`.
- **Antes de tocar a)**: cancelá el turno que ya está cancelado. En Network
  vas a ver un `PATCH` con **409** y el mensaje bajo la tarjeta. Después del
  cambio, el botón no está.
- Para b): mirá en Network → Response cómo llega `date` (`AAAA-MM-DD`) y armá
  la fecha de hoy con el mismo formato. Ojo: `new Date().toISOString()` está
  en UTC y después de las 21 h te da el día siguiente.
- Usá `&&` y el ternario `? :`. Al final, **Console** limpia.

## Cómo cerrar cada modificación (20% de la nota)

En voz alta: el caso inválido y el válido, **Network** (Headers, Payload,
Response y código), **Console** limpia y `npm run build` sin errores.

## Compará con el TPI (cuando termines todo)

- Modificación 1 → `src/modules/shared/helpers/inputRules.js` y
  `src/modules/specialties/components/SpecialtyForm.jsx`
- Modificación 2 → `src/modules/patients/pages/AppointmentsPage.jsx` (dónde
  irían el `useState` y el `.filter`) y
  `src/modules/appointments/hooks/useAppointmentSearch.js` (filtros en el back)
- Modificación 3 → el ternario cargando / error / vacío / lista de
  `AppointmentsPage.jsx` y `StatusBadge` en `shared/components`

Después pasá al ejercicio 5 del `README.md`: las mismas consignas, pero sobre
el TPI.
