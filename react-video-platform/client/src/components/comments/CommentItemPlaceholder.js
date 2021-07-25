import TextLinePlaceholder from './TextLinePlaceholder'
import { 
  Avatar,
  ListItem,
  ListItemAvatar,
} from '@material-ui/core'


const CommentItemPlaceholder = () => {
  return (
    <ListItem style={{marginBottom: 10}}>
      <ListItemAvatar>
        <Avatar src="" />
      </ListItemAvatar>
      
      <div style={{width:'100%', height: '100%'}}>
        <TextLinePlaceholder width="10%"/>
        <TextLinePlaceholder lines={2}/>
      </div>
      
      
    </ListItem>
  )
}


export default CommentItemPlaceholder
