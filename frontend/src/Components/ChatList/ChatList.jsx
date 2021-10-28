import React from "react";
import styles from "./ChatList.module.css";
const ChatList = (props) => {
  console.log(props);
  if (typeof props.list !== "undefined") {
  } else {
    setTimeout(() => {}, 250);
  }

  const showMessage = (message, limit) => {
    var dots = "...";
    if (message.length > limit) {
      message = message.substring(0, limit) + dots;
    }

    return message;
  };

  return (
    <div className={styles.chatListDiv}>
      <div className={styles.chatTopbar}>
        <h1>Messages</h1>
      </div>
      <div>
        {props.list
          ? props.list.map((message, index) => {
              return (
                <div
                  onClick={() => {
                    props.click(message.senderId, message.receiverId);
                  }}
                  className={styles.singleChat}
                >
                  <div className={styles.nameOfUser}>
                    {props.name === message.senderName
                      ? message.receiverName
                      : message.senderName}
                  </div>
                  <div>
                    {message.senderName === props.name ? "You: " : ""}
                    <span className={styles.convoMessage}>
                      {showMessage(message.message, 30)}
                    </span>
                    <div>{message.date}</div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ChatList;
