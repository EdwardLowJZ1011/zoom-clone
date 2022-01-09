import React from "react";
import { connect } from "react-redux";

const dummyMessages = [
  {
    identity: "Martin",
    content: "Hello. Everything is okay ?",
  },
  {
    identity: "Martin",
    content: "Do you need my help ?",
  },
  {
    content: "Everything is okay",
    messageCreatedByMe: true,
    identity: "me",
  },
  {
    content: "No help needed",
    messageCreatedByMe: true,
    identity: "me",
  },
  {
    identity: "Jessica",
    content: "Hello nice to meet you",
  },
  {
    identity: "Jessica",
    content: "No worries",
  },
];

const CreateMessage = ({ author, content, sameAuthor, messageCreatedByMe }) => {
  const alignClass = messageCreatedByMe
    ? "message_align_right"
    : "message_align_left";
  const authorText = messageCreatedByMe ? "You" : author;

  const contentAdditionStyles = messageCreatedByMe
    ? "message_right_styles"
    : "message_left_styles";

  return (
    <div className={`message_container ${alignClass}`}>
      {!sameAuthor && <p className="message_title">{authorText}</p>}
      <p className={`message_content ${contentAdditionStyles}`}>{content}</p>
    </div>
  );
};

function Message({messages}) {
  return (
    <div className="messages_container">
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 && message.identity === messages[index - 1].identity;
        return (
          <CreateMessage
            key={index}
            author={message.identity}
            content={message.content}
            sameAuthor={sameAuthor}
            messageCreatedByMe={message.messageCreatedByMe}
          />
        );
      })}
    </div>
  );
}

const mapStoreStateToProps = (state)=>{
  return {
    ...state
  }
}

export default connect(mapStoreStateToProps)(Message);