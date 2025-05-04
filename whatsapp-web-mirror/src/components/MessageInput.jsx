import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaceSmileIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import { MicrophoneIcon } from '@heroicons/react/24/solid';
import EmojiPicker from 'emoji-picker-react';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiClick = (emojiData) => {
    const cursorPosition = inputRef.current.selectionStart;
    const newMessage = 
      message.slice(0, cursorPosition) + 
      emojiData.emoji + 
      message.slice(cursorPosition);
    setMessage(newMessage);
    
    // Set cursor position after the inserted emoji
    setTimeout(() => {
      inputRef.current.selectionStart = cursorPosition + emojiData.emoji.length;
      inputRef.current.selectionEnd = cursorPosition + emojiData.emoji.length;
    }, 0);
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target) &&
          !event.target.closest('button')) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-whatsapp-header px-4 py-3">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-gray-600 hover:text-gray-800 bg-transparent p-0 shadow-none border-none flex items-center justify-center h-8 w-8"
            style={{ lineHeight: 0 }}
          >
            <FaceSmileIcon className="h-6 w-6" />
          </button>
          <span className="flex items-center justify-center h-8 w-8">
            <PaperClipIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
          </span>
        </div>
        <div className="relative flex-grow">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="w-full px-4 py-2 rounded-lg bg-white focus:outline-none text-gray-800 placeholder-gray-500 min-w-0"
          />
        </div>
        {message ? (
          <button
            type="submit"
            className="bg-whatsapp-primary text-white rounded-full p-2 hover:bg-green-600 flex-shrink-0 flex items-center justify-center h-8 w-8"
            style={{ lineHeight: 0 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
            </svg>
          </button>
        ) : (
          <span className="flex items-center justify-center h-8 w-8">
            <MicrophoneIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
          </span>
        )}
        {/* Emoji Picker absolutely positioned, floating above */}
        {showEmojiPicker && (
          <div
            ref={emojiPickerRef}
            className="absolute left-0 bottom-full mb-2 z-50"
            style={{ minWidth: 350 }}
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={350}
              height={400}
              searchDisabled
              skinTonesDisabled
              previewConfig={{ showPreview: false }}
            />
          </div>
        )}
      </form>
    </div>
  );
};

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default MessageInput; 