import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAllPosts } from '../actions/posts';
import { sortBy, openModal } from '../actions';
import { connect } from 'react-redux';
import Post from './Post';
import Toolbar from '../components/Toolbar';
import Error from '../components/Error';
import Loading from '../components/Loading';
import * as readableAPI from '../utils/readableAPI';

class PostList extends Component  {
  static propTypes = {
    category: PropTypes.string.isRequired
  }

  state = {
    isLoading: true
  }
  
  // Get posts from server and update Store
  componentDidMount() {
    const {getAllPosts, category} = this.props;
    if(category) { //For e specific category
    readableAPI.allCategoryPosts(category)
      .then( posts => {
        getAllPosts(posts);
        this.setState(() => ({isLoading: false}));
      })
    } else {// For homepage
      readableAPI.allPosts()
      .then( posts => {
        getAllPosts(posts);
        this.setState(() => ({isLoading: false}));
      })
    }
  }

  render() {
    const {category, categories, openModal, sortBy, sorting, posts} = (this.props);
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
          <Toolbar  openModal={()=>openModal('create', null, category)}
                    sortBy={sortBy}
                    sorting={sorting}
          />
          <ul className="postsList">
            {posts.map((post, index) => (
              <li key={index}>
                <Post post={post}/>
              </li>
            ))}
          </ul>
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories, sortBy}) {
  return {
    // Dynamic sorting of posts array 
    posts: Object.values(posts)
            .sort((a, b) => b[sortBy] - a[sortBy]),
    categories: categories.map(item => item.path),
    sorting: sortBy
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: (data) => dispatch(getAllPosts(data)),
    sortBy: (data) => dispatch(sortBy(data)),
    openModal: (role, id, activeCat) => dispatch(openModal(role, id, activeCat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);