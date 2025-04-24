import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { TeamMember, Ticket, TicketStatus } from "../types";
import { dataProvider } from "../api/dataProvider";

type TicketContextType = {
  tickets: Ticket[];
  members: TeamMember[];
  filteredTickets: Ticket[];
  currentFilter: TicketStatus | "all";
  addTicket: (ticket: Omit<Ticket, "id" | "createdAt">) => void;
  updateTicket: (id: number, updates: Partial<Ticket>) => void;
  deleteTicket: (id: number) => void;
  setFilter: Dispatch<SetStateAction<TicketStatus | "all">>;
};

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [currentFilter, setCurrentFilter] = useState<TicketStatus | "all">(
    "all"
  );
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await dataProvider.getTickets();
        setTickets(response);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    const fetchTeamMembers = async () => {
      try {
        const response = await dataProvider.getTeamMembers();
        setMembers(response);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchTickets();
    fetchTeamMembers();
  }, [setTickets, setMembers]);

  useEffect(() => {
    if (currentFilter === "all") {
      setFilteredTickets(tickets);
    } else {
      setFilteredTickets(
        tickets.filter((ticket) => ticket.status === currentFilter)
      );
    }
  }, [tickets, currentFilter]);

  const addTicket = async (ticketData: Omit<Ticket, "id" | "createdAt">) => {
    const newTicket = {
      ...ticketData,
      assigneeId: ticketData.assigneeId || null,
      createdAt: new Date().toISOString(),
    };
    try {
      const response = await dataProvider.addTicket(newTicket);
      setTickets((prev) => [...prev, response]);
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

  const updateTicket = async (id: number, updates: Partial<Ticket>) => {
    const updatedTicket = {
      ...updates,
      assigneeId: updates.assigneeId || null,
    };
    try {
      const response = await dataProvider.updateTicket(id, updatedTicket);
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === id ? { ...ticket, ...response } : ticket
        )
      );
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const deleteTicket = async (id: number) => {
    try {
      await dataProvider.deleteTicket(id);
      setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        members,
        filteredTickets,
        currentFilter,
        addTicket,
        updateTicket,
        deleteTicket,
        setFilter: setCurrentFilter,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return context;
};
