import React from "react";
import "./Message.scss";

const Message = ({ messageText, messageType }) => {
  return (
    <div
      className={`message ${
        messageType === "error" ? "message-error" : "message-success"
      }`}
    >
      <h1>{messageText}</h1>
    </div>
  );
};

export default Message;
