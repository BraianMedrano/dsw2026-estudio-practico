# Banco de preguntas — Defensa TPI

Contestá en voz alta, en 1 o 2 frases, **nombrando el archivo**. Después
corregite con `RESPUESTAS/preguntas.md`. Marcá las que te costaron y repetilas.

## A. Las que el profe dijo en clase que pregunta

1. ¿Dónde se hace la protección por rol? ¿Y en el backend?
2. ¿Qué usa el backend para leer los query params? ¿Cómo los manda el front?
3. ¿Dónde se maneja la sesión? ¿Quién toca `localStorage`?
4. ¿Por qué al recargar la página no se pierde la sesión?
5. ¿Qué pasa si el token vence y el backend responde 401?
6. ¿Decodifican el JWT en el front? ¿De dónde sacan el rol?
7. ¿De dónde sale el usuario que se muestra en el layout?
8. ¿Dónde va la lógica: en el componente o en otro lado? Mostrame un ejemplo.
9. ¿Dónde aplicaron atomic design? ¿Cómo evitan duplicar tablas?
10. ¿La baja es física o lógica? ¿Quién la hace?
11. ¿Cómo llenan un selector si el endpoint está paginado?
12. ¿Por qué el paciente está en `/` y el admin en `/admin`?

## B. Probables aunque no las dijo

13. ¿Qué es un Context? ¿Por qué `useAuth` tira un error fuera del provider?
14. ¿Por qué el router se crea afuera del componente `App`?
15. ¿Qué hace `<Outlet />`?
16. ¿Para qué está el proxy en `vite.config.js`?
17. ¿Dónde se agrega el token a cada petición?
18. ¿Cómo muestran los errores del backend en el formulario?
19. ¿Qué ve el usuario si el backend está apagado?
20. ¿Dónde están definidos los límites de caracteres? ¿Por qué hay `maxLength`
    en el input **y** en las reglas de react-hook-form?
21. ¿Cómo logran que el DNI acepte solo números?
22. ¿Por qué usan `setValueAs: trim`? ¿Qué pasaría sin eso?
23. ¿Cómo evitan que un doble clic mande el formulario dos veces?
24. ¿Para qué sirve la función que devuelve el `useEffect` (cleanup)?
25. ¿Qué indica el array de dependencias del `useEffect`?
26. ¿Por qué la búsqueda espera 300 ms y pide mínimo 3 caracteres?
27. ¿Para qué está `noValidate` en el `<form>`?
28. Si un paciente logueado escribe `/admin/doctors` a mano, ¿qué pasa y dónde
    se decide?
29. ¿Proteger rutas en el front es seguridad? ¿Por qué?
30. ¿Qué pasa con una URL que no existe?
31. ¿Por qué las carpetas son `modules/doctors`, `modules/specialties`…?
32. ¿Cómo corrés el lint y el build?

## D. Sesión: dónde se guarda y por qué

33. ¿Qué guardan en la sesión y dónde? ¿Por qué cada dato?
34. Diferencia entre `localStorage`, `sessionStorage` y cookies.
35. ¿Por qué eligieron `localStorage` y no `sessionStorage`?
36. ¿Usan cookies? ¿Cómo viaja el token al backend?
37. ¿Qué riesgo tiene guardar el token en `localStorage`? ¿Qué alternativa hay?
38. ¿Qué pasa al cerrar sesión? ¿Y si el backend no responde en ese momento?
39. ¿Por qué no alcanza con guardar la sesión solo en el estado de React?
40. ¿Por qué no mezclar `localStorage` con `sessionStorage`?

## E. Vocabulario (15% de la nota)

Definí cada término en una frase **y** mostrá dónde está en el TPI.

41. Virtual DOM y re-render: ¿qué hace React cuando cambia un estado?
42. Estado vs. props: ¿cuál es de quién? Un ejemplo en el TPI.
43. Flujo unidireccional de datos: ¿hacia dónde viajan los datos y cómo
    "sube" un evento?
44. Inmutabilidad: ¿por qué `setAppointments(current => current.filter(...))`
    y no `appointments.splice(...)`?
45. Renderizado condicional: tres formas de escribirlo en JSX.
46. Custom Hook: ¿qué es, cómo se reconoce y cuál es el que más usan?
47. Ciclo de vida con hooks: ¿cuándo corre `useEffect` con `[]`, con
    dependencias y su cleanup?
48. Atomic Design: un átomo, una molécula y una página del TPI.
49. Screaming Architecture: ¿qué "grita" la carpeta `src/modules`?
50. Dato derivado: ¿por qué una lista filtrada no va en otro `useState`?

## F. Las del prompt que usa el profe (SOLID y roles)

51. SRP: ¿tus componentes solo dibujan? ¿Dónde están los cálculos y las
    llamadas a la API?
52. OCP: ¿cómo extendés `Button` o `Modal` sin tocar su código?
53. ISP: ¿qué props recibe `DataTable`? ¿Por qué no le pasan el objeto
    entero de la respuesta?
54. DIP: ¿una página llama a `axios`? ¿De qué depende la vista?
55. ¿Su `ProtectedRoute` acepta una lista de roles (`allowedRoles`)? ¿Qué
    cambiarías para que sí?
56. ¿La verificación del rol está centralizada o la repiten en cada vista?
57. Si mañana hay un tercer rol (recepcionista) que ve los turnos, ¿qué
    archivos tocás?

## C. Checklist de UI (lo que prueba el profe)

En **cada** input del TPI:

- [ ] Pegar un texto de 300 caracteres: ¿se corta en el límite?
- [ ] Solo espacios: ¿lo toma como vacío?
- [ ] Letras en un campo numérico (DNI): ¿se pueden escribir?
- [ ] Símbolos o emojis en un nombre: ¿muestra el error?
- [ ] Enviar vacío: ¿muestra el mensaje en cada campo obligatorio?
- [ ] Doble clic en Guardar: ¿se envía una sola vez?

En la app:

- [ ] Backend apagado: ¿se ve un mensaje entendible, no una pantalla rota?
- [ ] Recargar estando logueado: ¿sigue la sesión?
- [ ] Paciente escribiendo `/admin` a mano: ¿lo saca?
- [ ] Cerrar sesión y apretar "atrás" en el navegador: ¿vuelve a entrar?
- [ ] Lista vacía y búsqueda sin resultados: ¿hay un mensaje?
