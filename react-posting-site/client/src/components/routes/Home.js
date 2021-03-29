import React, { Suspense, lazy } from 'react'
import { Container }  from '@material-ui/core'
import { CircularProgress } from '@material-ui/core';

//components
const PostList = lazy(()=> import('../PostComponents/PostList'))
const AddPost = lazy(()=> import('../PostComponents/AddPost')) 

const Home = () => {
  return (
    <div className="home-main-container">
      <Container maxWidth="md">
        <Suspense fallback={<CircularProgress/>}>
          <AddPost/>            
          <PostList />
        </Suspense>
      </Container>
      
    </div>
  )
}

export default Home
