import PropTypes from 'prop-types';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { useEffect, useRef } from 'react';

// Helper para formatar timestamp em horário local
function formatLocalTime(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  if (isNaN(date)) return '';
  // Exibe no formato local do usuário, ex: 14:30 ou 02:30 PM
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const ChatWindow = ({ messages, onSendMessage, isOnline, user_id, shouldScrollToBottom, onScrolled }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (shouldScrollToBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      if (onScrolled) onScrolled();
    }
    // Não faz scroll em updates normais
  }, [messages, shouldScrollToBottom, onScrolled]);

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader isOnline={isOnline} />
      <div className="flex-1 overflow-y-auto p-4 bg-whatsapp-chat-bg">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.localId}
            message={msg.message}
            isOutgoing={msg.user_id === user_id}
            timestamp={formatLocalTime(msg.timestamp)}
            pending={msg.pending}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

ChatWindow.propTypes = {
  messages: PropTypes.array.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  isOnline: PropTypes.bool.isRequired,
  user_id: PropTypes.string.isRequired,
  shouldScrollToBottom: PropTypes.bool,
  onScrolled: PropTypes.func,
};

export default ChatWindow; 