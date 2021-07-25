
import {
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Link as MuiLink
} from '@material-ui/core'
import ReactPlayer from 'react-player'

const VideoCard = () => {
  
  return (    
    <Card variant='outlined'>     
      <div style={{
        position: 'relative',
        paddingTop: '56.25%', 
        backgroundColor: 'black'
      }}
      >        
        <Chip 
          label='...' 
          size='small' 
          style={{
            position:'absolute',
            zIndex: 1,
            bottom: 10,
            right: 10,
          }}
        />    
        <ReactPlayer 
          url={''} 
          width='100%'
          height='100%'
          muted  
        />
      </div>
      
      <CardContent>          
        <CircularProgress/>
      </CardContent>
    </Card>
  )
}

export default VideoCard
