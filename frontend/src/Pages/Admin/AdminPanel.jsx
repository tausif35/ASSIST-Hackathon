import React, { useEffect, useState } from 'react'
import Topbar from '../../Components/topbar/Topbar';
import axios from '../../Helper/axios'
import { useHistory } from "react-router-dom"

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styles from './AdminPanel.module.css'



const AdminPanel = () => {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  let history = useHistory()

  const [posts, setPosts] = useState([]);
  const [postsShow, setPostsShow] = useState([])
  const [profs, setProfs] = useState([]);

  useEffect(() => {
    axios.get('/api/approvals/blogs')
      .then(res => {
        console.log(res);
        // setPosts(res.data.data.blogs)
        // setPostsShow(res.data.data.blogs)
      });
  }, [])

  useEffect(() => {
    axios.get('/api/approvals/professionals')
      .then(res => {
        console.log(res);
        // setPosts(res.data.data.blogs)
        // setPostsShow(res.data.data.blogs)
      });
  }, [])



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

          </TabPanel>
          <TabPanel value="2">


          </TabPanel>
          <TabPanel value="3">


          </TabPanel>
        </TabContext>
      </Box>


    </div>
  )
}

export default AdminPanel
