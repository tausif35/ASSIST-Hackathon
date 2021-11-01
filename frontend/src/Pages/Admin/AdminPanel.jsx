import React, { useEffect, useState } from 'react'
import Topbar from '../../Components/topbar/Topbar';
import axios from '../../Helper/axios'
import { useHistory } from "react-router-dom"
import { Card, Typography, CardMedia, Button, Grid, TextField } from '@mui/material'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styles from './AdminPanel.module.css'
import findProsImg from '../FindProfessionalPage/doc.jpg'
import Cookies from 'universal-cookie'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';




const AdminPanel = () => {
  const cookies = new Cookies()
  const [email, setEmail] = useState("")
  const [fullname, setFullname] = useState("")
  const [password, setPassword] = useState("")

  const signUphandleChange = (event, type) => {
    switch (type) {
      case "fullname":
        setFullname(event.target.value)
        break;
      case "email":
        setEmail(event.target.value)
        break;
      case "password":
        setPassword(event.target.value)
        break;
      default:
        break;
    }
  }
  const submit = () => {
    const body = {
      fullname,
      email,
      role: 'admin',
      password
    }
    axios.post("/api/admin/signup", body)
      .then(res => {
        cookies.set("assistc", res.data.accessToken)
        cookies.set("assistr", "admin")
        history.push("/admin");
      }).catch(err => {
        console.log(err);
      })
    alert("New Admin Account Created")
  }

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  let history = useHistory()

  const [posts, setPosts] = useState([]);
  const [postsShow, setPostsShow] = useState([])
  const [profs, setProfs] = useState([]);
  const [profsShow, setProfsShow] = useState([])

  useEffect(() => {
    axios.get('/api/approvals/blogs')
      .then(res => {
        console.log(res);
        setPosts(res.data.data.approvals)
        setPostsShow(res.data.data.approvals)
      });
    axios.get('/api/approvals/professionals')
      .then(res => {
        console.log(res);

        setProfs(res.data.data.approvals)
        setProfsShow(res.data.data.approvals)
      });
  }, [])
  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '...' : str;
  }
  const cardClicked = (id) => {
    console.log(id);
    const link = "/api/approvals/professionals/" + id
    axios.get(link).then(res => {
      window.location.reload(false)
    }).catch(err => {
      console.log(err);
    })
  }

  const blogClicked = (id) => {
    const link = "/api/approvals/blogs/" + id
    axios.get(link).then(res => {
      window.location.reload(false)
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <div className={styles.mainDiv}>
      <Topbar list={[]} />
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Approve Professionals" value="1" />
              <Tab label="Approve Blogs" value="2" />
              <Tab label="Create Admin Account" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid
              container
              spacing={5}
              justifyContent="flex-start"
              className={styles.gridContainer}>

              {profsShow.map((doc, docIndex) => {
                return (
                  <Grid item xs={12} sm={6} md={4}>
                    <Card onClick={() => cardClicked(doc._id)} variant="outlined" className={styles.profApproveCard} key={docIndex}>

                      <CardMedia className={styles.profImg}
                        component="img"

                        image={findProsImg}
                        alt="Find Professionals"
                      />
                      <div className={styles.profLabels}>
                        <Typography className={styles.profName} gutterBottom variant="h5" component="div">
                          {doc.fullname}
                        </Typography>
                        <Typography className={styles.profSpec1} variant="body2" color="text.secondary">
                          {doc.Degrees}</Typography>

                      </div>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>

          </TabPanel>
          <TabPanel value="2">
            <Grid
              container
              spacing={5}
              justifyContent="flex-start"
              className={styles.gridContainer}>

              {
                postsShow.length ? postsShow.map(post => (
                  <Grid item lg={3} sm={4} xs={12}>
                    <Box onClick={() => blogClicked(post._id)} className={styles.container}>
                      <img src={`http://localhost:8080/${post.photo}`} alt="post" className={styles.image} />
                      <Typography className={styles.heading}>{addEllipsis(post.title, 20)}</Typography>
                      <Typography className={styles.textColor}>Author: {post.name}</Typography>
                      <Typography className={styles.detail}>{addEllipsis(post.body, 100)}</Typography>
                    </Box>
                  </Grid>
                )) : <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
                  No data is available for selected category
                </Box>
              }</Grid>

          </TabPanel>
          <TabPanel value="3">
            <form className={styles.signUpDiv}>
              <p className={styles.signUpText}>Create Admin</p>
              <TextField required="true" onChange={(event) => { signUphandleChange(event, "fullname") }} className={styles.textField} id="standard-basic" label="Full Name" variant="standard" />
              <TextField required="true" onChange={(event) => { signUphandleChange(event, "email") }} className={styles.textField} id="standard-basic" type="email" label="Email" variant="standard" />
              <TextField required="true" onChange={(event) => { signUphandleChange(event, "password") }} className={styles.textField} id="standard-basic" label="Passowrd" type="password" variant="standard" />
              <Button className={styles.btn} onClick={submit} variant="contained" endIcon={<DoubleArrowIcon />}>Submit</Button>
            </form>

          </TabPanel>
        </TabContext>
      </Box>


    </div>
  )
}

export default AdminPanel
