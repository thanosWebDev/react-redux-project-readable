import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions';
import { addPost, editPost } from '../actions/posts';
import * as readableAPI from '../utils/readableAPI';
import PropTypes from 'prop-types';
import {capitalize, dateConvert, createPost} from '../utils/helper'
import Close from 'react-icons/lib/md/close';

class PostForm extends Component  {

  state = {
    title: "",
    body: "",
    author: "",
    category: "",
    date: "",
    warning: false,
  }

  // Setup local state according to modal role
  componentDidMount() {
    const {role, activeCategory, posts, editPostId} = this.props;   
    if (role === 'create') {
      this.setState({ date: Date.now(), category: activeCategory});
    }
    if (role === 'update') {
      const editPost = posts[editPostId];
      this.setState({
            title: editPost.title,
            body: editPost.body,
            date: editPost.timestamp
          })
    }
  }

  // Creates a new post, submit it to the server and add it to the store
  submitNewPost = (e) => {
    e.preventDefault()
    const {title, body, category, author} = this.state;
    const {activeCategory, addPost, closeModal} = this.props;
    // Check for empty fields else submit post
    if (!title || !body || !category || !author) {
      this.setState({warning: true});
    } else {
      // create post for server and submit
      const newServerPost = createPost(this.state);
      readableAPI.addNewPost(newServerPost);
      
      // If form's selected category equals menu activeCategory
      // or activeCategory is empty (homepage) then update Store too
      if (activeCategory === category || activeCategory === "") {
        // Create post for Store and dispatch
        const newStorePost = {...newServerPost, voteScore: 1, delete: false, commentCount: 0}
        addPost(newStorePost);
      }
      closeModal();
    }
  }

  // Updates a post in the Store and Server
  updatePost = (e) => {
    e.preventDefault()
    const {title, body} = this.state;
    const {editPost, closeModal, editPostId} = this.props;
    // Check for empty fields else update post
    if (!title || !body) {
      this.setState({warning: true});
    } else {
      const params = [editPostId, title, body]
      // Update server
      readableAPI.updatePost(...params);
      // Update Store
      editPost(...params)
      closeModal();
    }
  }
  
  // Form control
  handleInputChange= (event) => {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  render() {
    const date = dateConvert(this.state.date);

    // Alter form function according to role
    const {role, closeModal, categories} = this.props;
    const btnText = role === 'create'? "Save and Post" : "Update";
    const title = role === 'create'? "Create New Post" : "Edit Post";
    const formSubmit = role === 'create'? this.submitNewPost : this.updatePost;

    return (
      <div className="postForm">
        <div className="modalHeader">
          <div className="closeBtn" onClick={()=>closeModal()}><Close /></div>
        </div>
        <div className="modalBody">
          <h2 className="modalTitle">{title}</h2>
          <form className="modalForm" onSubmit={formSubmit}>
            <p className="postDate">Post date: {date}</p>
            <input className="flatInput" type="text" placeholder="Post title" autoComplete="off"
              name="title"
              value={this.state.title} 
              onChange={this.handleInputChange}
              />
            <textarea placeholder="Post content"
              name="body"
              value={this.state.body} 
              onChange={this.handleInputChange}
              />
            { role === 'create' && (
              <div>
                <input className="flatInput" type="text" placeholder="Author" autoComplete="off"
                  name="author"
                  value={this.state.author} 
                  onChange={this.handleInputChange}
                  />
                <select className="flatInput"
                  name="category"
                  value={this.state.category} 
                  onChange={this.handleInputChange}
                  >
                  <option value="" disabled>Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.name}>{capitalize(category.name)}</option>
                  ))}
                </select>
              </div>
            )}
            {this.state.warning && (
              <p className="warning">All fields are required</p>
            )}
            <button className="greenButton formButton" type="submit">{btnText}</button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts, modal }) {
  return {categories, posts, ...modal}
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    editPost: (id, title, body) => dispatch(editPost(id, title, body)),
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);