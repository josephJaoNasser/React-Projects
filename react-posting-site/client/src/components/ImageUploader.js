import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { PhotoCamera } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button,
  Avatar
} from '@material-ui/core';


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

//Validate and set images
function setImage(files){         
  let attatchments = []
  let url = []   
  let errorMsg = ''   
  const _validFileExtensions = ["gif","jpg", "webp", "jpeg", "png"];    
  
  //if only one file is uploaded
  if(files.length === 1){
    var ext =  files[0].name.split('.').pop();
    if(_validFileExtensions.includes(ext.toLowerCase())){
      url.push(URL.createObjectURL(files[0]));  
      attatchments = attatchments.concat(Array.from(files))
      return {
        url,
        attatchments
      };
    }
    else{
      errorMsg = 'Invalid file type'
    }
  }
  
  //if multiple files are uploaded
  if((files.length + url.length) <= 4 && (files.length + url.length) > 1){    
    files.forEach((item) => {
      var ext =  item.name.split('.').pop();         
      if(_validFileExtensions.includes(ext.toLowerCase())){
        url.push(URL.createObjectURL(item));    
      }
      else{
        url = []
        errorMsg = 'The file you uploaded is not supported...'
      }     
    });

    if(!errorMsg){
      errorMsg = ''
      attatchments = attatchments.concat(Array.from(files))
      return {
        url,
        attatchments
      };
    }
    
  }
  else if((files.length + url.length) > 4){
    errorMsg = 'Only up to 4 images are allowed'    
  }                      
}


// Single Image uploader component  
export const SingleImageUploader = ({ onUpload, defaultUrl }) => {
  const [attatchedImage, setAttatchedImage] = useState()
  const classes = useStyles()
  const handleFileInput = (e) => {
    const imageData = setImage(e.target.files)
    setAttatchedImage(...imageData.url)
    
    if(onUpload)
      onUpload(imageData)
  }

  return (
    <>
      <Avatar src={attatchedImage ?  attatchedImage : defaultUrl} className={classes.large} />
      <input 
        accept="image" 
        className={classes.input} 
        id="icon-button-file" 
        type="file" 
        onChange = {handleFileInput}
      />
      <label htmlFor="icon-button-file">
        <Button 
          color="primary" 
          variant="outlined" 
          aria-label="upload picture" 
          component="span"
        >
          <PhotoCamera /> &nbsp;&nbsp; Upload
        </Button>
      </label>
    </>
  )
}


// Multi Image uploader component
//=========================================
// THIS IS NOT READY YET !!!!!!!!!

export const MultiImageUploader = ({ onUpload }) => {
  const classes = useStyles()
  return (
    <>      
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"   
      />
      <label htmlFor="contained-button-file">
        <Button color="primary" aria-label="upload picture" component="span">
          <PhotoCamera /> Upload
        </Button>
      </label>
    </>
  )
}

SingleImageUploader.propTypes = MultiImageUploader.propTypes = {
  onUpload: PropTypes.func 
}