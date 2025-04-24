import React from 'react';
import { TicketStatus } from '../types';
import { motion } from 'framer-motion';

type StatusFilterProps = {
  currentFilter: TicketStatus | 'all';
  onFilterChange: (filter: TicketStatus | 'all') => void;
  counts: {
    all: number;
    todo: number;
    'in-progress': number;
    done: number;
  };
};

const StatusFilter: React.FC<StatusFilterProps> = ({ currentFilter, onFilterChange, counts }) => {
  const filters: Array<{ value: TicketStatus | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2"
    >
      {filters.map((filter) => (
        <motion.button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center
            ${
              currentFilter === filter.value
                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {filter.label}
          <motion.span 
            className={`ml-2 px-1.5 py-0.5 text-xs rounded-full 
              ${
                currentFilter === filter.value
                  ? 'bg-indigo-200 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-200'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }
            `}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            key={counts[filter.value]}
          >
            {counts[filter.value]}
          </motion.span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default StatusFilter;