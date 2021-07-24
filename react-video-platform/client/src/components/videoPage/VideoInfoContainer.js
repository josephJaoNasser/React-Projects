//import React from 'react'
import { Typography, Divider } from '@material-ui/core'

const VideoInfoContainer = ({ videoInfo }) => {
  const getFormattedUploadDate = () => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(videoInfo.uploadedOn).toLocaleDateString("en-US", options)
  }

  return (
    <>
      <Typography 
        align='left' 
        component='h3'
        variant='h5'          
      >
        { videoInfo.title }
      </Typography>
      <Typography 
        variant="caption" 
        align='left' 
        color="textSecondary"
        component='p'
        gutterBottom 
      >
        { getFormattedUploadDate() }
      </Typography>
      <br/>
      <Typography 
        variant="body2" 
        align='left' 
        color="textSecondary"
        component='p'
        gutterBottom 
      >
        { videoInfo.description }
      </Typography>
      <br/>
      <Divider/>
    </>
  )
}

export default VideoInfoContainer
