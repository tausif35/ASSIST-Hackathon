import React from 'react'
import { Card, Typography, CardMedia, IconButton } from '@mui/material'
import Topbar from '../../../Components/topbar/Topbar'
import styles from './GroupChatHome.module.css'
import { useHistory } from 'react-router'
import growthImg from './Growth.png'
import socializeImg from './Socialize.png'
import positivityImg from './Positivity.png'
import helpingImg from './HelpingHand.png'


const GroupChatHome = () => {
  let history = useHistory()
  return (
    <div className={styles.mainUserHomeDiv}>
      <Topbar list={[{ link: "groupChat", base: "Group Chat" },
      { link: "questions", base: "Q&A" }, { link: "blogs", base: "Blogs" },
      { link: "findProfessionals", base: "Find Professionals" }]} />

      <div className={styles.features}>
        <Card variant="outlined" className={styles.featureCard} onClick={() => history.push("/groupchat/room/growth")} >

          <CardMedia className={styles.featureLogo}
            component="img"

            image={growthImg}
            alt="Growth"
          />

          <Typography className={styles.featureName} gutterBottom variant="h5" component="div">
            Growth
          </Typography>
          <Typography className={styles.featureDesc} variant="body2" color="text.secondary">
            Socialize and grow together!
          </Typography>
        </Card>
        <Card variant="outlined" className={styles.featureCard} onClick={() => history.push("/groupchat/room/helping")}>

          <CardMedia className={styles.featureLogo}
            component="img"

            image={helpingImg}
            alt="Helping"
          />
          <Typography className={styles.featureName} gutterBottom variant="h5" component="div">
            Helping Hand
          </Typography>
          <Typography className={styles.featureDesc} variant="body2" color="text.secondary">
            Ask and give mental Health related support and advice.
          </Typography>
        </Card>
        <Card variant="outlined" className={styles.featureCard} onClick={() => history.push("/groupchat/room/positivity")}>

          <CardMedia className={styles.featureLogo}
            component="img"

            image={positivityImg}
            alt="Positivity"
          />
          <Typography className={styles.featureName} gutterBottom variant="h5" component="div">
            Positivity
          </Typography>
          <Typography className={styles.featureDesc} variant="body2" color="text.secondary">
            Spread positivity and bring happiness!
          </Typography>
        </Card>
        <Card variant="outlined" className={styles.featureCard} onClick={() => history.push("/groupchat/room/socialize")}>

          <CardMedia className={styles.featureLogo}
            component="img"

            image={socializeImg}
            alt="Socialize"
          />
          <Typography className={styles.featureName} gutterBottom variant="h5" component="div">
            Socialize
          </Typography>
          <Typography className={styles.featureDesc} variant="body2" color="text.secondary">
            Communicate with fellow users and experts and share your thoughts.
          </Typography>
        </Card>

      </div>


    </div>
  )
}

export default GroupChatHome
