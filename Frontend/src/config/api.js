const API_URL = import.meta.env.VITE_API_URL;

export const endpoints = {
  events: `${API_URL}/api/events`,
  tickets: `${API_URL}/api/tickets`,
  ticketTypes: `${API_URL}/api/tickettypes`,
  payments: `${API_URL}/api/payments`
};