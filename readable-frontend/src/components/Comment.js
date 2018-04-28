import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Vote from './Vote';
import {capitalize, dateConvert} from '../utils/helper'

class Comment extends Component  {
  static propTypes = {
    comment: PropTypes.object
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
          {/* <div className="commentActions">Edit Delete</div> */}
          <div className="commentActions">
            <div className="editComment">Edit</div>
            <div className="deleteComment">Delete</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Comment