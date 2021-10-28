import React from 'react'
import Topbar from '../../../Components/topbar/Topbar'
import styles from './BlogHomePage.module.css'
import blogBanner from './Blog.png'
import { Grid, Paper, InputBase, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Posts from './Posts'
import { useHistory } from "react-router-dom"

const BlogHomePage = () => {
  let history = useHistory()
  const writeBlogHandler = () => {
    history.push('/blogs/new')
  }
  return (
    <div className={styles.mainDiv}>
      <Topbar list={[{link:"groupChat",base:"Group Chat"}, {link:"questions", base:"Q&A"}, {link:"blogs",base:"Blogs"}, {link:"findProfessionals", base:"Find Professionals"}]} />
      <div className={styles.banner}>
        <img className={styles.bannerImg} src={blogBanner} alt="" srcset="" />
      </div>
      <div className={styles.blogSearchDiv}>
        {/* <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        > */}
        <InputBase className={styles.blogSearchBar}
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
        <Posts />
      </div>
      <IconButton onClick={writeBlogHandler} className={styles.addBlogButton} type="submit" sx={{ p: '10px' }} aria-label="Create">
        <AddCircleOutlinedIcon className={styles.addButton} />
      </IconButton>
    </div>
  )
}

export default BlogHomePage
