import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeComment, setCommentVote, editComment} from '../actions/comments';
import Vote from './Vote';
import {capitalize, dateConvert} from '../utils/helper'

class Comment extends Component  {
  static propTypes = {
    comment: PropTypes.object
  }

  state = {
    visibleForm: false,
    body: ""
  }

  // Deletes a post from server and store
  deleteComment = () => {
    const {comment, removeComment} = this.props;
    removeComment(comment.id)
  }

  // Submit edit form and update a comment
  submitForm = (e) => {
    e.preventDefault();
    const {editComment, comment} = this.props;
    editComment(comment.id, this.state.body);
    this.closeEditForm();
  }

  openEditForm = () => {
    this.setState({
      visibleForm: !this.state.visibleForm,
      body: this.props.comment.body
    })
  }

  closeEditForm = () => {
    this.setState({visibleForm: !this.state.visibleForm, body: ""})
  }

  // Form control
  handleInputChange= (event) => {
    this.setState({body: event.target.value});
  }

  render() {
    const {comment, setCommentVote} = this.props;
    return (
      <div className="comment">
        <div className="commentVote">
          <Vote votes={comment.voteScore}
                id={comment.id}
                voteRole={"comment"}
                submitVote={setCommentVote}
          />
        </div>
        <div className="mainComment">

          {(!this.state.visibleForm && 
            <div>
              <p className="commentInfo"><span className="greenText">{capitalize(comment.author)}</span> • {dateConvert(comment.timestamp)}</p>
              <p className="commentBody">{comment.body}</p>
              <div className="commentActions">
                <div className="editComment" onClick={this.openEditForm}>Edit</div>
                <div className="deleteComment" onClick={this.deleteComment}>Delete</div>
              </div>
            </div>
          )}

          {(this.state.visibleForm && 
          <form className="editForm" onSubmit={this.submitForm}>
            <textarea className="editCommentBody" placeholder="Write you comment"
              name="body"
              value={this.state.body} 
              onChange={this.handleInputChange}
            /> 
            <div className="commentActions">
              <button type="submit" className="editBtn">Save</button>
              <div className="editBtn" onClick={this.closeEditForm}>Cancel</div>
            </div>
          </form>
          )}

        </div>
        
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    removeComment: (data) => dispatch(removeComment(data)),
    editComment: (id, body) => dispatch(editComment(id, body)),
    setCommentVote: (direction, id) => dispatch(setCommentVote(direction, id)),
  }
}
export default connect(null, mapDispatchToProps)(Comment);