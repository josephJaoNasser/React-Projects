import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPosts } from '../../actions/postActions'
import PostItem from './PostItem'

export class PostList extends Component {
  
  componentDidMount(){
    this.props.fetchPosts()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.newPost){
      this.props.posts.unshift(nextProps.newPost)
    }
  }

  render() {    
    if(this.props.posts.length){
      const postItems = this.props.posts.map((post, index) => (
        <PostItem 
          key={index} 
          post={post}  
          onDelete={()=>{}}
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
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
} 

export default connect(mapStateToProps, { fetchPosts })(PostList)
