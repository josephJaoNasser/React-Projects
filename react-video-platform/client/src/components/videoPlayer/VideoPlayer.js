import { useEffect, useRef, useState, createContext, forwardRef } from 'react'
import ReactPlayer from 'react-player'
import PlayerBottomControls from './PlayerBottomControls'
import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core/styles'
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon
} from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core'

export const VideoContext = createContext()

const useStyles = makeStyles(theme => ({
  componentContainer: {
    padding: 0
  },
  playerWrapper:{
    width: '100%',
    backgroundColor: 'black',
    position: 'relative',
    paddingTop:'56.25%'
  },
  reactPlayer:{
    position:'absolute',
    top:0,
    left: 0
  },
  controlsWrapper: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',    
    "&:hover":{
      opacity: 1,
      transition: theme.transitions.create(['opacity'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })
    }
  },
  controlsHidden: {
    opacity: 0,
    transition: theme.transitions.create(['opacity'], {
      delay: 300,
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  controlsShow: {
    opacity: 1,
    transition: theme.transitions.create(['opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  middleControlsWrapper: {
    position: 'absolute',
    cursor:'pointer',
    height:'100%',
    width:'100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',    
  },
  bottomControlsWrapper: {
    background: 'linear-gradient(0deg, rgba(0,0,0,0.6460959383753502) 18%, rgba(0,0,0,0.46682422969187676) 47%, rgba(0,0,0,0) 91%)'
  },
  bufferAnimationContainer: {
    position: 'absolute',
    top: 0,
    height:'100%',
    width:'100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1
  }
}))

const mergeRefs = (...refs) => {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 0) return filteredRefs[0];
  return inst => {
    for (const ref of filteredRefs) {
      if (typeof ref === 'function') {
        ref(inst);
      } else if (ref) {
        ref.current = inst;
      }
    }
  };
};

/*******************************************
 *           COMPONENT MAIN
 ******************************************/
const VideoPlayer = ({ 
  src = '', 
  isPreview = false, 
  playByDefault = false, 
  muteByDefault = false,
  noControls = false,
  maxWidth = 'md',
  thumbnail
}, ref) => {

  const [showControls, setShowControls] = useState(!noControls)
  const [isBuffering, setIsBuffering] = useState(true)
  const [videoState, setVideoState] = useState({
    isPlaying: playByDefault,
    isMuted: muteByDefault,
    isSeeking: false,
    willLoop: true,
    loaded: 0,
    currentTime: 0,
    duration: 0,
  })  

  const player = useRef()
  const classes = useStyles()

  useEffect(()=>{
    return () => {
      setVideoState(videoState => ({
        ...videoState,
        isPlaying: false,
        isSeeking: false,
        willLoop: true,
        currentTime: 0,
        duration: 0,
      }))
    }
  },[])

  //functions
  const setPlayerTheme = (theme) => {
    const videoPlayerTheme = createTheme({
      ...theme,
      palette: {
        primary: {...theme.palette.primary},
        type:'dark'
      }
    })
    return videoPlayerTheme
  }

  const togglePlayPause = () => {
    setVideoState(videoState => ({
        ...videoState,
        isPlaying: !videoState.isPlaying
      }
    ))
    setShowControls(videoState.isPlaying ? true : false)
  }

  const toggleMute = () => {
    setVideoState(videoState => ({
        ...videoState,
        isMuted: !videoState.isMuted
      }
    ))
  }

  const toggleAutoReplay = () => {
    setVideoState(videoState => ({
        ...videoState,
        willLoop: !videoState.willLoop
      }
    ))
  }
  
  const handleVideoReady = (e) => {
    setVideoState(videoState => ({
        ...videoState,
        duration: e.getDuration()
      })
    )

    if(!showControls)
      setShowControls(true)  

    setTimeout(()=> {
      setShowControls(false)      
    }, 4000)
  }

  const handleVideoEnd = () => {
    if(!videoState.willLoop){
      setVideoState(videoState => ({
        ...videoState,
        isPlaying: false
      }))
      setShowControls(true)
    }
  }
  
  const handleVideoProgress = (e) => {    
    if(!videoState.isSeeking){
      setVideoState(videoState => ({
        ...videoState,
        currentTime: e.playedSeconds,
        loaded: e.loadedSeconds
      }))
    }
  }

  const handleSeekChange = (e, newTime) => {    
    setVideoState(videoState => ({
      ...videoState,
      currentTime: newTime/1000      
    }))
    player.current.seekTo(newTime/1000)
  }

  const handleSeekMouseDown = () => {
    setVideoState(videoState => ({
      ...videoState,
      isSeeking: true,
    }))
  }

  const handleSeekMouseUp = () => {
    setVideoState(videoState => ({
      ...videoState,
      isSeeking: false,
    }))
  }

  const handleBufferStart = () => {
    setIsBuffering(true)
  }

  const handleBufferEnd = () => {
    setIsBuffering(false)
  }

  return (
    <ThemeProvider theme={ setPlayerTheme }>
      <div className={classes.playerWrapper} >    
        
        <div className={ classes.bufferAnimationContainer } style={{
          display: isBuffering && videoState.isPlaying ? 'flex' : 'none' 
        }}>
          <CircularProgress disableShrink/>
        </div> 

        <ReactPlayer  
          width="100%" 
          height="100%"
          className={classes.reactPlayer}
          url={src}
          muted={videoState.isMuted}
          playing={videoState.isPlaying}
          ref={mergeRefs(player, ref)}
          progressInterval={1}
          onReady={ handleVideoReady }         
          onProgress={ handleVideoProgress }
          onEnded={ handleVideoEnd }
          loop={videoState.willLoop}     
          onBuffer = { handleBufferStart }
          onBufferEnd={ handleBufferEnd }                             
        />
        
        {
          !noControls ?
          <VideoContext.Provider value={videoState}>
            <div className={classes.controlsWrapper +' '+ (showControls ? classes.controlsShow : classes.controlsHidden)}>         
              <div></div>
              <div className={classes.middleControlsWrapper + ' ' + (!videoState.isPlaying ? classes.controlsShow : classes.controlsHidden)} onClick={togglePlayPause} >
                { videoState.isPlaying ? <PauseIcon style={{fontSize: 60}}/> : <PlayIcon style={{fontSize: 60}}/> }
              </div>
              <div className={classes.bottomControlsWrapper}>
                <PlayerBottomControls                     
                  onMuteToggle={ toggleMute } 
                  onPlayPauseToggle={ togglePlayPause }
                  onAutoReplayToggle = { toggleAutoReplay  }
                  onSeek = { handleSeekChange }
                  onSeekMouseDown = { handleSeekMouseDown }
                  onSeekMouseUp = { handleSeekMouseUp }
                />
              </div>      
            </div>
          </VideoContext.Provider> : <></>
        }
      </div>
    </ThemeProvider>
  )
}


export default forwardRef(VideoPlayer)
