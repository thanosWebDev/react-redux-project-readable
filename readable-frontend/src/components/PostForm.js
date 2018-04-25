import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost, editPost } from '../actions';
import * as readableAPI from '../utils/readableAPI';
import PropTypes from 'prop-types';
import {capitalize, dateConvert, createPost} from '../utils/helper'
import Close from 'react-icons/lib/md/close';

class PostForm extends Component  {
  static propTypes = {
    close: PropTypes.func.isRequired,
    modalRole: PropTypes.string.isRequired,
    editPostId: PropTypes.string,
    category: PropTypes.string.isRequired
  }

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
    const {modalRole, category, posts, editPostId} = this.props;
    if (modalRole === 'create') {
      this.setState({ date: Date.now(), category});
    }
    if (modalRole === 'update') {
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
    // Check for empty fields else submit post
    if (!title || !body || !category || !author) {
      this.setState({warning: true});
    } else {
      // create post for server
      const newServerPost = createPost(this.state);
      readableAPI.addNewPost(newServerPost);
      // Create post for Store
      const newStorePost = {...newServerPost, voteScore: 1, delete: false, commentCount: 0}
      this.props.addPost(newStorePost);
      this.props.close();
    }
  }

  // Updates a post in the Store and Server
  updatePost = (e) => {
    e.preventDefault()
    const {title, body} = this.state;
    // Check for empty fields else update post
    if (!title || !body) {
      this.setState({warning: true});
    } else {
      const params = [this.props.editPostId, title, body]
      // Update server
      readableAPI.updatePost(...params);
      // Update Store
      this.props.editPost(...params)
      this.props.close();
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
    const {modalRole} = this.props;
    const btnText = modalRole === 'create'? "Save and Post" : "Update";
    const title = modalRole === 'create'? "Create New Post" : "Edit Post";
    const formSubmit = modalRole === 'create'? this.submitNewPost : this.updatePost;

    return (
      <div className="postForm">
        <div className="modalHeader">
          <div className="closeBtn" onClick={()=>this.props.close()}><Close /></div>
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
            { modalRole === 'create' && (
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
                  {this.props.categories.map((category, index) => (
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

function mapStateToProps ({ categories, posts }) {
  return {categories, posts}
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    editPost: (id, title, body) => dispatch(editPost(id, title, body))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);