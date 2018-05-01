import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeComment, setCommentVote, editComment} from '../actions/comments';
import Vote from '../components/Vote';
import CommentEditForm from '../components/CommentEditForm';
import CommentMain from '../components/CommentMain';

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
            <CommentMain  comment={comment}
                          openEditForm={this.openEditForm}
                          deleteComment={this.deleteComment}
            />
          )}
          {(this.state.visibleForm && 
            <CommentEditForm  body={this.state.body}
                              handleInputChange={this.handleInputChange}
                              submitForm={this.submitForm}
                              closeEditForm={this.closeEditForm}
            />
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