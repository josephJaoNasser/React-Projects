import { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchComments } from '../../actions/commentActions'
import { List } from '@material-ui/core'
import CommentItem from './ComentItem'

export const CommentList = ({ post, comments, fetchComments}) => {

  useEffect(() => {
    const getComments = async () => await fetchComments(post)
    getComments()
    
  }, [fetchComments, post])

  return (
    <List>
      { comments?.length ?
          comments.map(comment => (
            <CommentItem comment={comment} key={comment._id}/>
          ))
        : <i>No comments yet...</i>
      }
    </List>
  )
}

const mapStateToProps = (state) => ({
  comments: state.comments.comments
})

export default connect(mapStateToProps, { fetchComments })(CommentList)
