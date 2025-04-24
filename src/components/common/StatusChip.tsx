import React from 'react';
import { TicketStatus } from '../../types';

type StatusChipProps = {
  status: TicketStatus;
};

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const getStatusStyles = (): string => {
    switch (status) {
      case 'todo':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'in-progress':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      case 'done':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getStatusLabel = (): string => {
    switch (status) {
      case 'todo':
        return 'To Do';
      case 'in-progress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return 'Unknown';
    }
  };

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyles()} transition-colors duration-200`}>
      {getStatusLabel()}
    </span>
  );
};

export default StatusChip;