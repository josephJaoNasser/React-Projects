import React from 'react'
import PropTypes from 'prop-types'

const url = "https://simple-posts-app.herokuapp.com/api/posts/"

const ImageGrid = ({ postid, images }) => {
  return (
    <div className="image-grid">
      {
        images.map( (image,index) => (
          <img 
            key={index}
            src={`${url}${postid}/media/${image}?size=small`} 
            alt=''
          />
        ))
      }
    </div>
  )
}

ImageGrid.propTypes = {
  id: PropTypes.string,
  images: PropTypes.array
}


export default ImageGrid
