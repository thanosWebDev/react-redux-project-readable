import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAllPosts } from '../actions';
import { connect } from 'react-redux';
import Post from './Post';
import Toolbar from './Toolbar';
import Error from './Error';
import Loading from './Loading';
import * as readableAPI from '../utils/readableAPI';
import {transformData} from '../utils/helper';

class PostListContainer extends Component  {
  static propTypes = {
    openModal: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired
  }

  state = {
    isLoading: true
  }
  
  // Get posts from server, change data format and update Store
  componentDidMount() {
    const {getAllPosts, category} = this.props;
    if(category) { //For e specific category
    readableAPI.allCategoryPosts(category)
      .then( posts => {
        const data = transformData(posts);
        getAllPosts(data);
        this.setState(() => ({isLoading: false}));
      })
    } else {// For homepage
      readableAPI.allPosts()
      .then( posts => {
        const data = transformData(posts);
        getAllPosts(data);
        this.setState(() => ({isLoading: false}));
      })
    }
  }

  render() {
    const {category, categories} = (this.props);
    const homepage = (category === "");
    const categoryExists = (categories.indexOf(category) >= 0);

    // Render Loading component
    if (this.state.isLoading) {
      return <span><Loading /></span>
    }
    // Render Error page if category is not valid
    if (!categoryExists && !homepage) {
      return <span><Error /></span>
    }

    return (
      <div>
          <Toolbar openModal={this.props.openModal} category={category}/>
          <ul className="postsList">
            {this.props.posts.map((post, index) => (
              <li key={index}>
                <Post post={post}
                      openModal={this.props.openModal}
                />
              </li>
            ))}
          </ul>
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories, sortBy}) {
  const sortField = sortBy === "votes" ? "voteScore" : "timestamp";
  return {
    // Dynamic sorting of posts array 
    posts: Object.values(posts)
            .sort((a, b) => b[sortField] - a[sortField]),
    categories: categories.map(item => item.path)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: (data) => dispatch(getAllPosts(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);