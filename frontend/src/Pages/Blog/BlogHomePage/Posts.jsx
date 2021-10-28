import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import axios from '../../../Helper/axios'
import Post from '../../../Components/BlogPosts/Post'

const Posts = () => {
  const [posts, setPosts] = useState([]);


  return (
    <>
      {
        <Grid item lg={3} sm={4} xs={12}>
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/blogs/post/${1}`}>
          <Post/>
        </Link>
      </Grid>
      }
    </>
  )
}

export default Posts;