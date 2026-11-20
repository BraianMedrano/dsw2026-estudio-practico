// Capa de servicios: el único lugar que conoce la URL y cómo llamar a la API.
// Misma idea que `services/` en el TPI (allá con axios, acá con fetch).
const BASE_URL = '/api/appointments';
const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer demo-token',
};

async function request(url, options = {}) {
  const response = await fetch(url, { ...options, headers: HEADERS });
  const body = await response.json();

  if (!response.ok) {
    // Mismo formato que un error de axios: error.response.status / .data.
    const error = new Error(body?.message ?? 'Error de la API');

    error.response = { status: response.status, data: body };
    throw error;
  }

  return body;
}

export function getAppointments() {
  return request(BASE_URL);
}

export function createAppointment(appointment) {
  return request(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(appointment),
  });
}

export function cancelAppointment(id) {
  return request(`${BASE_URL}/${id}/cancel`, { method: 'PATCH' });
}
