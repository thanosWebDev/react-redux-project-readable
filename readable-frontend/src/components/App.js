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
    modalOpen: false,
    modalRole: "",
    editPostId: "",
    activeCategory: ""
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

  //Open and setup modal form
  openModal = (role, id, activeCategory) => {
    this.setState(() => ({modalOpen: true, modalRole: role, editPostId: id, activeCategory}));
  }
  //Close modal form and reset settings
  closeModal = () => {
    this.setState(() => ({modalOpen: false, modalRole: "", editPostId: "", activeCategory: ""}))
  }
  

  render() {
    const {modalOpen} = this.state;
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
          <Modal
            className='modal'
            overlayClassName='overlay'
            isOpen={modalOpen}
            onRequestClose={this.closeModal}
            contentLabel='Post form'
          >
            <PostForm
              close={this.closeModal}
              modalRole={this.state.modalRole}
              editPostId={this.state.editPostId}
              category={this.state.activeCategory}
            />
          </Modal>
        </div>
        <footer>
          <p>React / Redux - Test project</p>
        </footer>
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
