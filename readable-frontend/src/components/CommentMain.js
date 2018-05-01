import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {capitalize, dateConvert} from '../utils/helper'

class CommentMain extends Component  {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    openEditForm: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired
  }

  render() {
    const {comment, openEditForm, deleteComment} = this.props;
    return (
      <div>
        <p className="commentInfo"><span className="greenText">{capitalize(comment.author)}</span> • {dateConvert(comment.timestamp)}</p>
        <p className="commentBody">{comment.body}</p>
        <div className="commentActions">
          <div className="editComment" onClick={openEditForm}>Edit</div>
          <div className="deleteComment" onClick={deleteComment}>Delete</div>
        </div>
      </div> 
    )
  }
}

export default CommentMain;