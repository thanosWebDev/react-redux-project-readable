import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Vote from '../components/Vote';
import PostContent from '../components/PostContent';
import { openModal } from '../actions';
import { removePost, setPostVote } from '../actions/posts';

class Post extends Component  {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  render() {
    const {post, removePost, openModal, setPostVote} = this.props;
    return (
        <div className="post">
          <Vote votes={post.voteScore}
                id={post.id}
                voteRole={"post"}
                submitVote={setPostVote}
          />
          <PostContent  post={post}
                        deletePost={()=>removePost(post.id)}
                        openModal={()=>openModal('update', post.id, null)}
          />
        </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    removePost: (data) => dispatch(removePost(data)),
    openModal: (role, id, activeCategory) => dispatch(openModal(role, id, activeCategory)),
    setPostVote: (direction, id) => dispatch(setPostVote(direction, id)),
  }
}

export default connect(null, mapDispatchToProps)(Post);