import { useEffect, useState, useRef } from 'react';
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import { fetchMessages, sendMessage, checkServerHealth } from './services/messageService'
import { v4 as uuidv4 } from 'uuid'
import { MESSAGE_POLL_INTERVAL_IN_MILLISECONDS, HEALTHCHECK_INTERVAL_IN_MILLISECONDS } from './config';

function App() {
  // Generate or load a persistent user_id
  const [user_id] = useState(() => {
    let id = localStorage.getItem('user_id');
    if (!id) {
      id = uuidv4();
      localStorage.setItem('user_id', id);
    }
    return id;
  });

  const [messages, setMessages] = useState([]);
  const [pendingMessages, setPendingMessages] = useState(() => {
    // Load pending from localStorage if available
    const stored = localStorage.getItem('pendingMessages');
    return stored ? JSON.parse(stored) : [];
  });
  const [isOnline, setIsOnline] = useState(true);
  const pollingRef = useRef();
  const healthRef = useRef();
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const prevMessagesLength = useRef(messages.length);
  const [initialLoad, setInitialLoad] = useState(true);

  // Save pending messages to localStorage
  useEffect(() => {
    localStorage.setItem('pendingMessages', JSON.stringify(pendingMessages));
  }, [pendingMessages]);

  // Poll server health
  useEffect(() => {
    async function pollHealth() {
      const online = await checkServerHealth();
      setIsOnline(online);
    }
    pollHealth();
    healthRef.current = setInterval(pollHealth, HEALTHCHECK_INTERVAL_IN_MILLISECONDS);
    return () => clearInterval(healthRef.current);
  }, []);

  // Poll messages from server
  useEffect(() => {
    async function pollMessages() {
      if (isOnline) {
        try {
          const serverMessages = await fetchMessages();
          setMessages(serverMessages);
          if (initialLoad) {
            setShouldScrollToBottom(true);
            setInitialLoad(false);
          }
        } catch {
          // Silently ignore fetch errors
        }
      }
    }
    pollMessages();
    pollingRef.current = setInterval(pollMessages, MESSAGE_POLL_INTERVAL_IN_MILLISECONDS);
    return () => clearInterval(pollingRef.current);
  }, [isOnline, initialLoad]);

  // Retry pending messages when online
  useEffect(() => {
    if (isOnline && pendingMessages.length > 0) {
      (async () => {
        const stillPending = [];
        for (const msg of pendingMessages) {
          try {
            await sendMessage({ user_id, message: msg.message, timestamp: msg.timestamp });
          } catch {
            stillPending.push(msg);
          }
        }
        setPendingMessages(stillPending);
        // Refresh messages from server after retry
        if (stillPending.length !== pendingMessages.length) {
          try {
            const serverMessages = await fetchMessages();
            setMessages(serverMessages);
          } catch {}
        }
      })();
    }
  }, [isOnline, pendingMessages, user_id]);

  // Detecta chegada de nova mensagem de outro usuário
  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg && lastMsg.user_id !== user_id) {
        setShouldScrollToBottom(true);
      }
    }
    prevMessagesLength.current = messages.length;
  }, [messages, user_id]);

  // Send message handler
  const handleSendMessage = async (text) => {
    const newMsg = {
      localId: uuidv4(),
      user_id,
      message: text,
      timestamp: new Date().toISOString(),
      pending: !isOnline,
    };
    setMessages((prev) => [...prev, newMsg]);
    setShouldScrollToBottom(true);
    if (isOnline) {
      try {
        await sendMessage({ user_id, message: newMsg.message, timestamp: newMsg.timestamp });
        const serverMessages = await fetchMessages();
        setMessages(serverMessages);
      } catch {
        setPendingMessages((prev) => [...prev, newMsg]);
      }
    } else {
      setPendingMessages((prev) => [...prev, newMsg]);
    }
  };

  // Merge and sort messages by timestamp (oldest to newest)
  const allMessages = [...messages, ...pendingMessages.filter(pm => !messages.some(m => m.localId === pm.localId))]
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <div className="flex h-screen bg-whatsapp-light-bg">
      <Sidebar messages={allMessages} isOnline={isOnline} />
      <div className="flex-1">
        <ChatWindow
          messages={allMessages}
          onSendMessage={handleSendMessage}
          isOnline={isOnline}
          user_id={user_id}
          shouldScrollToBottom={shouldScrollToBottom}
          onScrolled={() => setShouldScrollToBottom(false)}
        />
      </div>
    </div>
  )
}

export default App
