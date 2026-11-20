# Ejercicio 0 — Calentamiento (lo de la teoría, aplicado) — 30–40 min

Si nunca escribiste React, empezá acá. Son 4 partes chicas en `WarmUp.jsx`.
Cada una usa un tema del teórico y aparece en el TPI.

| Parte | Qué hacés | Tema del teórico | Dónde está en el TPI |
|---|---|---|---|
| A | Input controlado con contador `n/100`; no deja pasar de 100 | eventos (`onChange`, `event.target.value`) + `useState` | los forms y `inputRules.js` (`digitsOnly` modifica el `event`) |
| B | Lista de nombres filtrada por lo que escribís en A | arrays: `filter`, `map`, `includes` | tablas (`map` de filas), selectores, `useAvailableSlots.js` |
| C | Cargar la lista con `fakeLoad()`: "Cargando...", error o datos | promesas, `async/await`, `try/catch/finally`, `useEffect` | todos los hooks (`useSpecialties.js`) y services |
| D | Que el texto de A sobreviva a recargar la página | `localStorage` | `shared/helpers/session.js` |

## Paso a paso

**A.** `const [text, setText] = useState('')`. En `onChange`, guardá el valor
solo si `length <= 100`. Mostrá `{text.length}/100`.
Probá: ¿qué diferencia hay con poner `maxLength={100}` en el input?

**B.** Con el array `names` (ya está), mostrá en un `<ul>` solo los que
contienen `text` (sin importar mayúsculas). Cada `<li>` con `key`.

**C.** Reemplazá el array fijo por los datos de `fakeLoad()` dentro de un
`useEffect`. Hacé el `async` adentro del efecto (¿por qué no se puede poner
`async` directo en el `useEffect`?). Probá romperlo cambiando `fail` a `true`.

**D.** El estado de A arranca leyendo `localStorage` y cada cambio se guarda.
Pista: `useState(() => localStorage.getItem('text') ?? '')`. Es el mismo
truco que usa `AuthProvider` con `useState(getSession)`.

## Preguntas para contestar en voz alta al terminar

1. En C, ¿en qué orden se imprimen un `console.log` antes del `await`, uno
   después y uno fuera del efecto? (orden de ejecución)
2. ¿Qué pasa si sacás el array de dependencias del `useEffect`?
3. ¿Por qué el estado de React solo no alcanza para mantener la sesión?
