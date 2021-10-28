import { Box, Typography, Divider, Card, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState, useEffect, useRef } from 'react';
import axios from '../../../Helper/axios'
import Topbar from '../../../Components/topbar/Topbar';
import styles from './BlogPost.module.css';
import url from './Blog.png'


const BlogPost = (props) => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [name, setName] = useState("")


  return (
    <div className={styles.mainBlogPostDiv}>
      <Topbar list={[{link:"groupChat",base:"Group Chat"}, {link:"questions", base:"Q&A"}, {link:"blogs",base:"Blogs"}, {link:"findProfessionals", base:"Find Professionals"}]} />
      <Box className={styles.container}>
        <img src={url} alt="post" className={styles.image} />
        <div className={styles.titleDiv}>
          <Typography className={styles.heading}>A blog about mental health</Typography>
          <Typography className={styles.textColor}>Author: Dr Mohit Kamal</Typography>
        </div>
        <Typography className={styles.detail}>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
        <Divider />
        <div className={styles.comments}>
          <Typography className={styles.commentHeading}>Comments:</Typography>
          <Card className={styles.questionCard}>
            <p className={styles.comment}>This is a very nice blog</p>
          </Card>
          <Card className={styles.questionCard}>
            <p className={styles.comment}>Well written</p>
          </Card>

          <div className={styles.commentBox}>
            <TextField id="outlined-textarea" label="Write A Comment" variant="outlined" multiline className={styles.commentField} />
            <Button
              // onClick={() => savePost()} 
              variant="contained" style={{
                background: '#86D382', marginLeft: '10px',
                padding: '5px 10px 5px 10px',
                maxHeight: '50px'
              }}>
              Comment</Button>
          </div>

        </div>

      </Box>
    </div>
  )
}

export default BlogPost;