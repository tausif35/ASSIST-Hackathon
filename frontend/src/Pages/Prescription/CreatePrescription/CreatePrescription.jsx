import React, { useState } from 'react'
import Topbar from '../../../Components/topbar/Topbar'
import { TextField, Button } from '@mui/material'
import axios from '../../../Helper/axios'
import { useHistory } from 'react-router'
import styles from './CreatePrescription.module.css'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const CreatePrescription = (props) => {

  const [diagnosis, setDiagnosis] = useState("")
  const [prescription, setPrescription] = useState("")
  let history = useHistory();
  const handleChange = (event, type) => {
    switch (type) {
      case "diagnosis":
        setDiagnosis(event.target.value)
        break
      case "prescription":
        setPrescription(event.target.value)
        break
      default:
        break;
    }
  }

  const submit = () => {
    const body = {
      diagnosis,
      prescription
    }
    console.log(body)
    const id = window.location.pathname.split("/")[2]
    console.log(`/api/appointments/${id}`);
    axios.patch(`/api/appointments/${id}`, body)
      .then(res => {
        console.log(res)
        history.push("/home");
      }).catch(err => {
        console.log(err);
      })

  }


  return (
    <div className={styles.mainDiv} style={{ backgroundColor: "#EFF5E9" }}>
      <Topbar list={[]} />
      <div className={styles.mainSignUpDiv}>
        <form className={styles.signUpDiv}>
          <TextField
            onChange={(event) => {
              handleChange(event, "diagnosis");
            }}
            className={styles.infoField}
            id="outlined-multiline-flexible"
            label="Diagnosis"
            rows={4}
            placeholder="Diagnosis Of The Patient Here..."
            multiline
          />
          <TextField
            onChange={(event) => {
              handleChange(event, "prescription");
            }}
            className={styles.infoField}
            id="outlined-multiline-flexible"
            label="Prescription"
            maxRows={6}
            rows={4}
            placeholder="Your Prescription Here..."
            multiline
          />
          <Button className={styles.btn}
            onClick={submit} variant="contained"
            endIcon={<DoubleArrowIcon />}>Create</Button>
        </form>
      </div>
    </div>
  )
}

export default CreatePrescription
