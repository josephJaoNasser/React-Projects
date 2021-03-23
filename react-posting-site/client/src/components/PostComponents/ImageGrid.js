import React from 'react'
import PropTypes from 'prop-types'
import {
  GridList,
  GridListTile
}from '@material-ui/core'

const url = "https://simple-posts-app.herokuapp.com/api/posts/"

const ImageGrid = ({ postid, images }) => {
  return (
    <GridList cellHeight={160} cols={2} rows={2}>
      {images.map((image,index) => (
        <GridListTile key={image} >
          <img src={`${url}${postid}/media/${image}?size=small`} alt={image.title} />
        </GridListTile>
      ))}
    </GridList>
  )
}

ImageGrid.propTypes = {
  id: PropTypes.string,
  images: PropTypes.array
}


export default ImageGrid
