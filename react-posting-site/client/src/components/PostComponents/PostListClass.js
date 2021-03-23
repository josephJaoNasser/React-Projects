import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPosts, deletePost } from '../../actions/postActions'
import PostItem from './PostItem'

export class PostList extends Component {
  
  componentDidMount(){
    this.props.fetchPosts()
  }

  render() {    
    if(this.props.posts.length){
      const postItems = this.props.posts.map((post, index) => (
        <PostItem 
          key={index} 
          post={post}  
          onDelete={id => this.props.deletePost(id)}
          onDoubleClick={()=>{}}            
        />
      ))
      return postItems
    }
    else{
      return(
        <i>No posts to show yet...</i>
      )
    }
    
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  newPost: state.posts.singlePost
})  

PostList.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
} 

export default connect(mapStateToProps, { fetchPosts, deletePost })(PostList)
