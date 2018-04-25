import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Vote from './Vote';
import PostActions from './PostActions'
import {capitalize, dateConvert} from '../utils/helper'

class Post extends Component  {
  static propTypes = {
    post: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired
  }

  render() {
    const {post} = this.props;
    return (
        <div className="post">
              <Vote votes={post.voteScore} id={post.id}/>
              <div className="postContent">
              <div className="postInfo"><span className="greenText">{capitalize(post.author)}</span> • {dateConvert(post.timestamp)} • {capitalize(post.category)}</div>
                <h2 className="postTitle">{post.title}</h2>
                <p className="excerpt">{post.body}…</p>
                <div className="comments">Comments: {post.commentCount}</div>
                <PostActions id={post.id} openModal={this.props.openModal}/>
              </div>
        </div>
    )
  }
}

export default Post