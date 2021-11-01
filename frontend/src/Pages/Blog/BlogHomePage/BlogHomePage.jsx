import React, { useEffect, useState } from 'react';
import axios from '../../../Helper/axios'
import Topbar from '../../../Components/topbar/Topbar'
import styles from './BlogHomePage.module.css'
import blogBanner from './Blog.png'
import { Grid, Paper, InputBase, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Posts from './Posts'
import { useHistory } from "react-router-dom"

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const BlogHomePage = () => {


  let history = useHistory()

  const [value, setValue] = React.useState('1');
  const [searchValue, setSearchValue] = useState("")
  const [profPosts, setProfPosts] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [posts, setPosts] = useState([]);
  const [postsShow, setPostsShow] = useState([])
  useEffect(() => {
    axios.get('/api/blogs')
      .then(res => {
        setPosts(res.data.data.blogs)
        setUserPosts(res.data.data.consumers_blogs)
        setProfPosts(res.data.data.professionals_blogs)
        setPostsShow(res.data.data.blogs)
      });
  }, [])





  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {
    if (searchValue.trim === "") {
      setPostsShow(posts)
    } else {
      setPostsShow(posts.filter(post => post.title.toLowerCase() === searchValue || post.title.toLowerCase().includes(searchValue)))
    }

  }, [searchValue])

  const searchInputHandler = (event) => {
    setSearchValue(event.target.value)
  }

  const writeBlogHandler = () => {
    history.push('/blogs/new')
  }
  return (
    <div className={styles.mainDiv}>
      <Topbar list={[{ link: "groupChat", base: "Group Chat" }, { link: "questions", base: "Q&A" }, { link: "blogs", base: "Blogs" }, { link: "findProfessionals", base: "Find Professionals" }]} />
      <div className={styles.banner}>
        <img className={styles.bannerImg} src={blogBanner} alt="" srcset="" />
      </div>



      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="All Blogs" value="1" />
              <Tab label="By Professionals" value="2" />
              <Tab label="By Users" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className={styles.blogSearchDiv}>
              {/* <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        > */}
              <InputBase onChange={(event) => searchInputHandler(event)} className={styles.blogSearchBar}
                sx={{ ml: 1, flex: 1 }}
                placeholder="S e a r c h    B l o g"
                inputProps={{ 'aria-label': 'search blogs' }}
              />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
              {/* </Paper> */}
            </div>
            <div className={styles.postsDiv}>
              <Posts posts={postsShow} />
            </div>
          </TabPanel>

          <TabPanel value="2">
            <div className={styles.postsDiv}>
              <Posts posts={profPosts} />
            </div>
          </TabPanel>

          <TabPanel value="3">
            <div className={styles.postsDiv}>
              <Posts posts={userPosts} />
            </div>
          </TabPanel>
        </TabContext>
      </Box>




      {/* <div className={styles.postsDiv}>
        <Posts posts={postsShow} />
      </div> */}
      <IconButton onClick={writeBlogHandler} className={styles.addBlogButton} type="submit" sx={{ p: '10px' }} aria-label="Create">
        <AddCircleOutlinedIcon className={styles.addButton} />
      </IconButton>
    </div>
  )
}

export default BlogHomePage
