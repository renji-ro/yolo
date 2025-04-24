import React from 'react';
import { Ticket, TicketStatus } from '../types';
import TicketCard from './TicketCard';
import { motion, AnimatePresence } from 'framer-motion';

type TicketListProps = {
  tickets: Ticket[];
  onStatusChange: (id: number, status: TicketStatus) => void;
};

const TicketList: React.FC<TicketListProps> = ({ tickets, onStatusChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <AnimatePresence mode="popLayout">
        {tickets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="col-span-full flex items-center justify-center h-40 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700"
          >
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No tickets found. Create a new ticket to get started.
            </p>
          </motion.div>
        ) : (
          tickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <TicketCard 
                ticket={ticket} 
                onStatusChange={onStatusChange}
              />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default TicketList;