import React from 'react'
import PropTypes from 'prop-types'

//redux store
import { connect } from 'react-redux'

//context
import { useImageAttatchments } from '../AttatchmentsContext'
import { MultiImageUploader } from '../ImageUploader'

//material UI
import { Button, CircularProgress } from '@material-ui/core'

const PostActionsComponent = ({ onPostSubmit,isSendingPost }) => {
  const attatchedImages = useImageAttatchments()

  return (
    <div className='post-actions' style={{display:'flex', justifyContent:'space-between'}}>
      <div className='post-attatchments-actions'>    
        <MultiImageUploader disabled={isSendingPost}/>         
      </div>        
      <Button
        variant="contained"
        color="primary"
        onClick={ () => onPostSubmit(attatchedImages) }
        style={{alignSelf:'flex-end'}}
        disabled={isSendingPost}
      >
        {
          isSendingPost ? 
            <CircularProgress 
              color='inherit'
              size={24}
            /> 
          : 'Post'
        }
      </Button>
    </div>
  )
}

PostActionsComponent.propTypes = {
  onPostSubmit: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isSendingPost: state.posts.isSendingPost
})

export default connect(mapStateToProps, null)(PostActionsComponent)
