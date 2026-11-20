// API de práctica para el ejercicio 4. Corre dentro del servidor de Vite
// (solo con `npm run dev`), así cada llamada aparece en DevTools → Network
// como con un backend real. NO la modifiques: hace de backend del TPI.
// Los datos viven en memoria: reiniciá `npm run dev` para volver al inicio.

const DELAY_MS = 400;
const TOKEN = 'Bearer demo-token';
const SPECIALTIES = ['Cardiología', 'Clínica médica', 'Pediatría'];

function toIsoDate(daysFromToday) {
  const date = new Date();

  date.setDate(date.getDate() + daysFromToday);
  const pad = (value) => String(value).padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function createSeed() {
  return [
    {
      id: 1,
      specialty: 'Cardiología',
      doctor: 'Laura Méndez',
      date: toIsoDate(0),
      startTime: '10:30',
      reason: 'Control anual',
      status: 'PENDING',
    },
    {
      id: 2,
      specialty: 'Pediatría',
      doctor: 'Martín Ríos',
      date: toIsoDate(2),
      startTime: '09:00',
      reason: 'Vacunas',
      status: 'PENDING',
    },
    {
      id: 3,
      specialty: 'Clínica médica',
      doctor: 'Sofía Herrera',
      date: toIsoDate(5),
      startTime: '16:15',
      reason: 'Dolor de cabeza',
      status: 'CANCELLED',
    },
    {
      id: 4,
      specialty: 'Cardiología',
      doctor: 'Laura Méndez',
      date: toIsoDate(7),
      startTime: '11:00',
      reason: 'Resultados de estudios',
      status: 'PENDING',
    },
    {
      id: 5,
      specialty: 'Clínica médica',
      doctor: 'Sofía Herrera',
      date: toIsoDate(0),
      startTime: '18:00',
      reason: 'Certificado',
      status: 'PENDING',
    },
  ];
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve) => {
    let raw = '';

    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw || '{}'));
      } catch {
        resolve({});
      }
    });
  });
}

function isBlank(value) {
  return typeof value !== 'string' || value.trim() === '';
}

// Mismo formato que el backend del TPI: nombres de campo en PascalCase.
function validate(body) {
  const details = [];

  if (!SPECIALTIES.includes(body.specialty)) {
    details.push({
      field: 'Specialty',
      issue: 'Elegí una especialidad válida.',
    });
  }

  if (isBlank(body.doctor)) {
    details.push({ field: 'Doctor', issue: 'El médico es obligatorio.' });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date ?? '')) {
    details.push({ field: 'Date', issue: 'La fecha no es válida.' });
  }

  if (!/^\d{2}:\d{2}$/.test(body.startTime ?? '')) {
    details.push({ field: 'StartTime', issue: 'La hora no es válida.' });
  }

  if (isBlank(body.reason)) {
    details.push({ field: 'Reason', issue: 'El motivo es obligatorio.' });
  } else if (body.reason.length > 200) {
    details.push({
      field: 'Reason',
      issue: 'El motivo admite hasta 200 caracteres.',
    });
  }

  return details;
}

export default function mockApi() {
  let appointments = createSeed();
  let nextId = appointments.length + 1;

  async function handle(req, res) {
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

    if (req.headers.authorization !== TOKEN) {
      send(res, 401, { errorCode: 'UNAUTHORIZED', message: 'Falta el token.' });

      return;
    }

    const url = new URL(req.url, 'http://localhost');
    const path = url.pathname.replace(/\/$/, '');

    if (req.method === 'GET' && path === '') {
      const status = url.searchParams.get('status');

      send(
        res,
        200,
        status
          ? appointments.filter((item) => item.status === status)
          : appointments
      );

      return;
    }

    if (req.method === 'POST' && path === '') {
      const body = await readBody(req);
      const details = validate(body);

      if (details.length > 0) {
        send(res, 400, {
          errorCode: 'VALIDATION_ERROR',
          message: 'Datos inválidos.',
          details,
        });

        return;
      }

      const created = {
        id: nextId++,
        specialty: body.specialty,
        doctor: body.doctor.trim(),
        date: body.date,
        startTime: body.startTime,
        reason: body.reason.trim(),
        status: 'PENDING',
      };

      appointments = [...appointments, created];
      send(res, 201, created);

      return;
    }

    const cancelMatch = path.match(/^\/(\d+)\/cancel$/);

    if (req.method === 'PATCH' && cancelMatch) {
      const id = Number(cancelMatch[1]);
      const current = appointments.find((item) => item.id === id);

      if (!current) {
        send(res, 404, {
          errorCode: 'ENTITY_NOTFOUND',
          message: 'El turno no existe.',
        });

        return;
      }

      if (current.status === 'CANCELLED') {
        send(res, 409, {
          errorCode: 'ALREADY_CANCELLED',
          message: 'El turno ya estaba cancelado.',
        });

        return;
      }

      const updated = { ...current, status: 'CANCELLED' };

      appointments = appointments.map((item) =>
        item.id === id ? updated : item
      );
      send(res, 200, updated);

      return;
    }

    send(res, 404, { errorCode: 'NOT_FOUND', message: 'La ruta no existe.' });
  }

  return {
    name: 'practice-mock-api',
    configureServer(server) {
      server.middlewares.use('/api/appointments', (req, res) => {
        handle(req, res).catch(() =>
          send(res, 500, {
            errorCode: 'SERVER_ERROR',
            message: 'Error interno.',
          })
        );
      });
    },
  };
}
