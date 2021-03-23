import React from 'react'
import { Container }  from '@material-ui/core'

//components
import PostList from '../PostComponents/PostList'
import AddPost from '../PostComponents/AddPost';

//context providers
//import { PostContextProvider } from '../PostComponents/PostContextProvider'

const Home = () => {
  return (
    <div className="home-main-container">
      <Container maxWidth="md">
        <AddPost/>          
        <div className="post-list">
          <PostList />
        </div>  
      </Container>
      
    </div>
  )
}

export default Home
