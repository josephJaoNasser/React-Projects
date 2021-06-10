import React, { useState } from 'react'
import PropTypes from 'prop-types'

//context providers
import { useImageAttatchments, useUpdateImageAttatchments } from './AttatchmentsContext'

//materual ui
import { Photo, PhotoCamera } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button,
  IconButton,
  Avatar,
  Snackbar,
  Tooltip
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: '1em auto',
  },
  
}));

function isValidImage(file){
  const _validFileExtensions = ["gif","jpg", "webp", "jpeg", "png"];    
  
  var ext =  file.name.split('.').pop();
  if(_validFileExtensions.includes(ext.toLowerCase())){
    return true
  }
  else{
    return false
  }
} 

//Set and return images
function setImage(files){       
  let errorMsg = ''   
  
  //when uploading only 1 image
  if(files.length === 1){
    if(!isValidImage(files[0])){
      errorMsg = 'Not a valid image'
      return {
        error: errorMsg
      }
    }

    files[0].url = URL.createObjectURL(files[0]);  
    return {
      image: files[0]
    };
  }  
  else{
    //if multiple files are uploaded
    for (let i = 0; i < files.length; i++) {
      const image = files[i];
      if(!isValidImage(image)){
        errorMsg = 'Please upload valid images'
        return {
          error: errorMsg
        }
      }
      files[i].url = URL.createObjectURL(image)     
    }

    return{
      images: [...files]
    }
  }  
}

// Single Image uploader component  
export const SingleImageUploader = ({ onUpload,disabled, defaultUrl }) => {
  const [attatchedImage, setAttatchedImage] = useState({
    image: null
  })

  const [errors, setErrors] = useState({
    hasErrors: false,
    error: ''
  })
  const classes = useStyles()

  const resetErrors = () => {
    setErrors({
      hasErrors: false,
      error: ''
    }) 
  }

  const handleFileInput = (e) => {
    const imageData = setImage(e.target.files)  
    
    if(imageData.error){
      setErrors({
        hasErrors: true,
        error: imageData.error
      }) 
    }
    else{      
      resetErrors()
      setAttatchedImage({image: imageData.image})
    }
    
    if(onUpload)
      onUpload(imageData.image)
  }

  return (
    <>
      <Avatar src={attatchedImage.image ?  attatchedImage.image.url : defaultUrl} className={classes.large} />
      <input 
        accept="image" 
        className={classes.input} 
        id="icon-button-file" 
        type="file" 
        onChange = {handleFileInput}
      />
      <label htmlFor="icon-button-file">
        <Tooltip title='Add an image'>
          <Button 
            color="primary" 
            variant="outlined" 
            aria-label="upload picture" 
            component="span"
            disabled={disabled}
          >
            <PhotoCamera /> &nbsp;&nbsp; Upload
          </Button>
        </Tooltip>
      </label>
      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }} 
        open={errors.hasErrors} 
        onClose={resetErrors}
        autoHideDuration={6000}
      >
        <Alert onClose={resetErrors} severity="error">
          {errors.error}
        </Alert>
      </Snackbar>
    </>
  )
}


// Multi Image uploader component
export const MultiImageUploader = ({ onUpload, disabled }) => {  
  const attatchedImages = useImageAttatchments()
  const setAttatchedImages = useUpdateImageAttatchments()
  const classes = useStyles()

  const [errors, setErrors] = useState({
    hasErrors: false,
    error: ''
  })

  const resetErrors = () => {
    setErrors({
      hasErrors: false,
      error: ''
    }) 
  }

  const handleFileInput = (e) => {
    if(e.target.files.length + attatchedImages.images.length > 4){
      setErrors({
        hasErrors: true,
        error: 'Can only upload 4 images'
      }) 
      return
    }

    const imageData = setImage(e.target.files)
    if(imageData.error){
      setErrors({
        hasErrors: true,
        error: imageData.error
      }) 
      return
    }

    // NOTE imageData.image is used when only 1 photo is uploaded
    // imageData.imageS is used when multiple photos are uploaded
    
    setAttatchedImages({
      images: !imageData.image ?
        [...attatchedImages.images, ...imageData.images] 
        /*else*/: [...attatchedImages.images, imageData.image],
    })
    resetErrors()     

    if(onUpload)
      onUpload(!imageData.image ? imageData.images : imageData.image)
      
  }

  return (
    <>      
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple={ attatchedImages.images.length < 3 ? true : false}
        type="file"  
        onChange = { handleFileInput } 
        disabled= {disabled}
      />
      <label htmlFor="contained-button-file">
        <Tooltip title='Add an image'>
          <IconButton 
            color="primary" 
            aria-label="upload picture" 
            component="span"
            disabled={disabled}
          >
            <Photo /> 
          </IconButton>
        </Tooltip>
      </label>

      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }} 
        open={errors.hasErrors} 
        onClose={resetErrors}
        autoHideDuration={6000}
      >
        <Alert onClose={resetErrors} severity="error">
          {errors.error}
        </Alert>
      </Snackbar>
    </>
  )
}

SingleImageUploader.propTypes = MultiImageUploader.propTypes = {
  onUpload: PropTypes.func, 
  disabled: PropTypes.bool
}
