import React from 'react'
import PropTypes from 'prop-types'
import ImageGrid from './ImageGrid'

const PostItem = ({post, onDelete, onDoubleClick}) => {
  return (
    <div className={`post-item ${post.isGreen ? 'greenPost' : ''}`} 
        style={temporaryItemStyle} 
        onDoubleClick={() => onDoubleClick(post._id)}
    >

      <div className="post-body">
        <p className="post-text">{post.text}</p>

        {post.media ?  
          post.media.length ? 
            <ImageGrid postid={ post._id} images={ post.media}/>: null           
          : null
        }
      </div>
      
      <i className="fa fa-times" 
        style={{float: "right"}} 
        onClick={()=>onDelete(post._id)}></i>
      
    </div>
  )
}

//styles
const temporaryItemStyle = {
  padding: "1em",
  backgroundColor: "#eee",
  marginBottom: "5px"
}

//Define props
PostItem.defaultProps = {

}

PostItem.propTypes = {
  post: PropTypes.object
}

export default PostItem