import { useEffect, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { fetchComments } from '../../actions/commentActions'
import { List } from '@material-ui/core'

const CommentItem = lazy(()=>import('./ComentItem'))

/**************
 *  COMPONENT MAIN
 **************/
const CommentList = ({ post, comments, fetchComments}) => {

  useEffect(() => {
    const getComments = async () => await fetchComments(post)
    getComments()

    return () => {
      
    }
  }, [fetchComments, post])

  return (
    <List>
      { comments?.length ?
          comments.map(comment => (
            <Suspense fallback={'...'} key={comment._id}>
              <CommentItem comment={comment} key={comment._id}/>
            </Suspense>
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
