import React from 'react'
import PropTypes from 'prop-types'
import {
  GridList,
  GridListTile
}from '@material-ui/core'

const ImageGrid = ({ postid, images }) => {
  const url = 'v1/posts/'
  return (
    // <div style={styles}>
    //   {images.map((image,index) => (
    //     <div key={image} >
    //       <img src={`${url}${postid}/media/${image}?size=small`} alt={image.title} />
    //     </div>
    //   ))}
    // </div>
    <GridList cols={2} rows={2}>
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

// const styles = {
//   display: 'grid',
//   gridTemplateRows: '1fr 1fr',
//   gridTemplateColumns: '1fr 1fr',
//   maxWidth: '100px'
// }

export default ImageGrid
