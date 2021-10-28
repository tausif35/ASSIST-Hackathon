import React, { useEffect, useState, useRef } from 'react'
import styles from './UserChat.module.css'
import io from 'socket.io-client';
import axios from '../../../Helper/axios'
import Cookies from 'universal-cookie';
import Chat from '../../../Components/Chat/Chat'
import ChatList from '../../../Components/ChatList/ChatList';
import { useHistory } from "react-router-dom"
function UserChat(props) {
    let history=useHistory()
    const id=1;
    const cookies = new Cookies();
    const [value, setValue] = useState("");
    const [messages, setMessages] = useState([])
    const [senderName, setSenderName] = useState("Tausif")
    const [receiverName, setReceiverName] = useState("Dr Mohit Kamal")
    const [chatList, setChatList] = useState([])
    const [userId, setUserId] = useState("2")
    const userIdRef=useRef()
    

    useEffect(()=>{
        const arr=[
            { receiverId: "2", senderId: "1", message: "hello", room: "12", senderName, receiverName },
            { receiverId: "1", senderId: "2", message: "hi", room: "12", senderName, receiverName },
            { receiverId: "2", senderId: "1", message: "How are you doing today?", room: "12", senderName, receiverName },
            { receiverId: "1", senderId: "2", message: "i am fine. Wbu?", room: "12", senderName, receiverName },
            { receiverId: "2", senderId: "1", message: "I am fine too.How is your mental health?", room: "12", senderName, receiverName },
            { receiverId: "1", senderId: "2", message: "its getting worse. i need to set an appointment", room: "12", senderName, receiverName },
            { receiverId: "2", senderId: "1", message: "well go set an appointment with me. i will take care of it", room: "12", senderName, receiverName },
            { receiverId: "1", senderId: "2", message: "thanks doctor", room: "12", senderName, receiverName },
        ]
        setMessages(arr)
        setChatList([{ receiverId: "2", senderId: "1", message: "thanks doctor", room: "12", senderName, receiverName }])
    },[])

    const updateInputValue = (evt) => {
        setValue(evt.target.value)
    }


    const convoDivHandler = (senderId,receiverId)=>{
        const id=senderId===userId? receiverId:senderId;
        history.push(`/chat/${1}`)
    }

    const buttonClicked = () => {
        const role = cookies.get("assistr");
        let room;
        const id = props.match.params.id
        if (role === "consumer") {
            room = id + userId;
        } else if (role === "professional") {
            room = userId + id
        }
        const messageObject = { receiverId: id, senderId: userId, message: value, room: room, senderName, receiverName }
        if (value.trim() === "") {
        } else {
            setMessages(prev=>[...prev,messageObject])
            setValue("")
        }

    }

    return (
        <div className={styles.mainChatDiv}>
            <div className={styles.firstDiv}>
                <ChatList click={convoDivHandler} id={userIdRef} list={chatList} name={senderName}/>
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
    )
}

export default UserChat

