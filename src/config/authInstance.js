// src/config/authInstance.js
import { getAuth } from 'firebase/auth';
import { app } from './firebaseConfig';

export function getAuthInstance() {
  return getAuth(app); // sin persistencia
}
