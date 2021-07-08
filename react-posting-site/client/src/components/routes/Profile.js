import { lazy, Suspense, useState, useMemo } from 'react'
import axios from 'axios'

//react router
import { useParams, Redirect } from 'react-router-dom'

//material ui
import {
  Container,
  CircularProgress,
  Divider
} from '@material-ui/core'


//redux
import { connect } from 'react-redux'

//context
import { ImageAttatchmentsContext } from '../AttatchmentsContext'

//components
const PostList = lazy(()=> import('../PostComponents/PostList'))
const AddPost = lazy(()=> import('../PostComponents/AddPost'))
const UserProfileCard = lazy(()=> import('../UserProfileCard'))

export const Profile = ({currentUser}) => {
  const params = useParams()
  const [user, setUser] = useState({})  
  const url = `/v1/users/?username=${params.username}`
  useMemo(() => {
    setUser({})
    getUser(url).then(data => setUser(data))
  }, [url])

  if(!user){
    return(<Redirect to='*'/>)
  }
   
  return (
    <Container maxWidth='md'>      
      <UserProfileCard user={user} loggedInUser={currentUser}/>
      {
        currentUser?.uname === params.username ?
        <ImageAttatchmentsContext>
          <AddPost/> 
        </ImageAttatchmentsContext> : <></>
      }

      <Divider style={{marginTop: '1em', height: '1em'}}/>   
      <Suspense
        fallback={<CircularProgress/>}
      >
        <PostList username={params.username}/>
      </Suspense> 
    </Container>
  )
}

const getUser = (url) => {  
  return axios.get(url).then(res => {
    return res.data.user
  })
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.user
})

export default connect(mapStateToProps, null)(Profile)
