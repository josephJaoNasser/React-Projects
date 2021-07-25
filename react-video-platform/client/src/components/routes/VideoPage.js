import { useEffect, useState, Suspense, lazy } from 'react'
import { useLocation } from 'react-router-dom'
import VideoPlayer from '../videoPlayer/VideoPlayer'
import VideoInfoContainer from '../videoPage/VideoInfoContainer'
import CommentSection from '../comments/CommentSection'
import { 
  CircularProgress,
  Container,
} from '@material-ui/core'
import axios from 'axios'

const VideoList = lazy(()=>import('../videoList/VideoList'))

const VideoPage = () => {
  const videoKey = new URLSearchParams(useLocation().search).get('video')
  const [video,setVideo] = useState({})

  useEffect(() => {
    const fetchVideo = () => {
      axios.get(`/api/videos/?key=${videoKey}`).then(res => {
        
        setVideo(res.data[0])
      })
    }

    fetchVideo()
    return () => {
      setVideo({})
    }
  }, [videoKey])

  return (
    <Container maxWidth='lg'>
      <div>
        <VideoPlayer
          src={video.url}
          playByDefault={true}
          muteByDefault={true}
        />
        <br/>
        <VideoInfoContainer videoInfo={video}/>
        <br/>
        <CommentSection post={video._id}/>
      </div>
      <Suspense fallback={<CircularProgress/>}>
        <VideoList headerText='More Videos'/>
      </Suspense>
    </Container>
  )
}

export default VideoPage
