import React from 'react';
import PropTypes from 'prop-types';
import Close from 'react-icons/lib/md/close';

const EditPostForm = ({
    updatePost, date, title, body, warning,
    handleInputChange, closeModal
}) =>  (
  <div className="postForm">
    <div className="modalHeader">
      <div className="closeBtn" onClick={closeModal}><Close /></div>
    </div>
    <div className="modalBody">
      <h2 className="modalTitle">Edit Post</h2>
      <form className="modalForm" onSubmit={updatePost}>
        <p className="postDate">Post date: {date}</p>
        <input className="flatInput" type="text" placeholder="Post title" autoComplete="off"
          name="title"
          value={title} 
          onChange={handleInputChange}
          />
        <textarea placeholder="Post content"
          name="body"
          value={body} 
          onChange={handleInputChange}
          />
        {warning && (
          <p className="warning">All fields are required</p>
        )}
        <button className="greenButton formButton" type="submit">Update</button>
      </form>
    </div>
  </div>
)

EditPostForm.propTypes = {
    updatePost: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    warning: PropTypes.bool.isRequired,
    handleInputChange: PropTypes.func.isRequired
}

export default EditPostForm