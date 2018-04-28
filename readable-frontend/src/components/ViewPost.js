import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAllPosts, getComments } from '../actions';
import { connect } from 'react-redux';
import Vote from './Vote';
import PostActions from './PostActions';
import FullPost from './FullPost';
import Error from './Error';
import Loading from './Loading';
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
    const {getAllPosts, getComments, post_id} = this.props;
      // Get post details from server and update Store
      readableAPI.getPost(post_id)
      .then( post => {
        if (post.error || !post.id) { // Check if post id is invalid
          this.setState(() => ({isIdValid: false, isLoading: false}));
        } else {
          getAllPosts({[post.id]: post});
          this.setState(() => ({isLoading: false}));
        }
      })
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
          <FullPost post={post} />
          <PostActions  id={post.id} redirect={this.props.push} />
          <CommentList  post_id={post_id} />
        </div>
      </div>
    )
  }
}

function mapStateToProps ({posts, comments}) {
  return {
    post: {...Object.values(posts)[0]},
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: (data) => dispatch(getAllPosts(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);