import React, { useEffect, useRef, useState } from "react"
import Peer from 'peerjs';
import styles from './videoChat.module.css'
import io from 'socket.io-client'
import Cookies from 'universal-cookie';
import Topbar from "../../Components/topbar/Topbar";
import Button from '@mui/material/Button';
import MicOffIcon from '@mui/icons-material/MicOff';
import ToggleButton from '@mui/material/ToggleButton';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';


const socket = io.connect('http://localhost:5000')
function VideoChat(props) {
  const roomId = props.match.params.id
  const myVideo = useRef()
  const [mute, setMute] = useState(true)
  const [video, setVideo] = useState(true);
  const userVideo = useRef()
  const [userConnected, setUserConnected] = useState(false)
  const connectionRef = useRef()

  const myPeer = new Peer()

  

  return (
    <>
      <Topbar list={[]}/>
      <div className={styles.videoChatDiv}>
        <img src="https://i.kym-cdn.com/photos/images/newsfeed/001/907/805/1a6.jpg" className={styles.userVideo} muted ref={userVideo} autoPlay />
        <img src="https://i.imgur.com/6NIguJG.png" className={styles.MyVideo} muted ref={myVideo} autoPlay />
      </div>

      <div className={styles.vidChatButtons}>
        <ToggleButton
          value="MicOff"
          onChange={() => {
            setMute(mute => !mute);
          }}
        >
          {mute ? <MicOffIcon /> : <MicIcon />}
        </ToggleButton>

        <ToggleButton
          value="VideoOff"
          onChange={() => {

            setVideo(video => !video);
          }}
        >
          {video ? <VideocamOffIcon /> : <VideocamIcon />}
        </ToggleButton>
      </div>
    </>
  )
}

export default VideoChat
