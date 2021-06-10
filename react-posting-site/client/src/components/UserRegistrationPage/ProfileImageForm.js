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
  const [profileImage, setProfileImage] = useState(userInfo?.profileImage?.url ?? {url: ''})

  function onImageUpload(image){
    setProfileImage(image)
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
          onUpload={ onImageUpload }
          defaultUrl={profileImage.url}
        />
        <br/><br/>
        <StepperControls 
          checkIfCanProceed={
            ()=> profileImage ? true : false
          }
          onNext = {()=>
            {
              setUserInfo((userInfo) => ({
                  ...userInfo,
                  profile_image: profileImage
                }))
            }
          }
        />
      </CardContent>        
    </Card>       
  )
}

export default ProfileImageForm
