import {useContext, useState, useEffect, createContext} from 'react'
import axios from 'axios';

const PostContext = createContext()
const SetPostFunction = createContext()

//hooks
export function usePost(){
  return useContext(PostContext)
}

export function useSetPosts(){
  return useContext(SetPostFunction)
}

//main
export function PostContextProvider({ children }) {
  const url = "https://simple-posts-app.herokuapp.com/api/posts/"

  //state
  const [posts, setPosts] = useState([])
  
  useEffect(()=> {    
    const getPosts = async() => {
      const postsFromServer = await fetchPosts()
      setPosts(postsFromServer)
    }

    getPosts()

  }, [])
  
  //functions
  const fetchPosts = async()=>{
    const res = await axios.get(url)
    return res.data;
  }  

  return (
    <PostContext.Provider value={posts}>
      <SetPostFunction.Provider value={setPosts}>
        {children}   
      </SetPostFunction.Provider>      
    </PostContext.Provider>
  )
}
