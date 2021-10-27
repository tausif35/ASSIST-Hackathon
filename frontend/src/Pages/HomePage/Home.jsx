import { Card, Typography, CardMedia, Button } from '@mui/material'
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


const Home = () => {
  const cookies = new Cookies();
  const role = cookies.get("assistr")
  let history = useHistory()
  const responseRef = useRef()
  const [render, setRender] = useState(false)
  const userType = cookies.get("assistr");
  useEffect(() => {
    document.title = "Home - Assist";
  }, []);
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
        <Card variant="outlined" className={styles.featureCard} onClick={() => history.push("/q&a")}>

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
        <Card variant="outlined" className={styles.featureCard} onClick={() => history.push("/groupChat")}>

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
        <h3>Your Appointments</h3>
        <Card variant="outlined" className={styles.appointmentCard}>
          <Typography className={styles.appointmentWith} variant="body3" color="text.secondary">
            With : Mohit Kamal
          </Typography>
          <Typography className={styles.appointmentTime} variant="body3" color="text.secondary">
            Date & Time:  Sun Oct 23, 2021
          </Typography>
          <div className={styles.btnDiv}>
            <Button className={styles.joinBtn} variant="outlined" >Join Session</Button>
            <Button className={styles.cancelBtn} variant="outlined" >Cancel</Button>
          </div>
        </Card>
        <Card variant="outlined" className={styles.appointmentCard}>
          <Typography className={styles.appointmentWith} variant="body3" color="text.secondary">
            With : Tahsin Tunan
          </Typography>
          <Typography className={styles.appointmentTime} variant="body3" color="text.secondary">
            Date & Time:  Thu Oct 27, 2021
          </Typography>
          <div className={styles.btnDiv}>
            <Button className={styles.joinBtn} variant="outlined" >Join Session</Button>
            <Button className={styles.cancelBtn} variant="outlined" >Cancel</Button>
          </div>
        </Card>

      </div>

    </div>
  )
}

export default Home
