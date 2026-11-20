# Ejercicio 1 — Formulario con límites (20–30 min)

Es lo que más prueba el profe: intenta romper los inputs desde la UI.

Completá `PatientForm.jsx` usando **react-hook-form**. No toques `fakeSave.js`
(simula el backend).

## Campos

| Campo | Reglas |
|---|---|
| Nombre | Obligatorio, de 3 a 100 caracteres, solo letras, espacios, `.`, `'` y `-`. No acepta solo espacios. |
| DNI | Obligatorio, **solo números** (las letras no se pueden ni escribir), 7 u 8 dígitos. |
| Email | Obligatorio, formato de email, hasta 150 caracteres. |

## Comportamiento

1. Cada error se muestra debajo de su campo, con el mensaje en español.
2. No se puede escribir más del máximo (el input corta).
3. Mientras se guarda, el botón dice "Guardando..." y está deshabilitado.
4. Si `fakeSave` falla **con** `response`: por cada `details` mostrá el
   `issue` en su campo (`setError`). Ojo: el back manda `'Dni'`, no `'dni'`.
5. Si falla **sin** `response` (backend caído): mostrá un mensaje general
   arriba del botón (`setError('root', ...)`).
6. Si sale bien: "Paciente guardado" y el formulario se vacía (`reset`).

## Probalo como el profe

- Pegá 300 caracteres en Nombre.
- Escribí solo espacios en Nombre.
- Escribí letras en DNI.
- DNI `11111111` → error del back en el campo DNI.
- Nombre `caido` → mensaje de backend caído.
- Doble clic en Guardar.

## Pistas (mirá solo si te trabás)

- `register('name', { required: '...', maxLength: { value, message } })`
- `setValueAs: (v) => v.trim()`
- `formState: { errors, isSubmitting }`
- Para el DNI: envolvé el `onChange` que devuelve `register` y limpiá con
  `value.replace(/\D/g, '')`.

## Compará con el TPI

- `src/modules/shared/helpers/inputRules.js` → `FIELD_LIMITS`, `NAME_PATTERN`, `digitsOnly`
- `src/modules/specialties/components/SpecialtyForm.jsx` → reglas, `setError`, doble envío
- `src/modules/shared/helpers/apiError.js` → cómo se traducen los errores del back
- `src/modules/patients/pages/PatientLoginPage.jsx` → DNI solo números
