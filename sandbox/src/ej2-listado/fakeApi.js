// Simula GET /api/patients paginado. NO lo modifiques.
const FIRST = ['Ana', 'Bruno', 'Carla', 'Diego', 'Elena', 'Facundo', 'Gala', 'Hugo'];
const LAST = ['Pérez', 'Gómez', 'Díaz', 'López', 'Sosa'];

const PATIENTS = Array.from({ length: 37 }, (_, i) => {
  const name = `${FIRST[i % FIRST.length]} ${LAST[i % LAST.length]}`;

  return {
    id: String(i + 1),
    name,
    dni: String(30000000 + i * 1371),
    email: `${name.split(' ')[0].toLowerCase()}${i + 1}@mail.com`,
  };
});

export function getPatients({ pageIndex = 0, pageSize = 10, name = '' }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (localStorage.getItem('backendDown')) {
        reject(new Error('Network Error'));
        return;
      }

      if (name && name.length < 3) {
        reject({ response: { status: 400, data: { errorCode: 'VALIDATION_ERROR' } } });
        return;
      }

      const filtered = PATIENTS.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );
      const start = pageIndex * pageSize;

      resolve({
        pageIndex,
        pageSize,
        total: filtered.length,
        data: filtered.slice(start, start + pageSize),
      });
    }, 600);
  });
}
