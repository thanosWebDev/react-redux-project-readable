import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPosts, getCategories } from '../actions';
import '../css/App.css';
import Header from './Header';
import Toolbar from './Toolbar';
import Post from './Post';
import PostForm from './PostForm';
import Modal from 'react-modal';
import * as readableAPI from '../utils/readableAPI';
import {transformData} from '../utils/helper'

class App extends Component {

  state = {
    formModalOpen: false,
    modalRole: "",
    editPostId: ""
  }

  componentDidMount() {
    const {getAllPosts, getCategories} = this.props;
    // Get all post from server, change data format and update Store
    readableAPI.allPosts()
      .then( (posts) => {
        const data = transformData(posts);
        getAllPosts(data);
      })
    // Get all gategories from server and update Store
    readableAPI.categories().then( categories => getCategories(categories));
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  //Open modal form and set role function
  openFormModal = (role, id) => {
    this.setState(() => ({modalRole: role, editPostId: id, formModalOpen: true}));
  }
  //Close modal form and reset settings
  closeFormModal = () => {
    this.setState(() => ({modalRole: "", editPostId: "", formModalOpen: false}))
  }

  render() {
    const {formModalOpen} = this.state;
    return (
      <div>
        <div className="app-container">
          <Header categories={this.props.categories} />
          <Toolbar open={this.openFormModal}/>
          <main>
            <ul className="postsList">
              {this.props.posts.map((post, index) => (
                <li key={index}>
                <Post post={post} 
                      getAllPosts={this.props.getAllPosts}
                      openModal={this.openFormModal}
                />
                </li>
              ))}
            </ul>
          </main>
        </div>
        <footer>
          <p>React / Redux - Test project</p>
        </footer>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={formModalOpen}
          onRequestClose={this.closeFormModal}
          contentLabel='Create New Post'
        >
          <PostForm
            close={this.closeFormModal}
            modalRole={this.state.modalRole}
            editPostId={this.state.editPostId}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps ({ posts, categories }) {
  return {
    categories,
    posts: Object.values(posts)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: (data) => dispatch(getAllPosts(data)),
    getCategories: (data) => dispatch(getCategories(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
