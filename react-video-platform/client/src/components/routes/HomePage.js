import { lazy, Suspense } from 'react'
import { Container } from '@material-ui/core'

const VideoList = lazy(()=> import('../videoList/VideoList'))

const HomePage = () => {
  return (
    <Container maxWidth='lg'>
      <Suspense fallback={<div>Loading Videos...</div>}>
        <VideoList/>
      </Suspense>
    </Container>
  )
}

export default HomePage
