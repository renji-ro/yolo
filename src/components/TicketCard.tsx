import React from "react";
import { Ticket } from "../types";
import StatusChip from "./common/StatusChip";
import MemberAvatar from "./common/MemberAvatar";
import { Clock, Calendar } from "lucide-react";
import { useTickets } from "../context/TicketContext";

type TicketCardProps = {
  ticket: Ticket;
  onStatusChange: (id: number, status: Ticket["status"]) => void;
  className?: string;
};

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onStatusChange,
  className = "",
}) => {
  const { members } = useTickets();
  const assignedMember = members.find((member) => member.id === ticket.assigneeId); 

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md ${className}`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-medium text-gray-900 dark:text-white text-lg">
            {ticket.title}
          </h3>
          <StatusChip status={ticket.status} />
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {ticket.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-xs">
            <Calendar size={14} />
            <span>Due: {formatDate(ticket.deadline)}</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-xs">
            <Clock size={14} />
            <span>Created: {formatDate(ticket.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-850">
        <div className="flex justify-between items-center">
          {assignedMember ? (
            <MemberAvatar member={assignedMember} showDetails={true} />
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Unassigned
            </span>
          )}

          <select
            value={ticket.status}
            onChange={(e) =>
              onStatusChange(ticket.id, e.target.value as Ticket["status"])
            }
            className="text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
