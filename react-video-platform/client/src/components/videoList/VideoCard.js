import { useState } from 'react'
import {
  Card,
  CardContent,
  Chip,
  Typography,
  Link as MuiLink
} from '@material-ui/core'
import ReactPlayer from 'react-player'

const VideoCard = ({ videoInfo }) => {
  const [previewPlaying, setPreviewPlaying] = useState(false)

  const getFormattedUploadDate = () => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(videoInfo.uploadedOn).toLocaleDateString("en-US", options)
  }

  const getFormattedDuration = () => {
    if(videoInfo.duration < 3600)
      return new Date(videoInfo.duration*1000).toISOString().substr(14,5)
    else
      return new Date(videoInfo.duration*1000).toISOString().substr(11,8)
  }


  return (    
    <Card variant='outlined'>     
      <div style={{
        position: 'relative',
        paddingTop: '56.25%', 
        backgroundColor: 'black'
      }}
      >        
        <Chip 
          label={ getFormattedDuration() } 
          size='small' 
          style={{
            position:'absolute',
            zIndex: 1,
            bottom: 10,
            right: 10,
          }}
        />    
        <ReactPlayer 
          url={videoInfo.url} 
          width='100%'
          height='100%'
          playing={previewPlaying}
          muted
          onMouseEnter={ () => {setPreviewPlaying(true)}}
          onMouseLeave={ () => {setPreviewPlaying(false)}}         
          style={{
            cursor: 'pointer', 
            position: 'absolute', 
            top: 0, 
            left:0 
          }}
        />
      </div>
      
      <CardContent>
        <MuiLink href={`/watch?video=${videoInfo.key}`}>            
          <Typography 
            variant='h6' 
            component='h2' 
            align='left' 
            gutterBottom 
            style={{cursor: 'pointer'}}
          >
            {videoInfo.title}
          </Typography>    
        </MuiLink>
        <Typography variant="body2" align='left' color="textSecondary" component="p">
          { getFormattedUploadDate() }
        </Typography>
      </CardContent>
    </Card>
  )
}

export default VideoCard
