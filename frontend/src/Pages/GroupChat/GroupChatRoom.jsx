import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "../../Helper/axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import GroupChat from "../../Components/Chat/GroupChat";
import styles from './GroupChatRoom.module.css'
const GroupChatRoom = (props) => {
  let history = useHistory();
  const cookies = new Cookies();
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [userId, setUserId] = useState("");
  const userIdRef = useRef();
  const socket = useRef(io(`http://${window.location.hostname}:5000`));
  const roomId = props.match.params.id
  const onStartFunction = () => {
    const role = cookies.get("assistr");
    let room;
    axios.get("api/users/userInfo").then(async (res) => {
      console.log(res);
      const senderInfo = res.data.user;
      const receiverInfo = "group";
      setUserId(senderInfo.id);
      userIdRef.current = senderInfo.id;
      setSenderName(senderInfo.fullname);
      if (receiverInfo) {
        setReceiverName("group");

        if (role === "consumer") {
          room = props.match.params.id;
        } else if (role === "professional") {
          room = props.match.params.id;
        }
        socket.current.emit("join-groupChat", room, (msgs) => {
          console.log(msgs.messages);
          setMessages(msgs.messages);
        });
      }
    });
  };

  useEffect(() => {
    onStartFunction();
  }, []);

  useEffect(() => {
    onStartFunction();
  }, [props.match.params.id]);

  useEffect(() => {
    socket.current.on("recieveGroup", (sentMessage) => {
      setMessages((prev) => [...prev, sentMessage]);
    });
  }, [socket.current]);

  const updateInputValue = (evt) => {
    setValue(evt.target.value);
  };

  const buttonClicked = () => {
    const room = props.match.params.id;
    const messageObject = {
      date: new Date().toLocaleString(),
      senderId: userId,
      message: value,
      room: room,
      senderName,
      receiverName,
    };
    if (value.trim() === "") {
    } else {

      socket.current.emit("sendGroup", messageObject);
      setValue("");
    }
  };

  return (
    <div className={styles.secondDiv}>
      <GroupChat
        senderName={senderName}
        type={"group"}
        name={props.match.params.id}
        messages={messages}
        value={value}
        buttonClicked={buttonClicked}
        updateInputValue={updateInputValue}
        userId={userId}
      />
    </div>
  )
}

export default GroupChatRoom
