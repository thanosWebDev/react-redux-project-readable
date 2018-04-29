import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions';
import { editPost, createPost } from '../actions/posts';
import Form from '../components/Form';
import {dateConvert} from '../utils/helper'

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
    const {activeCategory, createPost, closeModal} = this.props;
    // Check for empty fields else submit post
    if (!title || !body || !category || !author) {
      this.setState({warning: true});
    } else {
      createPost(this.state, activeCategory, category);
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
      editPost(editPostId, title, body);
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
    const {role, closeModal, categories} = this.props;
    const {title, body, author, category, warning} = this.state;

    return (
      <div className="postForm">
      <Form submitNewPost={this.submitNewPost}
            updatePost={this.updatePost}
            date={date}
            title={title}
            body={body}
            author={author}
            category={category}
            categories={categories}
            role={role}
            closeModal={closeModal}
            warning={warning}
            handleInputChange={this.handleInputChange}
      />
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts, modal }) {
  return {categories, posts, ...modal}
}

function mapDispatchToProps (dispatch) {
  return {
    editPost: (id, title, body) => dispatch(editPost(id, title, body)),
    closeModal: () => dispatch(closeModal()),
    createPost: (data, activeCat, selectedCat) => dispatch(createPost(data, activeCat, selectedCat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);