import { useState } from 'react';

const STATUS_LABELS = { PENDING: 'Pendiente', CANCELLED: 'Cancelado' };

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

// Componente de presentación: recibe solo lo que necesita (un turno y la
// función para cancelarlo).
export default function AppointmentCard({ appointment, onCancel }) {
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState('');

  async function handleCancel() {
    setIsCancelling(true);
    setCancelError('');

    try {
      await onCancel(appointment.id);
    } catch (requestError) {
      setCancelError(
        requestError.response?.data?.message ?? 'No se pudo cancelar el turno.',
      );
    } finally {
      setIsCancelling(false);
    }
  }

  return (
    <li className="card">
      <strong>{appointment.specialty}</strong>
      <span> — {STATUS_LABELS[appointment.status] ?? appointment.status}</span>
      <p>Médico: {appointment.doctor}</p>
      <p>
        Fecha: {formatDate(appointment.date)} · Hora: {appointment.startTime}
      </p>
      <p>Motivo: {appointment.reason}</p>
      <button type="button" onClick={handleCancel} disabled={isCancelling}>
        {isCancelling ? 'Cancelando...' : 'Cancelar turno'}
      </button>
      {cancelError && <p className="error">{cancelError}</p>}
    </li>
  );
}
