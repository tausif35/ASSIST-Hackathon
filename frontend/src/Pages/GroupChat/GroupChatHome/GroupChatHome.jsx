import React from 'react'
import { Card, Typography, CardMedia, IconButton } from '@mui/material'
import Topbar from '../../../Components/topbar/Topbar'
import styles from './GroupChatHome.module.css'
import { useHistory } from 'react-router'


const GroupChatHome = () => {
  let history = useHistory()
  return (
    <div className={styles.mainUserHomeDiv}>
      <Topbar list={[{ link: "groupChat", base: "Group Chat" },
      { link: "questions", base: "Q&A" }, { link: "blogs", base: "Blogs" },
      { link: "findProfessionals", base: "Find Professionals" }]} />

      <div className={styles.features}>
        <Card variant="outlined" className={styles.featureCard} onClick={() => history.push("/findProfessionals")} >

          <CardMedia className={styles.featureLogo}
            component="img"

            image={require('./Growth.png')}
            alt="Find Professionals"
          />
          <img src={require('./Growth.png').default} />

          <Typography className={styles.featureName} gutterBottom variant="h5" component="div">
            Find Professionals
          </Typography>
          <Typography className={styles.featureDesc} variant="body2" color="text.secondary">
            Seek out the most suitable Mental Health Expert for You and schedule an appointment.
          </Typography>
        </Card>
        {/* <Card variant="outlined" className={styles.featureCard} onClick={() => history.push("/questions")}>

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
        </Card> */}

      </div>


    </div>
  )
}

export default GroupChatHome
