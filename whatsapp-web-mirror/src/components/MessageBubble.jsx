import PropTypes from 'prop-types';

const MessageBubble = ({ message, isOutgoing, timestamp, pending }) => (
  <div className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`relative px-3 py-2 rounded-lg max-w-[65%] min-w-[60px] message-bubble
      ${isOutgoing ? 'bg-whatsapp-outgoing message-outgoing' : 'bg-whatsapp-incoming message-incoming'}
      ${pending ? 'opacity-60 border-2 border-dashed border-yellow-400' : ''}
    `}>
      <div className="break-all whitespace-pre-wrap overflow-hidden flex items-center">
        <p className="text-sm text-gray-800 mr-2">{message}</p>
        {pending && (
          <span title="Pendente" className="text-yellow-500 animate-pulse ml-1">
            ⏳
          </span>
        )}
      </div>
      <span className="text-[11px] text-gray-500 float-right ml-2 mt-1">
        {timestamp}
      </span>
    </div>
  </div>
);

MessageBubble.propTypes = {
  message: PropTypes.string.isRequired,
  isOutgoing: PropTypes.bool.isRequired,
  timestamp: PropTypes.string.isRequired,
  pending: PropTypes.bool,
};

export default MessageBubble; 