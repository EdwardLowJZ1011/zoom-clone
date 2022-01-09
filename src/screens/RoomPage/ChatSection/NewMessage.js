import React, { useState } from "react";
import SendMessageButton from '../../../assets/images/sendMessages.svg';
import { sendMessageUsingDataChannel } from "../../../utils/twilioUtils";

export default function NewMessage() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    sendMessageUsingDataChannel(message, true)
    setMessage("");
  };

  const handleKeyPressed = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };
  return (
    <div className="new_message_container">
      <input
        className="new_message_input"
        value={message}
        onChange={handleTextChange}
        placeholder="Type your message...."
        type="text"
        onKeyDown={handleKeyPressed}
      />
      <img className="new_message_button"
      src={SendMessageButton}
      onClick={sendMessage}
      width={20}
      height={20}
      />
    </div>
  );
}
