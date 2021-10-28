import React, { useEffect, useState, useRef } from "react";
import styles from "./chat.module.css";
import { TextField } from "@mui/material";
import send from "./send.png";
function Chat(props) {
  console.log(props.messages.length);
  const [timeShow, setTimeShow] = useState([]);
  useEffect(() => {
    for (let i = 0; i < props.messages.length; i++) {
      setTimeShow((prev) => [...prev, false]);
    }
  }, []);
  const dateRef = useRef();
  const messagesEndRef = useRef(null);
  const [hover, setHover] = useState(false);
  const onHover = (index) => {
    let times = timeShow;
    times[index] = true;
    setHover(true);
    setTimeShow([...times]);
    console.log(index);
  };

  const onLeave = (index) => {
    setHover(false);
    let times = timeShow;
    times[index] = false;
    setHover(true);
    setTimeShow([...times]);
    console.log(index);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [props.messages]);

  return (
    <div className={styles.chatUser}>
      <div className={styles.chatTopbar}>
        <h1>{props.name}</h1>
      </div>
      {props.name === "" ? (
        <div className={styles.errorDiv}>
          Select a thread or start a new conversation
        </div>
      ) : (
        <>
          <div className={styles.inbox}>
            {props.messages.map((message, index) => {
              return (
                <div className={styles.chatDiv}>
                  <span
                    onMouseEnter={() => onHover(index)}
                    onMouseLeave={() => onLeave(index)}
                    className={
                      props.userId === message.senderId
                        ? styles.senderText
                        : styles.receiverText
                    }
                  >
                    {" "}
                    {message.message}
                  </span>
                  <br></br>
                  {timeShow[index] ? (
                    <span
                      className={styles.timeShow}
                      style={
                        props.userId === message.senderId
                          ? { float: "right" }
                          : { float: "left" }
                      }
                      ref={dateRef}
                    >
                      {message.date}
                    </span>
                  ) : null}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.chatSend}>
            <TextField
              id="outlined-multiline-flexible"
              label="Text"
              className={styles.sendInput}
              multiline
              rows={2}
              value={props.value}
              onChange={props.updateInputValue}
            />
            {/* <input  value={} onChange={}/> */}
            <button className={styles.sendButton} onClick={props.buttonClicked}>
              <img className={styles.sendButtonLogo} src={send}></img>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
