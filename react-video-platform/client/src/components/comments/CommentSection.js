import { lazy, Suspense } from 'react'
import { Typography, Container, CircularProgress } from '@material-ui/core'
import PostComment from './PostComment'

const CommentList = lazy(()=> import('./CommentList'))

const CommentSection = ({ post }) => { 
  return (
    <Container maxWidth='md'>
      <Typography variant='h6' align='left' gutterBottom>
        Comments
      </Typography>
      
      <PostComment post={post}/>

      <br/>
      <Suspense fallback={<CircularProgress/>}>
        <CommentList post={post}/>
      </Suspense>
    </Container>
  )
}


export default CommentSection

