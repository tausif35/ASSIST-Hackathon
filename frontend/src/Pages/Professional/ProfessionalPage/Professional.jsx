import React,{useEffect,useState} from 'react'
import styles from './Professional.module.css'
import Topbar from '../../../Components/topbar/Topbar'
import docPic from './doc.jpg'
import { Typography,Grid, Button } from '@mui/material'
import axios from '../../../Helper/axios'
import Cookies from 'universal-cookie'
import { useHistory } from 'react-router'
const Professional = (props) => {
  let history=useHistory()
  const cookies=new Cookies()
  const [specializations,setSpecializations]=useState([])
  const [achievements,setAchievements]=useState("")
  const [education_qualifications,setEducation_qualifications]=useState("")
  const [research_and_Publications,setResearch_and_Publications]=useState("")
  const [work_experience,setWork_experience]=useState("")
  const [fullname,setFullname]=useState("")
  const [degrees,setDegrees]=useState("")
  const [same,setSame]=useState(true)

  const setAppointmentButtonClicked=()=>{
    history.push(`/professional/${props.match.params.id}/appointment`)
  }

  const chatButtonClicked=()=>{
    history.push(`/chat/${props.match.params.id}`)
  }


  useEffect(() => {
      axios.get(`/api/users/professionals/${props.match.params.id}`)
        .then(res=>{
          console.log(res);
          const role=cookies.get("assistr")
          const response=res.data.data[role]
          setSpecializations(res.data.data.professional.Specialization)
          setAchievements(res.data.data.professional.Achievements)
          setEducation_qualifications(res.data.data.professional.Education_qualifications)
          setResearch_and_Publications(res.data.data.professional.Research_and_Publications)
          setWork_experience(res.data.data.professional.Work_experience)
          setFullname(res.data.data.professional.fullname)
          setDegrees(res.data.data.professional.Degrees)
          setSame(res.data.data.same)
        })
  }, [])




  return (
    <div>
      <Topbar list={[{link:"groupChat",base:"Group Chat"}, {link:"questions", base:"Q&A"}, {link:"blogs",base:"Blogs"}, {link:"findProfessionals", base:"Find Professionals"}]} />
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
            {fullname}
          </Typography>
          <Typography className={styles.profDregrees} variant="body2" color="text.secondary">
            {degrees.split(" ").join(", ")}  
          </Typography>
        </div>
      </Grid>
      
      <Grid item xs={8} sm={6} md={8.65}>
        
        
      <h1 style={{textAlign:'left'}}>Qualifications:</h1>
      <div className={styles.profInfo2}>
      <Typography className={styles.infoTitle} gutterBottom variant="h5" component="div">
      Specialization
          </Typography>
            {specializations.map((special,index)=><Typography className={styles.infoDesc} variant="body2" color="text.secondary" key={index}>{special}<br/></Typography>)}
          <Typography className={styles.infoTitle}  variant="h5" >
            Achievements
          </Typography>
          <Typography className={styles.infoDesc} variant="body2" color="text.secondary">
          {achievements}</Typography>
          <Typography className={styles.infoTitle} gutterBottom variant="h5" component="div">
            Education Qualifications
          </Typography>
          <Typography className={styles.infoDesc} variant="body2" color="text.secondary">
            {education_qualifications}</Typography>
          <Typography className={styles.infoTitle} gutterBottom variant="h5" component="div">
            Research and Publications
          </Typography>
          <Typography className={styles.infoDesc} variant="body2" color="text.secondary">
            {research_and_Publications}</Typography>
            <Typography className={styles.infoTitle} gutterBottom variant="h5" component="div">
            Work Experience
          </Typography>
          <Typography className={styles.infoDesc} variant="body2" color="text.secondary">
            {work_experience}</Typography>
          
        </div>
        {
          !same?<div className={styles.btn}>
          <Button onClick={chatButtonClicked} className={styles.chatDoc}>Chat with doctor</Button>
          {cookies.get("assistr")==="consumer"? <Button onClick={setAppointmentButtonClicked} className={styles.setApp}>Set Appointment</Button>:null}
        </div>:null 
        }
      </Grid>
      </Grid>
    </div>
  )
}

export default Professional