import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mockApi from './mockApi';

export default defineConfig({
  // mockApi: backend de práctica del ejercicio 4 (/api/appointments).
  plugins: [react(), mockApi()],
});
