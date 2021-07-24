import { useState, useRef } from 'react'
import { io } from 'socket.io-client'
import axios from 'axios'
import VideoPlayer from './videoPlayer/VideoPlayer'
import LinearProgressWithLabel from './LinearProgressWithLabel'

//material ui imports
import{
  Button,
  IconButton, 
  Container,
  Typography,
  CircularProgress
} from '@material-ui/core'
import{
  Publish as PublishIcon
} from '@material-ui/icons'

const socket = io("http://localhost:3002") 

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/*****************
 *  COMPONENT MAIN
 ******************/
const FileUploader = () => {
  const [socketId, setSocketId] = useState(null)
  const [files, setFiles] = useState(null)
  const [uploadStatus, setUploadStatus] = useState({
    isUploading: false,
    isCancelPending: false,
    status: '',
    errors: null,
    progress: 0,
    loaded: 0,
    ticket: null
  })
  const fileInput = useRef()
  const videoRef = useRef()

  socket.on('connect',()=>setSocketId(socket.id))

  //attatch file
  const handleFileAttach = (e) => { 
    if(e.target.files?.length){
      const files = [...e.target.files]
  
      for(let i = 0; i < files.length; i++){
        if(!files[i].type.match(/video\/\w*/)){
          console.error(files[i].name,'is not a valid video file')
          e.target.value = null
          return
        }
      }

      setUploadStatus(status => ({
        ...status,
        status: '',
        errors: null
      }))
  
      setFiles([...e.target.files])
    }
  }

  //file upload
  const handleFileUpload = () => {    
    const newVideo = {
      title: files[0].name,
      description: 
        'This is a sample description of the newly uploaded video',
      duration: videoRef.current.getDuration()
    }

    setUploadStatus(status => ({
      ...status,
      status: 'Uploading',
      isUploading: true,
      progress: 0
    }))
    
    const formData = new FormData()
    formData.append('clientSocketId', socketId)
    formData.append('videoDetails', JSON.stringify(newVideo))
    files.forEach(file => {
      formData.append('files', file)
    });
    
    //get upload information
    socket.on(`upload-started`, ticket => {      
      setUploadStatus(status => ({
        ...status,
        ticket: ticket
      }))      
      socket.on(`upload-progressed`, data => {
        if(data.Key === ticket.Key){
          setUploadStatus(status => ({
            ...status,
            progress: data.progress,
            loaded: data.loaded
          }))
    
          if(data.progress === 100){
            setUploadStatus(up => ({
              ...up,
              status: 'Finishing up...'
            }))
          }
        }
      })
      
    })   

    //send axios request
    axios.post('/api/upload/video', formData).then(res => {
      setUploadStatus(status => ({
        ...status,
        progress: 0,
        isUploading: false,
        status: res.data.msg,
        ticket: null
      }))
      setFiles(null)
      fileInput.current.value = null
    }).catch(err => {
      if(err){
        console.error(err)
        setUploadStatus(up => ({
          ...up,
          progress: 0,
          isUploading: false,
          status: err?.response?.data?.msg
        }))
      }
    })    
  }  

  //Cancel the upload
  const handleUploadCancel = () => {
    if(!uploadStatus.ticket){
      return
    }

    setUploadStatus(status => ({
      ...status,
      isCancelPending: true
    }))

    const cancelUrl = `/api/upload/video/cancel?Bucket=${uploadStatus.ticket.Bucket}&Key=${uploadStatus.ticket.Key}&UploadId=${uploadStatus.ticket.UploadId}`
    axios.post(cancelUrl).then(res => {
      socket.removeAllListeners(`upload-progressed`)      
      setUploadStatus(status => ({
        ...status,
        isUploading: false,
        isCancelPending: false,
        status: 'Upload cancelled',
        ticket: null
      }))
    }).catch(err => {
      console.error(err)
      setUploadStatus(up => ({
        ...up,
        status: err?.response?.data?.msg
      }))
    }) 
  }


  return (
    <Container maxWidth='md'>
      {
        (files && !uploadStatus.isUploading) ?
        <div className="video-preview" style={{marginBottom: '1em'}}>
          <h1>Preview</h1>
          <VideoPlayer 
            src={URL.createObjectURL(files[0])}
            isPreview={true} 
            ref={videoRef}
          />
          <br/>
          <Container>
            <Typography><b>File name:</b> {files[0].name}</Typography>
            <Typography><b>File Size:</b> {formatBytes(files[0].size)}</Typography>
          </Container>
        </div>
        :
        <></>
      }

      <div className='attach-action'>
        <input 
          type="file" 
          accept='video/*'
          id="attach-video"          
          ref={fileInput}
          onChange={handleFileAttach}
          multiple={false}
          style={{display: 'none'}}
        />
        <label htmlFor="attach-video">
          <IconButton color="primary" component='span'>
            <PublishIcon />
          </IconButton>
        </label>        
        <Button 
          variant='contained' 
          color="primary" 
          onClick={handleFileUpload} 
          disabled={uploadStatus.isUploading || !files?.length}          
          disableElevation
          >
          Upload
        </Button>
        <Button 
          color="primary" 
          onClick={ handleUploadCancel } 
          disabled={!uploadStatus.isUploading}        
          disableElevation
          >
          {uploadStatus.isCancelPending ? <CircularProgress size={20}/> : "Cancel"}
        </Button>
      </div>

      
      <br/>
      {
        uploadStatus.isUploading ?
        <LinearProgressWithLabel value={uploadStatus.progress}/>
        : <></>
      }

      <h4>
        {uploadStatus.status}
      </h4>

    </Container>
  )
}

export default FileUploader
