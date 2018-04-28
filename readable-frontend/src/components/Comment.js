import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment} from '../actions';
import Vote from './Vote';
import {capitalize, dateConvert} from '../utils/helper'
import * as readableAPI from '../utils/readableAPI';

class Comment extends Component  {
  static propTypes = {
    comment: PropTypes.object
  }

  // Deletes a post from server and store
  deleteComment = (id) => {
    readableAPI.deleteComment(id)
    this.props.deleteComment(id);
  }

  render() {
    const {comment} = this.props;
    return (
      <div className="comment">
        <div className="commentVote">
          <Vote votes={comment.voteScore} id={comment.id} voteRole={"comment"}/>
        </div>
        <div className="mainComment">
          <p className="commentInfo"><span className="greenText">{capitalize(comment.author)}</span> • {dateConvert(comment.timestamp)}</p>
          <p className="commentBody">{comment.body}</p>
          <div className="commentActions">
            <div className="editComment">Edit</div>
            <div className="deleteComment" onClick={() => this.deleteComment(comment.id)}>Delete</div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    deleteComment: (data) => dispatch(deleteComment(data)),
  }
}
export default connect(null, mapDispatchToProps)(Comment);