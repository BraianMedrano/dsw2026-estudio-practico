import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from './Home';
import WarmUp from './ej0-calentamiento/WarmUp';
import PatientForm from './ej1-formulario/PatientForm';
import PatientsPage from './ej2-listado/PatientsPage';
import { AuthProvider } from './ej3-rutas/AuthProvider';
import ProtectedRoute from './ej3-rutas/ProtectedRoute';
import LoginPage from './ej3-rutas/LoginPage';
import AdminPage from './ej3-rutas/AdminPage';
import PatientPage from './ej3-rutas/PatientPage';
import AppointmentsPage from './ej4-modificaciones/AppointmentsPage';

// Igual que en el TPI: el router se crea una sola vez, fuera de App.
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/ej0', element: <WarmUp /> },
  { path: '/ej1', element: <PatientForm /> },
  { path: '/ej2', element: <PatientsPage /> },

  // Ejercicio 3: login público y dos áreas privadas, cada una con su rol.
  { path: '/ej3/login', element: <LoginPage /> },
  {
    path: '/ej3/admin',
    element: (
      <ProtectedRoute allowedRoles={['ADMINISTRADOR']} redirectTo="/ej3/login">
        <AdminPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/ej3/patient',
    element: (
      <ProtectedRoute allowedRoles={['PACIENTE']} redirectTo="/ej3/login">
        <PatientPage />
      </ProtectedRoute>
    ),
  },

  // Ejercicio 4: modificaciones en vivo sobre código que ya funciona.
  { path: '/ej4', element: <AppointmentsPage /> },

  { path: '*', element: <Navigate to="/" replace /> },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
