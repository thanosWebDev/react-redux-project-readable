import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {capitalize, dateConvert} from '../utils/helper'

class FullPost extends Component  {
  static propTypes = {
    post: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
  }

  render() {
    const {post, openModal, deletePost} = this.props;
    return (
      <div className="fullPost">
          <p className="fullpostInfo"><span className="greenText">{capitalize(post.author)}</span> <span className="hide">•</span> {dateConvert(post.timestamp)} • {capitalize(post.category)}</p>
          <h1 className="fullpostTitle">{post.title}</h1>
          <p className="fullpostBody">{post.body}</p>
          <div className="postActions">
              <div className="edit" onClick={openModal}>Edit</div>
              <div className="delete" onClick={deletePost}>Delete</div>
          </div>
      </div>
    )
  }
}

export default FullPost