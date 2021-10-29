import React, { useState, useEffect } from 'react'
import Topbar from '../../../Components/topbar/Topbar'
import { Radio, Button, TextField, RadioGroup, FormControlLabel, FormLabel } from '@mui/material'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import axios from '../../../Helper/axios'
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom"
import styles from './AdminLogin.module.css'

const cookies = new Cookies()


const AdminLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const formRef = React.useRef();
  let history = useHistory();
  const handleChange = (event, type) => {
    switch (type) {
      case "email":
        setEmail(event.target.value)
        break
      case "password":
        setPassword(event.target.value)
        break
      default:
        break;
    }
  }

  const submit = () => {
    if (formRef.current.reportValidity) {
      const body = {
        email,
        role: 'admin',
        password
      }
      console.log(body)
      axios.post("/api/admin/login", body)
        .then(res => {
          console.log(res)
          cookies.set("assistc", res.data.accessToken)
          cookies.set("assistr", body.role)
          history.push("/admin");
        }).catch(err => {
          console.log(err);
        })
    }

  }

  useEffect(() => {
    cookies.remove("assistc")
    cookies.remove("assistr")
    document.title = "Admin Login - ASSIST";
  }, []);

  return (
    <div className={styles.mainDiv} style={{ backgroundColor: "#EFF5E9" }}>
      <Topbar list={[]} />
      <div className={styles.mainSignUpDiv}>
        <form ref={formRef} className={styles.signUpDiv}>
          <p className={styles.signUpText}>Admin Login</p>
          <TextField required="true" onChange={(event) => { handleChange(event, "email") }} className={styles.textField} id="standard-basic" type="email" label="Email" variant="outlined" />
          <TextField required="true" onChange={(event) => { handleChange(event, "password") }} className={styles.textField} id="standard-basic" label="Passowrd" type="password" variant="outlined" />

          <Button className={styles.btn} onClick={submit} variant="contained" endIcon={<DoubleArrowIcon />}>Login</Button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
