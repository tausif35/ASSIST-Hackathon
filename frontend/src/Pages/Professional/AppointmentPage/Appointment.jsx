import React, { useState, useEffect, useRef } from 'react'
import Topbar from '../../../Components/topbar/Topbar'
import styles from "./Appointment.module.css"
import { Card, Typography, Button, CardMedia, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import axios from '../../../Helper/axios'
import { useHistory } from "react-router-dom"
const Appointment = (props) => {
  let history=useHistory()
  const allTimes=["9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM", "6:00PM", "7:00PM", "8:00PM", "9:00PM"]
  const [times, setTimes] = useState(allTimes)
  const [date, setDate] = useState(new Date());
  const [maxDate,setMaxDate]=useState("")
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [number,setNumber]=useState("")
  const [title,setTitle]=useState("")
  const [time,setTime]=useState("")
  const [profName,setProfName]=useState("")
  const [timeState,setTimeState]=useState("")
  const responseRef=useRef()
  const formRef = useRef();
  const handleChange = (event,type) => {
    switch (type) {
      case "name":
        setName(event.target.value)
        break;
      case "email":
        setEmail(event.target.value)
        break;
      case "title":
        setTitle(event.target.value)
        break;
      case "number":
        setNumber(event.target.value)
        break;

      default:
        break;
    }
  }


  const handleDateChange=(newDate)=>{
    setDate(newDate)
  }

  useEffect(()=>{
    setTimeState(time)
  },[time])

  const paymentButton = useRef()
  const confirmButton = useRef()
  useEffect(() => {
    confirmButton.current.disabled = true
    const dt = new Date();
    dt.setMonth(dt.getMonth() + 2)
    setMaxDate(dt)

    axios.get(`/api/users/professionals/${props.match.params.id}`).then(res => {
      setProfName(res.data.data.professional.fullname)
      responseRef.current=res.data.data.detailedAppointmentStat
      let obj=responseRef.current.find(o=>o._id===date.toDateString())
      if(obj){
        setTimes(allTimes.filter( function( el ) {   return !obj.times.includes( el ); } ))
      }else{
        setTimes(allTimes)
      }

    })

  }, [])



  useEffect(()=>{
    if(responseRef.current){
      
      let obj=responseRef.current.find(o=>o._id===date.toDateString())
      console.log(obj);
      if(obj){
        setTimes(allTimes.filter( function( el ) {   return !obj.times.includes( el ); } ))
      }else{
        setTimes(allTimes)
      }
    }
  },[date])



  
  
  const makePayment=()=>{
    confirmButton.current.disabled=false;
    paymentButton.current.disabled=true;
    paymentButton.current.innerText="Payment Done"

  }

  const confirmAppointment = (event) => {
    if (formRef.current.reportValidity()) {
      event.preventDefault();
      const body={
        _professionalId:props.match.params.id,
        consumersName:name,
        email,
        number,
        title,
        time,
        date:date.toDateString(),
        professionalsName:profName
      }
      axios.post("/api/appointments", body)
        .then(res => {
          if (res.data.message === "successful") {
            history.push("/home")
          }
        })
    }

  }




  return (
    <div className={styles.mainDiv}>
      <Topbar list={[{link:"groupChat",base:"Group Chat"}, {link:"questions", base:"Q&A"}, {link:"blogs",base:"Blogs"}, {link:"findProfessionals", base:"Find Professionals"}]} />
      <div className={styles.appointmentDiv}>
        <Card variant="outlined" className={styles.profApproveCard}>
          <form ref={formRef} className={styles.appointmentForm}>
            <div className={styles.appointmentForm}>
              <Typography className={styles.profName} gutterBottom variant="h5" component="div">
                Set Appointment with <span style={{ color: "#86D382", fontWeight: "600" }}>{profName}</span>
              </Typography>
              <div className={styles.formFields1}>
                <TextField required="true" onChange={(event) => { handleChange(event, "title") }} className={styles.textField} id="standard-basic" label="Appointment Title" variant="outlined" />
                <TextField required="true" onChange={(event) => { handleChange(event, "name") }} className={styles.textField} id="standard-basic" label="Name" variant="outlined" />

              </div>
              <div className={styles.formFields1}>
                <TextField required="true" onChange={(event) => { handleChange(event, "email") }} className={styles.textField} id="standard-basic" type="email" label="Email" variant="outlined" />
                <TextField required="true" onChange={(event) => { handleChange(event, "number") }} className={styles.textField} id="standard-basic" type="text" label="Phone Number" variant="outlined" />

              </div>
              <div
                className={styles.datePicker}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StaticDatePicker
                    orientation="landscape"
                    openTo="day"
                    value={date}
                    onChange={(newValue) => { handleDateChange(newValue) }}
                    renderInput={(params) => <TextField {...params} />}
                    maxDate={maxDate}
                    disablePast
                  />
                </LocalizationProvider>
              </div>
            </div>

            <div className={styles.timeButtons}>
              <p className={styles.timeHeader}>Available Slots:</p>
              {times.map((time, index) => {
                return <Button onClick={() => setTime(time)} className={time===timeState?styles.chosenTime:null} variant="outlined" key={index}> {time} </Button>
              })}
              {
                times.length <= 0 ? <div>Sorry, No Slots Available.</div> : null
              }
            </div>


            <div className={styles.appointmentBtn}>
              <button ref={paymentButton} onClick={makePayment} className={styles.makePayment} >Make Payment</button>
              <button ref={confirmButton} onClick={confirmAppointment} className={styles.confirm} >Confirm Appointment</button>
            </div>


            {/* <Button className={styles.btn} onClick={submit} variant="contained" endIcon={<DoubleArrowIcon />}>Submit</Button> */}
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Appointment