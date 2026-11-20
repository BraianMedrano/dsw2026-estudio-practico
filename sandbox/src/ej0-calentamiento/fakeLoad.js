// Simula un GET al backend. Cambiá fail a true para probar el error.
const fail = false;

export function fakeLoad() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(new Error('No se pudo conectar con el servidor.'));
      else resolve(['Cardiología', 'Pediatría', 'Dermatología', 'Clínica médica', 'Traumatología']);
    }, 800);
  });
}

