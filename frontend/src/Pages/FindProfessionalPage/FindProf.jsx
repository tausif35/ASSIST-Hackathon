import React, { useEffect, useState } from 'react'
import { Card, Typography, CardMedia, Button, Grid } from '@mui/material'
import axios from '../../Helper/axios'
import { useHistory } from 'react-router';
import findProsImg from './doc.jpg'
import Topbar from '../../Components/topbar/Topbar';
import styles from './FindProf.module.css'
import { issues } from '../../Helper/mentalHealthProblems'
const FindProf = () => {
  let history = useHistory()
  const [doctors, setDoctors] = useState([])
  const [doctorShow, setDoctorShow] = useState([])
  const [doctorType, setDoctorType] = useState(issues[0])
  const [name, setName] = useState("")


  

  useEffect(() => {
    setDoctorShow(doctors.filter(doc => doc.Specialization.includes(doctorType)))
  }, [doctors, doctorType])



  const handleSelectChange = (event) => {
    setDoctorType(event.target.value)
  }


  const handleInputChange = (event) => {
    setName(event.target.value)
  }


  const cardClicked = (id) => {
    console.log(id);
    history.push("/professional/" + id)
  }


  const searchButtonClicked = () => {
    const doctorName = name.toLowerCase()
    if (doctorName.trim() !== "") {
      setDoctorShow(doctors.filter(doc => doc.fullname.toLowerCase() === doctorName || doc.fullname.toLowerCase().includes(doctorName)))
    }
  }

  return (
    <div className={styles.mainUserHomeDiv}>
      <Topbar list={[{link:"groupChat",base:"Group Chat"}, {link:"questions", base:"Q&A"}, {link:"blogs",base:"Blogs"}, {link:"findProfessionals", base:"Find Professionals"}]} />
      {/* <p className={styles.doctorText}>Find Your Doctor</p> */}
      <div className={styles.doctorFind}>
        <p className={styles.doctorText}>Specialized In:</p> <select name="Select One" onChange={handleSelectChange} value={doctorType} className={styles.diseaseSelect}>
          {issues.map((issue, index) => {
            return <option key={index}>{issue}</option>
          })}
        </select>
        {/* <p className={styles.doctorTextDivider}>||</p> */}
        <div className={styles.doctorTextDivider}>
        </div>

        <p className={styles.doctorText}>Search By Name:</p> <input onChange={handleInputChange} className={styles.profNameSearch} />
        <button onClick={searchButtonClicked} className={styles.searchButton}>Search</button>
      </div>
      <Grid
        container
        spacing={5}
        justifyContent="flex-start"
        className={styles.gridContainer}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Card onClick={() => cardClicked(1)} variant="outlined" className={styles.profApproveCard}>

            <CardMedia className={styles.profImg}
              component="img"

              image={findProsImg}
              alt="Find Professionals"
            />
            <div className={styles.profLabels}>
              <Typography className={styles.profName} gutterBottom variant="h5" component="div">
                Dr Mohit Kamal
              </Typography>
              <Typography className={styles.profSpec1} variant="body2" color="text.secondary">
                MBBS MD </Typography>
              <Typography className={styles.profSpec2} variant="body2" color="text.secondary">
                Major Depression ,Bipolar Disorder ,Generalized Anxiety Disorder,Obsessive-Compulsive Disorder, Panic Disorder
              </Typography>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card onClick={() => cardClicked()} variant="outlined" className={styles.profApproveCard}>

            <CardMedia className={styles.profImg}
              component="img"

              image={findProsImg}
              alt="Find Professionals"
            />
            <div className={styles.profLabels}>
              <Typography className={styles.profName} gutterBottom variant="h5" component="div">
                Dr Tahsin Tunan
              </Typography>
              <Typography className={styles.profSpec1} variant="body2" color="text.secondary">
                MBBS MD </Typography>
              <Typography className={styles.profSpec2} variant="body2" color="text.secondary">
                Major Depression ,Bipolar Disorder ,Social Anxiety, Panic Disorder
              </Typography>
            </div>
          </Card>
        </Grid>

      </Grid>
    </div>
  )
}

export default FindProf
