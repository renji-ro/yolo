import { Ticket } from "../types";

export const dataProvider = {
  getTickets: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BACKEND_URL}/ticket`
    );
    const data = await response.json();
    return data;
  },
  addTicket: async (ticket: Omit<Ticket, "id" | "createdAt">) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BACKEND_URL}/ticket`,
      {
        method: "POST",
        body: JSON.stringify(ticket),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "test",
        },
      }
    );
    const data = await response.json();
    return data;
  },
  updateTicket: async (id: number, ticket: Partial<Ticket>) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BACKEND_URL}/ticket/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(ticket),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "test",
        },
      }
    );
    const data = await response.json();
    return data;
  },
  deleteTicket: async (id: number) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BACKEND_URL}/ticket/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "test",
        },
      }
    );
    const data = await response.json();
    return data;
  },
  getTeamMembers: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BACKEND_URL}/team-members`
    );
    const data = await response.json();
    return data;
  },
};
