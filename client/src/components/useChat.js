
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "chat message"; // Name of the event

const useChat = () => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  const getDomain = () => {
    const domain = window.location.hostname;
    if (domain === "localhost") {
     return "http://localhost:5017"
    } else {
     return "https://" + window.location.hostname;
    }
 }
   const initMsg = {
    pic: "https://media.giphy.com/media/229Ozo6sMl3K69NgwE/giphy-downsized.gif",
    who: "noOne",
    type: "received"
  }


  useEffect(() => {
    
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(getDomain());
    

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
    //   const incomingMessage = {
    //     ...message,
    //     ownedByCurrentUser: message.senderId === socketRef.current.id,
    //   };
      setMessages((messages) => [...messages, message]);
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, messageBody);
  };

  return { messages, sendMessage };
};

export default useChat;