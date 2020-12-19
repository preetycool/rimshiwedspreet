import React from "react";
import "./Message.scss";

const Message = ({ messageText, messageType }) => {
  const image = messageType === "success" ? "check.png" : "close.png";
  return (
    <div
      className={`message ${
        messageType === "error" ? "message-error" : "message-success"
      }`}
    >
      <img src={require(`../../Images/${image}`)} alt="" />
      <h1>{messageText}</h1>
    </div>
  );
};

export default Message;
