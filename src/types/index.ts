export type TeamMember = {
  id: number;
  name: string;
  avatar: string;
  role: string;
  skills: string[];
};

export type TicketStatus = "todo" | "in-progress" | "done";

export type Ticket = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  assigneeId: number | null;
  status: TicketStatus;
  createdAt: string;
};
