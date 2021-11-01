import React, { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, FormControl, InputBase } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { makeStyles } from '@mui/styles'
import { useHistory, useLocation } from 'react-router-dom';
import styles from './CreateBlog.module.css'
import Topbar from '../../../Components/topbar/Topbar';
import axios from '../../../Helper/axios'



const useStyle = makeStyles(() => ({
  container: {
    margin: '50px 100px',

  },
  image: {
    background: '#EFF5E9',
    width: '100%',
    height: '60vh',
    objectFit: 'contain',
  },

  textarea: {
    width: '100%',
    border: 'none',
    marginTop: 30,
    fontSize: 18,
    '&:focus-visible': {
      outline: 'none'
    }
  }
}));

const initialPost = {
  title: '',
  description: '',
  picture: '',
  username: '',
  categories: '',
  createdDate: new Date()
}

const CreatePost = () => {
  const classes = useStyle();
  const history = useHistory();
  const location = useLocation();
  const [file, setFiles] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [post, setPost] = useState(initialPost);
  const [imageURL, setImageURL] = useState('http://localhost:8080/blogDefault.png');


  const fileChangeHandler = (event) => {
    const fil = event.target.files[0]
    setFiles(fil)
    var binaryData = [];
    binaryData.push(fil);
    setImageURL(window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" })))
  }
  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }





  const handleDescChange = (e) => {
    setDesc(e.target.value)
  }

  const savePost = () => {
    const body = new FormData()
    body.append("file", '')
    body.append("title", title)
    body.append("body", desc)
    axios.post("/api/blogs", body)
      .then(res => {
        console.log(res);
        history.push("/blogs")
      }).catch(err => {
        console.log(err);
      })
  }

  return (
    <div className={styles.mainDiv}>
      <Topbar list={[{ link: "groupChat", base: "Group Chat" }, { link: "questions", base: "Q&A" }, { link: "blogs", base: "Blogs" }, { link: "findProfessionals", base: "Find Professionals" }]} />
      <Box className={classes.container}>
        <img src={imageURL} alt="post" className={classes.image} />
        <div className={styles.baseInfo}>
          <FormControl className={styles.title}>

            <InputBase
              onChange={(e) => handleTitleChange(e)}
              name='title' placeholder="Title" className={styles.textfield} />

            <label htmlFor="fileInput">
              {/* <Add className={classes.addIcon} fontSize="large" color="action" /> */}
              <AddPhotoAlternateIcon className={styles.addIcon} fontSize="large" color="action"></AddPhotoAlternateIcon>
            </label>
            <input
              type="file"
              onChange={(event) => { fileChangeHandler(event) }}
              id="fileInput"
              style={{ display: "none" }}
            // onChange={(e) => setFile(e.target.files[0])}
            />

          </FormControl>
        </div>
        <hr />
        <TextareaAutosize
          rowsMin={5}
          placeholder="Tell your story..."
          className={classes.textarea}
          name='description'
          onChange={(e) => handleDescChange(e)}
        />

      </Box>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '20px' }}>
        <Button
          onClick={() => savePost()}
          variant="contained" style={{ background: '#86D382', padding: '10px 30px 10px 30px' }}>
          Publish</Button>
      </div>
      <Button onclick={() => savePost()}> asfjh</Button>
    </div>
  )
}

export default CreatePost;