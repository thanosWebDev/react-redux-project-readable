import React from 'react';
import PropTypes from 'prop-types';
import {capitalize, dateConvert} from '../utils/helper'

const FullPost = ({post, openModal, deletePost}) => (
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

FullPost.propTypes = {
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
}

export default FullPost