import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import MemberAvatar from './common/MemberAvatar';
import { ChevronDown, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTickets } from '../context/TicketContext';

type MemberDropdownProps = {
  selectedMember: number | null;
  onChange: Dispatch<SetStateAction<number | null>>;
  label?: string;
};

const MemberDropdown: React.FC<MemberDropdownProps> = ({
  selectedMember: selectedMemberId,
  onChange,
  label = 'Assign to'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { members } = useTickets();
  const selectedMember = members.find(member => member.id === selectedMemberId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2 border ${
          isOpen ? 'border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-900' : 'border-gray-300 dark:border-gray-700'
        } rounded-md bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-150`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center">
          {selectedMember ? (
            <>
              <MemberAvatar member={selectedMember} size="sm" />
              <span className="ml-2">{selectedMember.name}</span>
            </>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">Select team member</span>
          )}
        </div>
        
        <div className="flex items-center">
          {selectedMember && (
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="p-1 mr-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={14} />
            </motion.button>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} className="text-gray-400" />
          </motion.div>
        </div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 py-1 max-h-60 overflow-auto"
          >
            {members.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">No team members available</div>
            ) : (
              members.map((member) => (
                <motion.div
                  key={member.id}
                  onClick={() => {
                    onChange(member.id);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer ${
                    selectedMember?.id === member.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                  }`}
                  whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-center">
                    <MemberAvatar member={member} size="sm" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{member.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill, index) => (
                      <motion.span 
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                  
                  {selectedMember?.id === member.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Check size={16} className="text-indigo-600 dark:text-indigo-400 ml-2" />
                    </motion.div>
                  )}
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemberDropdown;