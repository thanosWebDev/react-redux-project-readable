import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { receivePosts, removePost } from '../actions/posts';
import { openModal } from '../actions';
import { connect } from 'react-redux';
import Vote from '../components/Vote';
import FullPost from '../components/FullPost';
import Error from '../components/Error';
import Loading from '../components/Loading';
import CommentList from './CommentList';
import * as readableAPI from '../utils/readableAPI';

class ViewPost extends Component  {
  static propTypes = {
    post_id: PropTypes.string.isRequired
  }

  state = {
    isIdValid: true,
    isLoading: true
  }
  
  componentDidMount() {
    const {receivePosts, post_id} = this.props;
      // Get post details from server and update Store
      readableAPI.getPost(post_id)
      .then( post => {
        if (post.error || !post.id) { // Check if post id is invalid
          this.setState(() => ({isIdValid: false, isLoading: false}));
        } else {
          receivePosts({[post.id]: post});
          this.setState(() => ({isLoading: false}));
        }
      })
  }

  deletePost = (id) => {
    const {removePost, push} = this.props;
    removePost(id)
    if (window.location.pathname.includes(id)){
      push('/')
    }
  }

  render() {
    const {post, post_id} = this.props;

    // Render Loading component
    if (this.state.isLoading) {
      return <span><Loading /></span>
    }
    // Render Error page if post id is not valid
    if (!this.state.isIdValid) {
      return <span><Error /></span>
    }

    return (
      <div className="fullPostContainer">
        <div className="voteSection">
          <Vote votes={post.voteScore} id={post.id} voteRole={"post"}/>
        </div>
        <div className="postSection">
          <FullPost post={post} 
                    deletePost={()=>this.deletePost(post_id)}
                    openModal={()=>this.props.openModal('update', post_id, null)}
          />
          <CommentList  post_id={post_id}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({posts}) {
  return {
    post: {...Object.values(posts)[0]},
  }
}

function mapDispatchToProps (dispatch) {
  return {
    removePost: (data) => dispatch(removePost(data)),
    receivePosts: (data) => dispatch(receivePosts(data)),
    openModal: (role, id, activeCategory) => dispatch(openModal(role, id, activeCategory))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);