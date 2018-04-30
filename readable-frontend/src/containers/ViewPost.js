import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { removePost, setPostVote, fetchPost } from '../actions/posts';
import { openModal, isLoading, isPostIdvalid } from '../actions';
import { connect } from 'react-redux';
import Vote from '../components/Vote';
import FullPost from '../components/FullPost';
import Error from '../components/Error';
import Loading from '../components/Loading';
import CommentList from './CommentList';

class ViewPost extends Component  {
  static propTypes = {
    post_id: PropTypes.string.isRequired
  }
  
  // Get post details from server and update Store
  componentDidMount() {
    const {fetchPost, post_id} = this.props;
    fetchPost(post_id)
  }

  componentWillUnmount() {
    this.props.isLoading(true);
    this.props.isPostIdvalid(true);
  }

  // Delete post and redirect one step back in history
  deletePost = (id) => {
    const {removePost, push} = this.props;
    removePost(id)
    if (window.location.pathname.includes(id)){
      push('/')
    }
  }

  render() {
    const {post, post_id, setPostVote, openModal, ui} = this.props;
    // Render Loading component
    if (ui.isLoading) {
      return <span><Loading /></span>
    }
    // Render Error page if post id is not valid
    if (!ui.isPostIdvalid) {
      return <span><Error /></span>
    }

    return (
      <div className="fullPostContainer">
        <div className="voteSection">
          <Vote votes={post.voteScore} 
                id={post.id} 
                voteRole={"post"}
                submitVote={setPostVote}
          />
        </div>
        <div className="postSection">
          <FullPost post={post} 
                    deletePost={()=>this.deletePost(post_id)}
                    openModal={()=>openModal('update', post_id, null)}
          />
          <CommentList post_id={post_id}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({posts, ui}) {
  return {
    post: {...Object.values(posts)[0]},
    ui
  }
}

function mapDispatchToProps (dispatch) {
  return {
    isLoading: (data) => dispatch(isLoading(data)),
    isPostIdvalid: (data) => dispatch(isPostIdvalid(data)),
    removePost: (data) => dispatch(removePost(data)),
    fetchPost: (data) => dispatch(fetchPost(data)),
    openModal: (role, id, activeCategory) => dispatch(openModal(role, id, activeCategory)),
    setPostVote: (direction, id) => dispatch(setPostVote(direction, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);