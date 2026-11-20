// Simula el POST al backend. NO lo modifiques.
// - DNI '11111111'  -> error de validación con details (como el back del TPI).
// - Nombre 'caido'  -> error sin response (backend apagado).
// - Cualquier otro  -> guarda bien después de 1 segundo.
export function fakeSave(values) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.name?.toLowerCase() === 'caido') {
        reject(new Error('Network Error'));
        return;
      }

      if (values.dni === '11111111') {
        reject({
          response: {
            status: 400,
            data: {
              errorCode: 'VALIDATION_ERROR',
              message: 'Validation failed',
              details: [{ field: 'Dni', issue: 'Ya existe un paciente con ese DNI.' }],
            },
          },
        });
        return;
      }

      resolve({ id: crypto.randomUUID(), ...values });
    }, 1000);
  });
}
