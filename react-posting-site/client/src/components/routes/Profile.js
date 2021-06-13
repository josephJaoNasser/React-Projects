import React, { lazy, Suspense, useState, useEffect } from 'react'
import axios from 'axios'

//react router
import { useParams } from 'react-router-dom'

//material ui
import {
  Avatar,
  Container,
  CircularProgress,
  Divider,
  Card,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

//redux
import { connect } from 'react-redux'

//context
import { ImageAttatchmentsContext } from '../AttatchmentsContext'

//components
const PostList = lazy(()=> import('../PostComponents/PostList'))
const AddPost = lazy(()=> import('../PostComponents/AddPost'))

//material ui styling
const useStyles = makeStyles(theme=> ({
  avatar:{
    width: theme.spacing(15),
    height: theme.spacing(15)
  },
  userInfoContainer: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    borderRadius: 20,
    display: 'flex'
  }
}))

export const Profile = ({currentUser}) => {
  const params = useParams()
  const [user, setUser] = useState({})
  const classes = useStyles()
  const url = `/v1/users/?username=${params.username}`
  const profilImageUrl = user.profile_image ? `/v1/users/${user._id}/profile-image/${user.profile_image}?size=medium` : ''
  
  useEffect(() => {
    axios.get(url)
      .then(res => {
        setUser(res.data.user)
      })
  }, [params, url])  
 
  return (
    <Container maxWidth='md'>
      <Card 
        className={classes.userInfoContainer}
        elevation={3}
      >
        <Suspense
          fallback={<CircularProgress/>}
        >
          <Avatar 
            src={profilImageUrl} 
            alt='profile image'
            className={classes.avatar}
          />
          <Typography variant='h4' style={{flexGrow: 1}}>
            <strong>{user.dname}</strong>
          </Typography>
        </Suspense>
      </Card>
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


const mapStateToProps = (state) => ({
  currentUser: state.auth.user
})

export default connect(mapStateToProps, null)(Profile)
