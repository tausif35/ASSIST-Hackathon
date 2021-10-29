import { Card, Typography, CardMedia, Button, IconButton } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import Cookies from 'universal-cookie';

import Topbar from '../../Components/topbar/Topbar'
import styles from "./Home.module.css"
import findProsImg from "./findPros.png"
import qaImg from "./qa.png"
import blogImg from "./blog.png"
import gcImg from "./gchat.png"
import axios from '../../Helper/axios'
import { useHistory } from 'react-router';
import ChatIcon from '@mui/icons-material/Chat';


const Home = () => {
  const cookies = new Cookies();
  const role = cookies.get("assistr")
  let history = useHistory()
  const responseRef = useRef()
  const [render, setRender] = useState(false)
  const userType = cookies.get("assistr");
  useEffect(() => {

    axios.get(`/api/users/${role}s/appointments`)
      .then(res => {
        const apiResponse = res.data.data[role]
        responseRef.current = apiResponse.appointments;
        console.log(responseRef);
        setRender(true)
      }).catch(err => {
        console.log(err);
      })
    document.title = "Home - Assist";
  }, []);

  const joinButtonHandler = (id) => {
    let link = "/videoCall/" + id
    window.open(link, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  }

  const cancelAppointmentHandler = (id) => {
    let link = "/api/appointments/" + id;
    axios.delete(link).then(res => {
      console.log(res);
      window.location.reload(false)
    })
  }


  const chatHomeHandler = () => {
    history.push('/chat')
  }



  let adminDiv = null;
  if (userType === 'admin') {
    adminDiv = (
      <div className={styles.adminDiv}>
        <Card variant="outlined" className={styles.profApproveCard}>

          <CardMedia className={styles.profImg}
            component="img"

            image={findProsImg}
            alt="Find Professionals"
          />
          <div className={styles.profLabels}>
            <Typography className={styles.profName} gutterBottom variant="h5" component="div">
              Find Professionals
            </Typography>
            <Typography className={styles.profSpec1} variant="body2" color="text.secondary">
              Seek out the most</Typography>
            <Typography className={styles.profSpec2} variant="body2" color="text.secondary">
              Seek out the most suitable Mental Health Expert for You and schedule an appointment.
            </Typography>
          </div>
        </Card>
      </div>
    )
  }
  return (
    <div className={styles.mainDiv}>
      <Topbar list={[]} />
      <div className={styles.features}>
        <Card variant="outlined" className={styles.featureCard} onClick={() => history.push("/findProfessionals")} >

          <CardMedia className={styles.featureLogo}
            component="img"

            image={findProsImg}
            alt="Find Professionals"
          />
          <Typography className={styles.featureName} gutterBottom variant="h5" component="div">
            Find Professionals
          </Typography>
          <Typography className={styles.featureDesc} variant="body2" color="text.secondary">
            Seek out the most suitable Mental Health Expert for You and schedule an appointment.
          </Typography>
        </Card>
        <Card variant="outlined" className={styles.featureCard} onClick={() => history.push("/questions")}>

          <CardMedia className={styles.featureLogo}
            component="img"

            image={qaImg}
            alt="Question-Answers"
          />
          <Typography className={styles.featureName} gutterBottom variant="h5" component="div">
            Get Answers
          </Typography>
          <Typography className={styles.featureDesc} variant="body2" color="text.secondary">
            Ask mental Health related questions and get answers from professionals.
          </Typography>
        </Card>
        <Card variant="outlined" className={styles.featureCard} onClick={() => history.push("/blogs")}>

          <CardMedia className={styles.featureLogo}
            component="img"

            image={blogImg}
            alt="Blog Posts"
          />
          <Typography className={styles.featureName} gutterBottom variant="h5" component="div">
            Read Blogs
          </Typography>
          <Typography className={styles.featureDesc} variant="body2" color="text.secondary">
            Read insights and advice from Professionals and share experiences from everyone around us.
          </Typography>
        </Card>
        <Card variant="outlined" className={styles.featureCard} onClick={() => history.push("/groupchat")}>

          <CardMedia className={styles.featureLogo}
            component="img"

            image={gcImg}
            alt="Join Group Chat"
          />
          <Typography className={styles.featureName} gutterBottom variant="h5" component="div">
            Join Group Chat
          </Typography>
          <Typography className={styles.featureDesc} variant="body2" color="text.secondary">
            Communicate with fellow users and experts and share your thoughts anonymously.
          </Typography>
        </Card>

      </div>
      <h3 className={styles.appointHeader}>Your Appointments</h3>
      <div className={styles.appointments}>
        {
          responseRef.current ?
            responseRef.current.slice(0).reverse().map((appointment, index) => {
              return (
                <Card key={index} variant="outlined" className={styles.appointmentCard}>
                  <Typography className={styles.appointmentWith} variant="body3" color="text.secondary">
                    With : {role === "consumer" ? appointment.professionalsName : appointment.consumersName}
                  </Typography>
                  <Typography className={styles.appointmentTime} variant="body3" color="text.secondary">
                    Date & Time: {appointment.date} - {appointment.time}
                  </Typography>
                  <div className={styles.btnDiv}>
                    <Button
                      onClick={() => joinButtonHandler(appointment._id)}
                      className={styles.joinBtn} variant="outlined" >Join Session</Button>
                    <Button onClick={() => cancelAppointmentHandler(appointment._id)}
                      className={styles.cancelBtn} variant="outlined" >Cancel</Button>
                  </div>
                </Card>
              )
            }) : null
        }
      </div>
      <IconButton onClick={chatHomeHandler} className={styles.chatHomeButton} type="submit" sx={{ p: '10px' }} aria-label="Chat">
        <ChatIcon className={styles.chatButton} />
      </IconButton>
    </div>
  )
}

export default Home