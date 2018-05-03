import React from 'react';
import PropTypes from 'prop-types';

const CommentForm = ({handleInputChange, body, author, submitNewComment}) =>  (
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

CommentForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  submitNewComment: PropTypes.func.isRequired
}

export default CommentForm