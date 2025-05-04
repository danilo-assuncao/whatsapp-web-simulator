import axios from 'axios';
import { API_URL } from '../config';

export async function fetchMessages() {
  const { data } = await axios.get(`${API_URL}/messages`);
  return data;
}

export async function sendMessage(message) {
  return axios.post(`${API_URL}/messages`, message);
}

export async function checkServerHealth() {
  try {
    await axios.get(`${API_URL}/health`);
    return true;
  } catch {
    return false;
  }
} 