import { useContext } from 'react'
import { VideoContext } from './VideoPlayer'
import PropTypes from 'prop-types'
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  Loop as LoopIcon
} from '@material-ui/icons'
import{
  IconButton,
  LinearProgress,
  Slider,
  Tooltip,
  Typography
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core'

const useStyles = makeStyles({
  bottomControls: {
    display: 'grid',
    gridTemplateRows: 'auto auto'
  },
  sliderContainer: {
    padding: '0 1.6em'
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: '0 1em'
  }
})

const VideoSeek = withStyles((theme) => ({
  track: {
    borderRadius: 4,
    height: 5
  },  
  rail: {    
    borderRadius: 4,
    height:5,
    color: 'rgba(255,255,255,0.3)'
  },
  thumb: {
    height: 20,
    width: 20,
    marginTop: '-7px',
    backgroundColor: '#fff',
    opacity: 0,
    "&:hover": {
      opacity: 1,
    },
    transition: theme.transitions.create(['opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },  
}))(Slider)

const BufferProgress = withStyles(theme => ({
  root: {
    borderRadius: 4,
    height: 5
  },
  bar: {
    borderRadius: 4,
    height:5,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  colorPrimary:{
    backgroundColor: 'rgba(0,0,0,0)'
  }
}))(LinearProgress)

/**********************************
*   value label component
*************************************/
const ValueLabelComponent = (props) => {
  const {
    open,
    value, 
    children
  } = props
  
  const videoState = useContext(VideoContext)
  const getSeekTime = () => {
    if(videoState.duration < 3600)
      return new Date(value).toISOString().substr(14,5)
    else
      return new Date(value).toISOString().substr(11,8)
  }

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={getSeekTime()}>
      {children}
    </Tooltip>
  )
}


/**********************************
*   COMPONENT MAIN
*************************************/
const PlayerControls = (props) => {
  
  const {
    onPlayPauseToggle, 
    onMuteToggle, 
    onAutoReplayToggle,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp
  } = props
  
  const {
    isPlaying,
    currentTime,
    loaded,
    duration,
    isMuted,
    willLoop
  } = useContext(VideoContext)


  const classes = useStyles()

  const getFormattedCurrentTime = () => {
    if(duration < 3600)
      return new Date(currentTime*1000).toISOString().substr(14,5)
    else
      return new Date(currentTime*1000).toISOString().substr(11,8)
  }

  const getFormattedDuration = () => {
    if(duration < 3600)
      return new Date(duration*1000).toISOString().substr(14,5)
    else
      return new Date(duration*1000).toISOString().substr(11,8)
  }

  return (
    <div className={classes.bottomControls}>
      <div className={classes.sliderContainer}>
        <div style={{transform: 'translateY(364%)'}}>
          <BufferProgress variant="determinate" value={(loaded/duration)*100} />
        </div>
        <VideoSeek        
          ValueLabelComponent={ValueLabelComponent}    
          defaultValue={0}
          value={currentTime*1000}
          max={duration*1000}
          width='100%'
          component ='span'
          onChange = { onSeek }
          onMouseDown = { onSeekMouseDown }
          onChangeCommitted = { onSeekMouseUp }
          style={{
            padding:'0'
          }}                  
        />
      </div>

      <div className={classes.buttonContainer}>
        <div>
          <IconButton onClick={ onPlayPauseToggle }>
            {isPlaying ? 
              <PauseIcon/> : <PlayIcon/>         
            }
          </IconButton>

          <IconButton onClick={ onMuteToggle }>
            {isMuted ? 
              <VolumeOffIcon/> : <VolumeUpIcon/>
            }
          </IconButton>  

          <Typography color='textPrimary' style={{ paddingLeft: '1rem' }} variant='caption'>
            { getFormattedCurrentTime() } 
            <span style={{margin: '0 5px'}}>
              /
            </span>
            { getFormattedDuration() } 
          </Typography>
        </div>

        <div>
          <Tooltip title={willLoop ? 'Auto replay ON' : 'Auto replay OFF' }>
            <IconButton 
              onClick={ onAutoReplayToggle }
              style={{
                opacity: willLoop ? '1' : '0.3'
              }}
            >
              <LoopIcon/>
            </IconButton>
          </Tooltip>          
        </div>

      </div>
      

      
      
    </div>
  )
}

PlayerControls.propTypes = {
  onPlayPauseToggle: PropTypes.func,
  onMuteToggle: PropTypes.func,
  onAutoReplayToggle: PropTypes.func,
}

export default PlayerControls