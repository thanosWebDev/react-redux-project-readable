import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentEditForm extends Component  {
  static propTypes = {
    body: PropTypes.string.isRequired , 
    handleInputChange: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    closeEditForm: PropTypes.func.isRequired
  }

  render() {
    const {body, handleInputChange, submitForm, closeEditForm} = this.props;
    return (
      <form className="editForm" onSubmit={submitForm}>
        <textarea className="editCommentBody" placeholder="Write you comment"
          name="body"
          value={body} 
          onChange={handleInputChange}
        /> 
        <div className="commentActions">
          <button type="submit" className="editBtn">Save</button>
          <div className="editBtn" onClick={closeEditForm}>Cancel</div>
        </div>
      </form>
    )
  }
}

export default CommentEditForm;