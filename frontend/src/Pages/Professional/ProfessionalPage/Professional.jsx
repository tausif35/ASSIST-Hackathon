import React, { useEffect, useState } from 'react'
import styles from './Professional.module.css'
import Topbar from '../../../Components/topbar/Topbar'
import docPic from './doc.jpg'
import { Typography, Grid, Button, Divider } from '@mui/material'
import axios from '../../../Helper/axios'
import { useHistory } from 'react-router'
import { issues } from '../../../Helper/mentalHealthProblems'
const Professional = (props) => {
  let history = useHistory()
  const [specializations, setSpecializations] = useState("")
  const [achievements, setAchievements] = useState("")
  const [education_qualifications, setEducation_qualifications] = useState("")
  const [research_and_Publications, setResearch_and_Publications] = useState("")
  const [work_experience, setWork_experience] = useState("")
  const [fullname, setFullname] = useState("")
  const [degrees, setDegrees] = useState("")

  const setAppointmentButtonClicked = () => {
    history.push(`/professional/${props.match.params.id}/appointment`)
  }

  const chatDoctorClicked = () => {
    history.push(`/chat/1`)
  }





  return (
    <div>
      <Topbar list={[{ link: "groupChat", base: "Group Chat" }, { link: "questions", base: "Q&A" }, { link: "blogs", base: "Blogs" }, { link: "findProfessionals", base: "Find Professionals" }]} />
      <Grid
        container
        spacing={8}
        justifyContent="flex-start"
        className={styles.gridContainer}
      >
        <Grid item xs={8} sm={6} md={3}>
          <div className={styles.profInfo1}>
            <img className={styles.profImg} src={docPic} alt="" />
            <Typography className={styles.profName} gutterBottom variant="h5" component="div">
              Dr Mohit Kamal
            </Typography>
            <Typography className={styles.profDregrees} variant="body2" color="text.secondary">
              MBBS MD
            </Typography>
          </div>
        </Grid>

        <Grid
          item xs={8} sm={6} md={8.65}>
          <h1>Qualifications:</h1>

          <div className={styles.profInfo2}>
            <Typography className={styles.infoTitle} gutterBottom variant="h5" component="div">
              Specialization
            </Typography>
            <Typography className={styles.infoDesc} variant="body2" color="text.secondary">
              Major Depression<br />Post traumatic stress disorder<br />Marriage Consultancy</Typography>
            <Typography className={styles.infoTitle} variant="h5" >
              Achievements
            </Typography>
            <Typography className={styles.infoDesc} variant="body2" color="text.secondary">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </Typography>
            <Typography className={styles.infoTitle} gutterBottom variant="h5" component="div">
              Education Qualifications
            </Typography>
            <Typography className={styles.infoDesc} variant="body2" color="text.secondary">
              MBBS<br /> PhD<br /> Research</Typography>
            <Typography className={styles.infoTitle} gutterBottom variant="h5" component="div">
              Research and Publications
            </Typography>
            <Typography className={styles.infoDesc} variant="body2" color="text.secondary">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </Typography>
            <Typography className={styles.infoTitle} gutterBottom variant="h5" component="div">
              Work Experience
            </Typography>
            <Typography className={styles.infoDesc} variant="body2" color="text.secondary">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </Typography>
          </div>
          <Divider></Divider>
          <div className={styles.btnDiv}>
            <Button onClick={chatDoctorClicked} className={styles.chatDoc} variant="outlined">Chat with doctor</Button>
            <Button onClick={setAppointmentButtonClicked} className={styles.setApp}>Set Appointment</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Professional
