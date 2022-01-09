import React from "react";
import ChatLabel from "./ChatLabel";
import Message from "./Message";
import NewMessage from "./NewMessage";

const ChatSection = () => {
  return <div className="chat_section_container">
    <ChatLabel />
    <Message />
    <NewMessage />
  </div>;
};

export default ChatSection;
