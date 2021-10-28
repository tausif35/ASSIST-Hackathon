import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'

const useStyle = makeStyles({
  container: {
    border: '1px solid #d3cede',
    borderRadius: 10,
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: 350,
    '& > *': {
      padding: '0 5px 5px 5px'
    }
  },
  image: {
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
  },
  textColor: {
    color: '#878787',
    fontSize: 12
  },
  heading: {
    fontSize: 18,
    fontWeight: 600
  },
  detail: {
    fontSize: 14,
    wordBreak: 'break-word'
  }
})

const Post = ({ post }) => {
  console.log(post);
  const classes = useStyle();
  const url = post.picture ? post.picture : `http://localhost:8080/${post.photo}`;

  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '...' : str;
  }

  return (
    <Box className={classes.container}>
      <img src={url} alt="post" className={classes.image} />
      <Typography className={classes.textColor}>{post.category}</Typography>
      <Typography className={classes.heading}>{addEllipsis(post.title, 20)}</Typography>
      <Typography className={classes.textColor}>Author: {post.name}</Typography>
      <Typography className={classes.detail}>{addEllipsis(post.body, 100)}</Typography>
    </Box>
  )
}

export default Post;