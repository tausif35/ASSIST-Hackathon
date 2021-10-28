import { Box, Typography, Divider, Card, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState, useEffect, useRef } from 'react';
import axios from '../../../Helper/axios'
import Topbar from '../../../Components/topbar/Topbar';
import styles from './BlogPost.module.css';



const BlogPost = (props) => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [name, setName] = useState("")
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const [blogId, setBlogId] = useState("")
  useEffect(() => {
    axios.get(`/api/blogs/${props.match.params.id}`)
      .then(res => {
        const response = res.data.data.blog
        setBlogId(response.id)
        setTitle(response.title)
        setName(response.name)
        setDescription(response.body)
        setImage(response.photo)
        setComments(response.comments)
      });
  }, [])

  const commentInputHandler = (event) => {
    setComment(event.target.value)
  }

  const makeComment = () => {
    const body = {
      comment
    }
    if (comment.trim() !== "") {
      axios.post(`/api/comments/${blogId}`, body)
        .then(res => {
          setComment("")
          setComments(prev => [...prev, res.data.data.newComment])
        }).catch(err => {
          console.log(err);
        })
    }
  }

  const url = `http://localhost:8080/${image}`;


  return (
    <div className={styles.mainBlogPostDiv}>
      <Topbar list={[{ link: "groupChat", base: "Group Chat" }, { link: "questions", base: "Q&A" }, { link: "blogs", base: "Blogs" }, { link: "findProfessionals", base: "Find Professionals" }]} />
      <Box className={styles.container}>
        <img src={url} alt="post" className={styles.image} />
        <div className={styles.titleDiv}>
          <Typography className={styles.heading}>{title}</Typography>
          <Typography className={styles.textColor}>Author: {name}</Typography>
        </div>
        <Typography className={styles.detail}>{description}</Typography>
        <Divider />
        <div className={styles.comments}>
          <Typography className={styles.commentHeading}>Comments:</Typography>
          {comments.map(comment => {
            return (
              <Card className={styles.questionCard}>
                <p className={styles.comment}>{comment.name}: {comment.comment}</p>
              </Card>
            )
          })}


          <div className={styles.commentBox}>
            <TextField value={comment} onChange={(event) => { commentInputHandler(event) }} id="outlined-textarea" label="Write A Comment" variant="outlined" multiline className={styles.commentField} />
            <Button
              onClick={() => makeComment()}
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