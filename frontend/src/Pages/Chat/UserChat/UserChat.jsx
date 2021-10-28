import React, { useEffect, useState, useRef } from "react";
import styles from "./UserChat.module.css";
import io from "socket.io-client";
import axios from "../../../Helper/axios";
import Cookies from "universal-cookie";
import Chat from "../../../Components/Chat/Chat";
import ChatList from "../../../Components/ChatList/ChatList";
import { useHistory } from "react-router-dom";
function UserChat(props) {
  let history = useHistory();
  const cookies = new Cookies();
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [chatList, setChatList] = useState([]);
  const [userId, setUserId] = useState("");
  const userIdRef = useRef();
  const socket = useRef(io(`http://${window.location.hostname}:5000`));

  const onStartFunction = () => {
    const id = props.match.params.id;
    const role = cookies.get("assistr");
    let room;
    axios.get(`api/users/chatInfo/${id}`).then(async (res) => {
      console.log(res);
      const senderInfo = res.data.senderInfo;
      const receiverInfo = res.data.receiverInfo;
      setUserId(senderInfo._id);
      userIdRef.current = senderInfo._id;
      setSenderName(senderInfo.fullname);
      if (receiverInfo) {
        setReceiverName(receiverInfo.fullname);

        if (role === "consumer") {
          room = receiverInfo._id + senderInfo._id;
        } else if (role === "professional") {
          room = senderInfo._id + receiverInfo._id;
        }
        socket.current.emit("join-room", room, (msgs) => {
          setMessages(msgs.messages);
        });
      }

      socket.current.emit("chatList", userIdRef.current, (chats) => {
        setChatList(chats);
      });
    });
  };

  useEffect(() => {
    onStartFunction();
  }, []);

  useEffect(() => {
    onStartFunction();
  }, [props.match.params.id]);

  useEffect(() => {
    socket.current.on("recieve", (obj) => {
      setMessages((prev) => [...prev, obj.sentMessage]);
    });
    socket.current.on("getChatList", (users) => {
      console.log(users);
      setChatList(users[userIdRef.current]);
    });
  }, [socket.current]);

  const updateInputValue = (evt) => {
    setValue(evt.target.value);
  };

  const convoDivHandler = (senderId, receiverId) => {
    const id = senderId === userId ? receiverId : senderId;
    history.push(`/chat/${id}`);
  };

  const buttonClicked = () => {
    const role = cookies.get("assistr");
    let room;
    const id = props.match.params.id;
    if (role === "consumer") {
      room = id + userId;
    } else if (role === "professional") {
      room = userId + id;
    }
    const messageObject = {
      date: new Date().toLocaleString(),
      receiverId: id,
      senderId: userId,
      message: value,
      room: room,
      senderName,
      receiverName,
    };
    if (value.trim() === "") {
    } else {
      socket.current.emit("send", messageObject);
      socket.current.emit("sendAll", messageObject);
      setValue("");
    }
  };

  return (
    <div className={styles.mainChatDiv}>
      <div className={styles.firstDiv}>
        <ChatList
          click={convoDivHandler}
          id={userIdRef}
          list={chatList}
          name={senderName}
        />
      </div>
      <div className={styles.secondDiv}>
        <Chat
          name={receiverName}
          messages={messages}
          value={value}
          buttonClicked={buttonClicked}
          updateInputValue={updateInputValue}
          userId={userId}
        />
      </div>
    </div>
  );
}

export default UserChat;
