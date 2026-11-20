import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { fakeSave } from './fakeSave';

// Ejercicio 1: leé ENUNCIADO.md y completá los TODO.
export default function PatientForm() {
  const [saved, setSaved] = useState(false);

  // TODO: sacá de useForm lo que necesites (register, handleSubmit, setError,
  // reset, formState: { errors, isSubmitting }).
  useForm();

  // TODO: función async que recibe los valores, llama a fakeSave y maneja
  // los dos tipos de error (con response y sin response).
  async function save(values) {
    console.log(values, fakeSave, setSaved);
  }

  return (
    <main>
      <h1>Alta de paciente</h1>

      {/* TODO: onSubmit con handleSubmit(save). ¿Por qué conviene noValidate? */}
      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="name">Nombre</label>
        {/* TODO: register con reglas + maxLength en el input */}
        <input id="name" />
        {/* TODO: mostrar el error de name */}

        <label htmlFor="dni">DNI</label>
        {/* TODO: solo números (no se pueden escribir letras) */}
        <input id="dni" inputMode="numeric" />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" />

        {/* TODO: error general (root) */}

        {/* TODO: deshabilitar y cambiar el texto mientras guarda */}
        <button type="submit">Guardar</button>

        {saved && <p>Paciente guardado</p>}
      </form>
    </main>
  );
}
