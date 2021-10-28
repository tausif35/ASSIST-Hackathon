import { Grid, Button, Typography, Divider, Input, IconButton, TextField } from '@mui/material'
import React from 'react'
import Topbar from '../../Components/topbar/Topbar'
import styles from './Profile.module.css'
import proPic from './doc.jpg'
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import DocProfile from './DocProfile'



const Profile = () => {
  return (
    <div className={styles.mainDiv} >
      <Topbar list={[{ link: "groupChat", base: "Group Chat" }, { link: "questions", base: "Q&A" }, { link: "blogs", base: "Blogs" }, { link: "findProfessionals", base: "Find Professionals" }]} />
      <Grid
        container
        spacing={8}
        justifyContent="flex-start"
        className={styles.gridContainer}
      >
        <Grid item xs={8} sm={6} md={3}>
          <div className={styles.profInfo1}>
            <img className={styles.profImg} src={proPic} alt="" />
            <Typography className={styles.proPicText} gutterBottom variant="h5" component="div">
              Change Profile Picture
              <label htmlFor="fileInput">
                {/* <Add className={classes.addIcon} fontSize="large" color="action" /> */}
                <PhotoCamera className={styles.proPicAdd} fontSize='medium' color="action"></PhotoCamera>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
              // onChange={(e) => setFile(e.target.files[0])}
              />
            </Typography>
          </div>
        </Grid>

        <Grid
          item xs={8} sm={6} md={8.65}>
          <h1>Profile Information:</h1>

          <div className={styles.profInfo2}>
            <TextField required="true" className={styles.textField} id="outlined-required" label="Full Name" variant="outlined" />
            <TextField required="true" className={styles.textField} id="outlined-required" label="Passowrd" type="password" variant="outlined" />
            <TextField required="true" className={styles.textField} id="outlined-required" label="Confirm Passowrd" type="password" variant="outlined" />
            <DocProfile />
          </div>
          <Divider></Divider>
          <div className={styles.btnDiv}>
            <Button className={styles.updateButton} variant="outlined">Update Profile</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Profile
