import { useCallback, useEffect, useState } from 'react';
import {
  cancelAppointment,
  createAppointment,
  getAppointments,
} from './appointmentsService';

// Custom hook: toda la lógica y el estado. La page solo dibuja.
export default function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      setAppointments(await getAppointments());
    } catch {
      setError('No se pudieron cargar los turnos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function create(values) {
    const created = await createAppointment(values);
    // Inmutabilidad: un array nuevo, nunca push() sobre el actual.
    setAppointments((current) => [...current, created]);
  }

  async function cancel(id) {
    const updated = await cancelAppointment(id);
    setAppointments((current) =>
      current.map((item) => (item.id === id ? updated : item)),
    );
  }

  return { appointments, isLoading, error, reload: load, create, cancel };
}
