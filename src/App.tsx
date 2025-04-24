import React, { useState } from "react";
import Layout from "./components/Layout";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import StatusFilter from "./components/StatusFilter";
import ThemeToggle from "./components/ThemeToggle";
import { TicketProvider, useTickets } from "./context/TicketContext";
import { PlusCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TicketStatus, Ticket } from "./types";

const TicketDashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    filteredTickets,
    tickets,
    addTicket,
    updateTicket,
    currentFilter,
    setFilter,
  } = useTickets();

  const handleSubmit = (ticketData: Omit<Ticket, "id" | "createdAt">) => {
    setIsSubmitting(true);
    setTimeout(() => {
      addTicket(ticketData);
      setIsSubmitting(false);
      setShowForm(false);
    }, 800);
  };

  const handleStatusChange = (id: number, status: TicketStatus) => {
    updateTicket(id, { status });
  };

  const counts = {
    all: tickets.length,
    todo: tickets.filter((t) => t.status === "todo").length,
    "in-progress": tickets.filter((t) => t.status === "in-progress").length,
    done: tickets.filter((t) => t.status === "done").length,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tickets
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and track your team's tasks
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <ThemeToggle />

          <motion.button
            onClick={() => setShowForm(!showForm)}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
              showForm
                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50"
                : "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700"
            } transition-colors`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {showForm ? (
              <>
                <XCircle size={16} className="mr-2" />
                Cancel
              </>
            ) : (
              <>
                <PlusCircle size={16} className="mr-2" />
                New Ticket
              </>
            )}
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Create New Ticket
            </h2>
            <TicketForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <StatusFilter
          currentFilter={currentFilter}
          onFilterChange={setFilter}
          counts={counts}
        />

        <TicketList
          tickets={filteredTickets}
          onStatusChange={handleStatusChange}
        />
      </div>
    </motion.div>
  );
};

function App() {
  return (
    <TicketProvider>
      <Layout>
        <TicketDashboard />
      </Layout>
    </TicketProvider>
  );
}

export default App;
