import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const ChatHeader = ({ isOnline }) => {
  return (
    <div className="bg-whatsapp-header h-16 px-4 flex items-center justify-between border-l border-gray-300">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
        <div>
          <h2 className="font-medium text-gray-800">John Doe</h2>
          <p className="text-xs text-gray-600">{isOnline ? 'online' : 'offline'}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 cursor-pointer" />
        <EllipsisVerticalIcon className="h-5 w-5 text-gray-600 cursor-pointer" />
      </div>
    </div>
  );
};

ChatHeader.propTypes = {
  isOnline: PropTypes.bool.isRequired,
};

export default ChatHeader; 