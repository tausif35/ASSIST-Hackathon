import React, { useEffect, useRef } from 'react'
import styles from './chat.module.css'
import { TextField } from '@mui/material';
import send from './send.png'
function Chat(props) {
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        if(messagesEndRef.current!==null){
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }



    useEffect(scrollToBottom, [props.messages]);

    return (
        <div className={styles.chatUser}>
            <div className={styles.chatTopbar}>
                <h1>{props.name}</h1>
            </div>
            {
                props.name === "" ?
                    <div className={styles.errorDiv}>Select a thread or start a new conversation</div> :
                    <>
                        <div className={styles.inbox}>
                            {props.messages.map((message, index) => {
                                return <div className={styles.chatDiv} ><span className={props.userId === message.senderId ? styles.senderText : styles.receiverText}> {message.message}</span><br></br></div>
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
                            <button className={styles.sendButton} onClick={props.buttonClicked}><img className={styles.sendButtonLogo} src={send}></img></button>
                        </div>
                    </>
            }
        </div>
    )
}

export default Chat
