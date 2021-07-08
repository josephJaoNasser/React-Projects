import { Suspense, lazy, useEffect } from 'react'

//material UI

//context providers
import { ImageAttatchmentsContext } from '../AttatchmentsContext'

//redux
import store from '../../store/Store'
import { loadUser } from '../../actions/authActions'


import { Container,
  CircularProgress,
  Divider
}  from '@material-ui/core'

//components
import Header from '../Header'
import PostList from '../PostComponents/PostList'
//const PostList = lazy(()=> import('../PostComponents/PostList'))
const AddPost = lazy(()=> import('../PostComponents/AddPost')) 


//component main
const Home = () => {  

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Container maxWidth="md">        
      <Header title='Home'/>
      <Suspense fallback={<CircularProgress/>}>
        <ImageAttatchmentsContext>
          <AddPost/> 
        </ImageAttatchmentsContext>
      </Suspense>
      <Divider style={{marginTop: '1em', height: '1em'}}/>
      <PostList />
    </Container>
      
  )
}


export default Home
