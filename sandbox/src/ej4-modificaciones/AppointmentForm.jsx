import { useForm } from 'react-hook-form';

const SPECIALTIES = ['Cardiología', 'Clínica médica', 'Pediatría'];

// El backend nombra los campos en PascalCase; el formulario, en camelCase.
const FIELD_BY_BACKEND_NAME = {
  Specialty: 'specialty',
  Doctor: 'doctor',
  Date: 'date',
  StartTime: 'startTime',
  Reason: 'reason',
};

const EMPTY_VALUES = {
  specialty: '',
  doctor: '',
  date: '',
  startTime: '',
  reason: '',
};

export default function AppointmentForm({ onCreate }) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY_VALUES });

  async function save(values) {
    try {
      await onCreate(values);
      reset(EMPTY_VALUES);
    } catch (requestError) {
      const details = requestError.response?.data?.details ?? [];

      if (details.length > 0) {
        details.forEach(({ field, issue }) =>
          setError(FIELD_BY_BACKEND_NAME[field] ?? 'root', { message: issue }),
        );
        return;
      }

      setError('root', {
        message: requestError.response
          ? 'No se pudo guardar el turno.'
          : 'No hay conexión con el servidor.',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(save)} noValidate>
      <h2>Nuevo turno</h2>

      <label htmlFor="specialty">Especialidad</label>
      <select
        id="specialty"
        {...register('specialty', { required: 'Elegí una especialidad.' })}
      >
        <option value="">Elegí una opción</option>
        {SPECIALTIES.map((specialty) => (
          <option key={specialty} value={specialty}>
            {specialty}
          </option>
        ))}
      </select>
      {errors.specialty && <p className="error">{errors.specialty.message}</p>}

      <label htmlFor="doctor">Médico</label>
      <input
        id="doctor"
        {...register('doctor', { required: 'Ingresá el médico.' })}
      />
      {errors.doctor && <p className="error">{errors.doctor.message}</p>}

      <label htmlFor="date">Fecha</label>
      <input
        id="date"
        type="date"
        {...register('date', { required: 'Elegí una fecha.' })}
      />
      {errors.date && <p className="error">{errors.date.message}</p>}

      <label htmlFor="startTime">Hora</label>
      <input
        id="startTime"
        type="time"
        {...register('startTime', { required: 'Elegí una hora.' })}
      />
      {errors.startTime && <p className="error">{errors.startTime.message}</p>}

      <label htmlFor="reason">Motivo</label>
      {/* Sin reglas en el front a propósito: la modificación 1 pide agregarlas. */}
      <textarea id="reason" rows={3} {...register('reason')} />
      {errors.reason && <p className="error">{errors.reason.message}</p>}

      {errors.root && <p className="error">{errors.root.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : 'Guardar turno'}
      </button>
    </form>
  );
}
