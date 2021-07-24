import { useEffect, lazy, Suspense } from 'react'
import { fetchVideos } from '../../actions/videoActions'
import { connect } from 'react-redux'

import {
  Container,
  Grid,
  Typography,
} from '@material-ui/core'

const VideoCard = lazy(()=>import('./VideoCard'))

/********************************
 *       COMPONENT MAIN
 *********************************/
const VideoList = (props) => {
  const{
    videos,
    fetchVideos
  } = props

  useEffect(() => {
    const getVideos = async () => {
      await fetchVideos()
    }

    getVideos()
  }, [fetchVideos])
  

  return (
    <Container>
      <Typography 
        variant='h4' 
        align='left' 
        gutterBottom
      > 
        Videos
      </Typography>
      
      <Grid container spacing={3}>
        {
          videos.map(videoData => 
            <Grid item key={videoData['_id']} xs={12} sm={6} md={4} >
              <Suspense fallback={'loading video...'}>
                <VideoCard videoInfo={videoData}/>
              </Suspense>
            </Grid>  
          )
        }
        
      </Grid>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  videos: state.videos.videos
})

export default connect(mapStateToProps, { fetchVideos })(VideoList)
