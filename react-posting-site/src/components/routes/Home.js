import React from 'react'

//components
import PostList from '../PostComponents/PostList'
import AddPost from '../PostComponents/AddPost';

//context providers
//import { PostContextProvider } from '../PostComponents/PostContextProvider'

const Home = () => {
  return (
    <div className="home-main-container">
      <AddPost/>          
      <div className="post-list">
        <PostList />
      </div>  
    </div>
  )
}

export default Home
