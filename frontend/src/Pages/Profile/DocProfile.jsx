import React, { useState, useEffect, useRef, useContext } from 'react'
import {
  Button, TextField, FormControlLabel, FormLabel, Box, Checkbox, Card, CardHeader, Divider, List, ListItem,
  ListItemIcon, ListItemText, Grid
} from '@mui/material'
import styles from './Profile.module.css'
import { useHistory } from "react-router-dom"
import { UserContext } from '../../Helper/userContext';
import { issues } from '../../Helper/mentalHealthProblems';

const DocProfile = () => {
  const [degrees, setdegrees] = useState("")
  const [edu, setedu] = useState("")
  const [work, setwork] = useState("")
  const [research, setresearch] = useState("")
  const [achievment, setAchievment] = useState("")
  const [phone, setPhone] = useState("")

  let history = useHistory();
  const formRef = React.useRef();

  const handleChange = (event, type) => {
    switch (type) {
      case "edu":
        setedu(event.target.value);
        break;
      case "degrees":
        setdegrees(event.target.value);
        break;
      case "work":
        setwork(event.target.value);
        break;
      case "research":
        setresearch(event.target.value);
        break;
      case "achievment":
        setAchievment(event.target.value);
        break;
      case "phone":
        setPhone(event.target.value);
        break;
      default:
        break;
    }
  };
  return (
    <div className={styles.qualiDiv}>
      <TextField
        onChange={(event) => {
          handleChange(event, "edu");
        }}
        className={styles.infoField}
        id="outlined-multiline-flexible"
        label="Educational Qualifications"
        maxRows={6}
        rows={4}
        placeholder="Your Educational Qualifications Here..."
        multiline
      />
      <TextField
        onChange={(event) => {
          handleChange(event, "degrees");
        }}
        className={styles.infoField}
        id="outlined-multiline-flexible"
        label="Degrees"
        maxRows={6}
        rows={4}
        placeholder="Degrees You Have Achieved Here..."
        multiline
      />
      <TextField
        onChange={(event) => {
          handleChange(event, "work");
        }}
        className={styles.infoField}
        id="outlined-multiline-flexible"
        label="Work Experience"
        maxRows={6}
        rows={4}
        placeholder="Your Work Experience Here..."
        multiline
      />
      <TextField
        onChange={(event) => {
          handleChange(event, "research");
        }}
        className={styles.infoField}
        id="outlined-multiline-flexible"
        label="Research and Publications"
        maxRows={6}
        rows={4}
        placeholder="Your Research and Publications Here..."
        multiline
      />
      <TextField
        onChange={(event) => {
          handleChange(event, "achievment");
        }}
        className={styles.infoField}
        id="outlined-multiline-flexible"
        label="Achievements"
        maxRows={6}
        rows={4}
        placeholder="Your Achievements Here..."
        multiline
      />


      <TextField
        required="true"
        onChange={(event) => {
          handleChange(event, "phone");
        }}
        className={styles.infoField}
        id="outlined-multiline-flexible"
        label="Phone Number"
        placeholder="Your Phone Number Here..."
      />
    </div>
  )
}

export default DocProfile
