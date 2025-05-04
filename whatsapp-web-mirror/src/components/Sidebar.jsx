const Sidebar = ({ messages, isOnline }) => {
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
  return (
    <div className="w-[30%] min-w-[300px] bg-white border-r border-gray-300">
      {/* Header */}
      <div className="h-16 bg-whatsapp-header flex items-center px-4 justify-between">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-0 m-0 bg-transparent border-none outline-none flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors group" title="Adicionar chat">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-600 group-hover:text-gray-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          <button className="p-0 m-0 bg-transparent border-none outline-none flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors group" title="Mais opções">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-600 group-hover:text-gray-800">
              <circle cx="5" cy="12" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="19" cy="12" r="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2 bg-white">
        <div className="bg-whatsapp-light-bg rounded-lg flex items-center px-4 py-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search or start new chat"
            className="ml-2 bg-transparent w-full focus:outline-none text-sm text-gray-700 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="overflow-y-auto">
        <div className="px-3 py-3 flex items-center bg-whatsapp-light-bg cursor-pointer hover:bg-gray-100">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium text-gray-800">John Doe</h3>
              <span className="text-xs text-gray-500">
                {lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
              </span>
            </div>
            <p className="text-sm text-gray-600 truncate max-w-full overflow-hidden">{lastMessage ? lastMessage.message : ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 