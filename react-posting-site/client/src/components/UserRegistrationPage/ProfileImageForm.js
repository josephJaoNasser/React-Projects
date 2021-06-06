import React, { useState, useContext } from 'react'
import { UserInfoState } from '../routes/Register'
import StepperControls from './StepperControls'
import { SingleImageUploader as ImageUploader } from '../ImageUploader'

//material ui
import { makeStyles } from '@material-ui/core/styles';
import {  
  Card,
  CardContent,  
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
  root: {
    width: "80%",
    margin: "1em auto",
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    }
  },
  instructions: {
    fontWeight: 'bold',
    margin: "10px auto "
  }
}));

//component main
const ProfileImageForm = () => {  
  const {userInfo, setUserInfo} = useContext(UserInfoState)
  const [profileImage, setProfileImage] = useState({
    image: userInfo.profile_image,
    url: userInfo.profile_image_url
  })

  function onImageUpload(image){
    setProfileImage({
      url: image.url[0],
      image: image.attatchments
    })
  }
  
  const classes = useStyles()
  return (
    <Card 
      className={classes.root}
      elevation={3}
      variant="outlined"
    >
      <CardContent>
        <Typography 
          variant="h5"
          className={classes.instructions}
        >
          What do you look like?
        </Typography>    
        <ImageUploader 
          onUpload={(image)=>{onImageUpload(image)}}
          defaultUrl={profileImage.url}
        />
        <br/><br/>
        <StepperControls 
          checkIfCanProceed={
            ()=> profileImage.image ? true : false
          }
          onNext = {()=>
            {
              setUserInfo((userInfo) => ({
                  ...userInfo,
                  profile_image: profileImage.image,
                  profile_image_url: profileImage.url
                }))
            }
          }
        />
      </CardContent>        
    </Card>       
  )
}

export default ProfileImageForm
