import React, { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, FormControl, InputBase } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { makeStyles } from '@mui/styles'
import { useHistory, useLocation } from 'react-router-dom';
import styles from './CreateBlog.module.css'
import Topbar from '../../../Components/topbar/Topbar';
import { height } from '@mui/system';

// import { createPost, uploadFile } from '../../service/api';

const useStyle = makeStyles(() => ({
  container: {
    margin: '50px 100px',

  },
  image: {
    background: 'black',
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

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState('');
  const [imageURL, setImageURL] = useState('');
  // const { account, setAccount } = useContext(LoginContext);

  const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  // useEffect(() => {
  //   const getImage = async () => {
  //     if (file) {
  //       const data = new FormData();
  //       data.append("name", file.name);
  //       data.append("file", file);

  //       const image = await uploadFile(data);
  //       post.picture = image.data;
  //       setImageURL(image.data);
  //     }
  //   }
  //   getImage();
  //   post.categories = location.search?.split('=')[1] || 'All'
  //   post.username = account;
  // }, [file])

  // const savePost = async () => {
  //   await createPost(post);
  //   history.push('/');
  // }

  // const handleChange = (e) => {
  //   setPost({ ...post, [e.target.name]: e.target.value });
  // }

  return (
    <div className={styles.mainDiv}>
      <Topbar list={[{link:"groupChat",base:"Group Chat"}, {link:"questions", base:"Q&A"}, {link:"blogs",base:"Blogs"}, {link:"findProfessionals", base:"Find Professionals"}]} />
      <Box className={classes.container}>
        <img src={url} alt="post" className={classes.image} />
        <div className={styles.baseInfo}>
          <FormControl className={styles.title}>



            <InputBase
              // onChange={(e) => handleChange(e)}
              name='title' placeholder="Title" className={styles.textfield} />


            <label htmlFor="fileInput">
              {/* <Add className={classes.addIcon} fontSize="large" color="action" /> */}
              <AddPhotoAlternateIcon className={styles.addIcon} fontSize="large" color="action"></AddPhotoAlternateIcon>
            </label>
            <input
              type="file"
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
        // onChange={(e) => handleChange(e)}
        />

      </Box>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '20px' }}>
        <Button
          // onClick={() => savePost()} 
          variant="contained" style={{ background: '#86D382', padding: '10px 30px 10px 30px' }}>
          Publish</Button>
        <Button
          // onClick={() => savePost()} 
          variant="contained" style={{ background: '#86D382', padding: '10px 30px 10px 30px' }} >
          Anonymous</Button>
      </div>

    </div>
  )
}

export default CreatePost;