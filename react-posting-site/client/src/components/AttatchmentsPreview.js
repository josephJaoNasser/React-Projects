//context providers
import { useImageAttatchments, useUpdateImageAttatchments } from './AttatchmentsContext'

//material ui
import { 
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridListTile: {

  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export const ImageAttatchmentsPreview = () => {
  const attatchedImages = useImageAttatchments()
  const setAttatchedImages = useUpdateImageAttatchments()
  const classes = useStyles();
  
  const removeAttatchment = (url) => {
    setAttatchedImages({
      images: attatchedImages.images.filter((img) => img.url !== url)
    })
  }

  return (
    <>
      <GridList className={classes.gridList} cols={2.5}>
      {
        attatchedImages.images.map(image => (
          <GridListTile key={image.url}>
            <img src={image.url} alt=''/>
            <GridListTileBar             
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton 
                  onClick={ ()=> removeAttatchment(image.url) }
                >
                  <CancelIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))
      }
      </GridList>      
    </>

  )
}
