import React, { createContext, useContext, useEffect, useState } from "react";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    const response = await fetch("http://localhost:8005/messages");
    const resMessages = await response.json();
    setMessages(messages);
  };

  useEffect(() => {
    getMessages();
  }, []);

  const value = { messages };
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
}

export function useMessages() {
  return useContext(MessageContext);
}
