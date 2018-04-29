import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {capitalize, dateConvert} from '../utils/helper'

class PostContent extends Component  {
  static propTypes = {
    post: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
  }

  render() {
    const {post, openModal, deletePost} = this.props;
    return (
          <div className="postContent">
            <div className="postInfo"><span className="greenText">{capitalize(post.author)}</span> • {dateConvert(post.timestamp)} • {capitalize(post.category)}</div>
            <Link to={`/${post.category}/${post.id}`}>
              <h2 className="postTitle">{post.title}</h2>
            </Link>
            <p className="excerpt">{post.body.substr(0, 130)}…</p>
            <div className="comments">Comments: {post.commentCount}</div>
            <div className="postActions">
              <div className="edit" onClick={openModal}>Edit</div>
              <div className="delete" onClick={deletePost}>Delete</div>
            </div>
          </div>
    )
  }
}

export default PostContent