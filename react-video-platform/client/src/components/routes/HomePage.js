import { lazy, Suspense } from 'react'
import { Container, CircularProgress } from '@material-ui/core'

const VideoList = lazy(()=> import('../videoList/VideoList'))

const HomePage = () => {
  return (
    <Container maxWidth='lg'>
      <Suspense fallback={<CircularProgress/>}>
        <VideoList headerText='Videos'/>
      </Suspense>
    </Container>
  )
}

export default HomePage
