import React, { Suspense, lazy, useEffect } from 'react'

//material UI
import { Container,
  CircularProgress,
}  from '@material-ui/core'

//redux
import store from '../../store/Store'
import { loadUser } from '../../actions/authActions'

//components
import Header from '../Header'
const PostList = lazy(()=> import('../PostComponents/PostList'))
const AddPost = lazy(()=> import('../PostComponents/AddPost')) 
const Sidebar = lazy(()=> import('../Sidebar')) 

//component main
const Home = () => {  
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <div className="home-main-container">
      <Header title='Home'/>
      <Sidebar 
        user={store.getState().auth.user}
      />
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
