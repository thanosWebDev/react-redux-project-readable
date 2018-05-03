import React from 'react';
import PropTypes from 'prop-types';
import {capitalize, dateConvert} from '../utils/helper'

const CommentMain = ({comment, openEditForm, deleteComment}) => (
  <div>
    <p className="commentInfo"><span className="greenText">{capitalize(comment.author)}</span> • {dateConvert(comment.timestamp)}</p>
    <p className="commentBody">{comment.body}</p>
    <div className="commentActions">
      <div className="editComment" onClick={openEditForm}>Edit</div>
      <div className="deleteComment" onClick={deleteComment}>Delete</div>
    </div>
  </div>
)

CommentMain.propTypes = {
  comment: PropTypes.object.isRequired,
  openEditForm: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
}

export default CommentMain;