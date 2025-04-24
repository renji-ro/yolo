import React from 'react';
import { TeamMember } from '../../types';

type MemberAvatarProps = {
  member: TeamMember;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
};

const MemberAvatar: React.FC<MemberAvatarProps> = ({ 
  member, 
  size = 'md',
  showDetails = false
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-12 h-12';
      case 'md':
      default:
        return 'w-10 h-10';
    }
  };

  return (
    <div className={`flex items-center gap-3`}>
      <div className={`${getSizeClasses()} rounded-full overflow-hidden relative border-2 border-white dark:border-gray-800 shadow-sm`}>
        <img 
          src={member.avatar} 
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {showDetails && (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 dark:text-gray-100">{member.name}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{member.role}</span>
        </div>
      )}
    </div>
  );
};

export default MemberAvatar;