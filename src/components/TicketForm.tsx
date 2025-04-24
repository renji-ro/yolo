import React, { useState, useEffect } from "react";
import { Ticket, TeamMember, TicketStatus } from "../types";
import MemberDropdown from "./MemberDropdown";
import { AlertCircle } from "lucide-react";
import { useTickets } from "../context/TicketContext";
type TicketFormProps = {
  onSubmit: (ticket: Omit<Ticket, "id" | "createdAt">) => void;
  initialValues?: Partial<Ticket>;
  submitButtonText?: string;
  isSubmitting?: boolean;
};

type FormErrors = {
  title?: string;
  description?: string;
  deadline?: string;
};

const TicketForm: React.FC<TicketFormProps> = ({
  onSubmit,
  initialValues = {},
  submitButtonText = "Create Ticket",
  isSubmitting = false,
}) => {
  const [title, setTitle] = useState(initialValues.title || "");
  const [description, setDescription] = useState(
    initialValues.description || ""
  );
  const [deadline, setDeadline] = useState(initialValues.deadline || "");
  const [assigneeId, setAssigneeId] = useState<number | null>(
    initialValues.assigneeId || null
  );
  const [status, setStatus] = useState<TicketStatus>(
    initialValues.status || "todo"
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const { members } = useTickets();
  const [touched, setTouched] = useState({
    title: false,
    description: false,
    deadline: false,
  });

  // Validate form on field changes
  useEffect(() => {
    const newErrors: FormErrors = {};

    if (touched.title && !title.trim()) {
      newErrors.title = "Title is required";
    }

    if (touched.description && !description.trim()) {
      newErrors.description = "Description is required";
    }

    if (touched.deadline) {
      if (!deadline) {
        newErrors.deadline = "Deadline is required";
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(deadline);
        if (selectedDate < today) {
          newErrors.deadline = "Deadline cannot be in the past";
        }
      }
    }

    setErrors(newErrors);
  }, [title, description, deadline, touched]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to show validation errors
    setTouched({
      title: true,
      description: true,
      deadline: true,
    });

    // Check if there are any errors
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!deadline) {
      newErrors.deadline = "Deadline is required";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(deadline);
      if (selectedDate < today) {
        newErrors.deadline = "Deadline cannot be in the past";
      }
    }

    setErrors(newErrors);

    // Submit form if there are no errors
    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        title,
        description,
        deadline,
        assigneeId: assigneeId || null,
        status,
      });

      // Reset form after submission
      if (!initialValues.id) {
        setTitle("");
        setDescription("");
        setDeadline("");
        setAssigneeId(null);
        setStatus("todo");
        setTouched({
          title: false,
          description: false,
          deadline: false,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="relative">
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTouched({ ...touched, title: true })}
            className={`w-full px-3 py-2 border ${
              errors.title
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-700"
            } rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 peer`}
            placeholder="Title"
          />
          <label
            htmlFor="title"
            className={`absolute left-3 -top-2.5 text-sm transition-all 
              peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:dark:text-gray-400 peer-placeholder-shown:top-2
              peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400
              ${
                errors.title
                  ? "text-red-500 dark:text-red-400"
                  : "text-gray-500 dark:text-gray-400"
              }
              ${
                title
                  ? "-top-2.5 text-sm text-indigo-600 dark:text-indigo-400"
                  : ""
              }`}
          >
            Title
          </label>
        </div>
        {errors.title && touched.title && (
          <p className="mt-1 text-xs text-red-500 dark:text-red-400 flex items-center">
            <AlertCircle size={12} className="mr-1" />
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => setTouched({ ...touched, description: true })}
            rows={3}
            className={`w-full px-3 py-2 border ${
              errors.description
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-700"
            } rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 peer resize-none`}
            placeholder="Description"
          />
          <label
            htmlFor="description"
            className={`absolute left-3 -top-2.5 text-sm transition-all 
              peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:dark:text-gray-400 peer-placeholder-shown:top-2
              peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400
              ${
                errors.description
                  ? "text-red-500 dark:text-red-400"
                  : "text-gray-500 dark:text-gray-400"
              }
              ${
                description
                  ? "-top-2.5 text-sm text-indigo-600 dark:text-indigo-400"
                  : ""
              }`}
          >
            Description
          </label>
        </div>
        {errors.description && touched.description && (
          <p className="mt-1 text-xs text-red-500 dark:text-red-400 flex items-center">
            <AlertCircle size={12} className="mr-1" />
            {errors.description}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            onBlur={() => setTouched({ ...touched, deadline: true })}
            className={`w-full px-3 py-2 border ${
              errors.deadline
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-700"
            } rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400`}
          />
          <label
            htmlFor="deadline"
            className={`block text-sm font-medium mb-1 ${
              errors.deadline
                ? "text-red-500 dark:text-red-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Deadline
          </label>
        </div>
        {errors.deadline && touched.deadline && (
          <p className="mt-1 text-xs text-red-500 dark:text-red-400 flex items-center">
            <AlertCircle size={12} className="mr-1" />
            {errors.deadline}
          </p>
        )}
      </div>

      <div>
        <MemberDropdown
          selectedMember={assigneeId}
          onChange={setAssigneeId}
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TicketStatus)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors
            ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
          `}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            submitButtonText
          )}
        </button>
      </div>
    </form>
  );
};

export default TicketForm;
