import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'
import Blog from './Blog.png'
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
  const str="orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  console.log(post);
  const classes = useStyle();

  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '...' : str;
  }

  return (
    <Box className={classes.container}>
      <img src={Blog} alt="post" className={classes.image} />
      <Typography className={classes.heading}>{addEllipsis("About Mental Health", 20)}</Typography>
      <Typography className={classes.textColor}>Author: Dr. Mohit Kamal</Typography>
      <Typography className={classes.detail}>{addEllipsis(str, 100)}</Typography>
    </Box>
  )
}

export default Post;