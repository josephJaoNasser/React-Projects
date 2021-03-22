import { useState } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../../actions/postActions'
import PropTypes from 'prop-types'
//import { usePost, useSetPosts } from './PostContextProvider'

const AddPost = ({ createPost }) => {

  //declare the component-level state.
  const [text, setText] = useState('')

  //functions
  const onSubmit = (e) => {
    e.preventDefault();    
    if(!text){
      alert('Please say something!')
      return
    }

    const newPost = {
      text: text,
      user: {
        _id: '1'
      }
    }
    
    createPost(newPost)
    setText('');
  }

  //html
  return (
    <form className="addForm" onSubmit={onSubmit}>
      <div className="form-control">
        <label >Post</label><br/>
        <textarea 
          cols="50" 
          rows="5" 
          style={{resize: "none"}} 
          placeholder="Say something!"
          value={text} 
          onChange={e => setText(e.target.value)}
        />
      </div>    
      
      <input type="submit" className="btn green"/>
    </form>
  )
}

AddPost.propTpyes = {
  createPost: PropTypes.func.isRequired
}

//export default AddPost
export default connect(null, { createPost })(AddPost)
