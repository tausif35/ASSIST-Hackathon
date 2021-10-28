import React from 'react';
import { Grid, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Post from '../../../Components/BlogPosts/Post'

const Posts = ({ posts }) => {


  return (
    <>
      {
        posts.length ? posts.map(post => (
          <Grid item lg={3} sm={4} xs={12}>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/blogs/post/${post._id}`}>
              <Post post={post} />
            </Link>
          </Grid>
        )) : <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
          No data is available for selected category
        </Box>
      }
    </>
  )
}

export default Posts;