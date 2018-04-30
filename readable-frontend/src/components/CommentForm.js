import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentForm extends Component  {
  static propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    submitNewComment: PropTypes.func.isRequired
  }

  render() {
    const {handleInputChange, body, author, submitNewComment} = this.props;
    return (
      <div className="commentForm-container">
          <p className="commentFormTitle">New Comment</p>
          <form className="commentForm" onSubmit={submitNewComment}>
            <textarea className="commentFormBody" placeholder="Write you comment"
              name="body"
              value={body} 
              onChange={handleInputChange}
            />
            <input className="commentAuthor" type="text" placeholder="Name" autoComplete="off"
              name="author"
              value={author} 
              onChange={handleInputChange}
            />   
            <button className="greenButton" type="submit">Add Comment</button>
          </form>
      </div>
    )
  }
}

export default CommentForm