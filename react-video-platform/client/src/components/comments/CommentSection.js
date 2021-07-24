import CommentList from './CommentList'
import { Typography } from '@material-ui/core'
import PostComment from './PostComment'

const CommentSection = ({ post }) => { 
  return (
    <div>
      <Typography variant='h6' align='left' gutterBottom>
        Comments
      </Typography>
      
      <PostComment post={post}/>

      <br/>
      <CommentList post={post}/>
    </div>
  )
}


export default CommentSection

