import { Link } from 'react-router-dom';
import AppointmentCard from './AppointmentCard';
import AppointmentForm from './AppointmentForm';
import useAppointments from './useAppointments';

// Page: usa el hook y compone los componentes. Acá no hay fetch.
export default function AppointmentsPage() {
  const { appointments, isLoading, error, reload, create, cancel } =
    useAppointments();

  return (
    <main>
      <Link to="/">← Inicio</Link>
      <h1>Mis turnos</h1>

      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <div>
          <p className="error">{error}</p>
          <button type="button" onClick={reload}>
            Reintentar
          </button>
        </div>
      ) : appointments.length === 0 ? (
        <p>No tenés turnos.</p>
      ) : (
        <ul className="cards">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onCancel={cancel}
            />
          ))}
        </ul>
      )}

      <AppointmentForm onCreate={create} />
    </main>
  );
}
