import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {capitalize} from '../utils/helper'
import Close from 'react-icons/lib/md/close';

class Form extends Component  {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    submitNewPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    warning: PropTypes.bool.isRequired,
    handleInputChange: PropTypes.func.isRequired
  }

  render() {
    const {submitNewPost, updatePost, date, title, body, author, category, warning, handleInputChange, role, closeModal, categories} = this.props;
    // Alter form function according to role
    const btnText = role === 'create'? "Save and Post" : "Update";
    const formTitle = role === 'create'? "Create New Post" : "Edit Post";
    const formSubmit = role === 'create'? submitNewPost : updatePost;

    return (
      <div className="postForm">
        <div className="modalHeader">
          <div className="closeBtn" onClick={()=>closeModal()}><Close /></div>
        </div>
        <div className="modalBody">
          <h2 className="modalTitle">{formTitle}</h2>
          <form className="modalForm" onSubmit={formSubmit}>
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
            { role === 'create' && (
              <div>
                <input className="flatInput" type="text" placeholder="Author" autoComplete="off"
                  name="author"
                  value={author} 
                  onChange={handleInputChange}
                  />
                <select className="flatInput"
                  name="category"
                  value={category} 
                  onChange={handleInputChange}
                  >
                  <option value="all" disabled>Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.name}>{capitalize(category.name)}</option>
                  ))}
                </select>
              </div>
            )}
            {warning && (
              <p className="warning">All fields are required</p>
            )}
            <button className="greenButton formButton" type="submit">{btnText}</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Form