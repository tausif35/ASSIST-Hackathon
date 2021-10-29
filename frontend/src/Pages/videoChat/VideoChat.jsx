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
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: video,
      audio: mute,
    }).then(stream => {
      myVideo.current.srcObject = stream // Display our video to ourselves
      stream.getAudioTracks()[0].enabled = mute;
      myPeer.on('call', call => { // When we join someone's room we will receive a call from them
        call.answer(stream) // Stream them our video/audio
        call.on('stream', userVideoStream => { // When we recieve their stream
          addVideoStream(userVideoStream) // Display their video to ourselves
        })
      })

      socket.on('user-connected', userId => { // If a new user connect
        connectToNewUser(userId, stream)
      })
    })

    myPeer.on('open', id => { // When we first open the app, have us join a room
      socket.emit('join-vid-room', roomId, id)
    })
    
  }, [])

  function connectToNewUser(userId, stream) { // This runs when someone joins our room
    const call = myPeer.call(userId, stream) // Call the user who just joined
    // Add their video
    call.on('stream', userVideoStream => {
      setUserConnected(true)
      userVideo.current.srcObject = userVideoStream
    })
    call.on('close', () => {
      userVideo.current.removeChild(userVideo.current.children[0])
  })
  }
  
  function addVideoStream(stream) {
    userVideo.current.srcObject = stream
    
  }

  useEffect(()=>{
    socket.emit(mute)
    navigator.mediaDevices.getUserMedia({
      video: video,
      audio: mute,
    }).then(stream => {
      myVideo.current.srcObject = stream // Display our video to ourselves
      myPeer.on('call', call => { // When we join someone's room we will receive a call from them
        call.answer(stream) // Stream them our video/audio
        call.on('stream', userVideoStream => { // When we recieve their stream
          addVideoStream(userVideoStream) // Display their video to ourselves
        })
      })

      socket.on('user-connected', userId => { // If a new user connect
        connectToNewUser(userId, stream)
      })
    })

    myPeer.on('open', id => { // When we first open the app, have us join a room
      socket.emit('join-vid-room', roomId, id)
    })
  },[mute,video])

  

  return (
    <>
      <Topbar list={[]}/>
      <div className={styles.videoChatDiv}>
        <video className={styles.userVideo} muted ref={userVideo} autoPlay />
        <video className={styles.userVideo} muted ref={myVideo} autoPlay />
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