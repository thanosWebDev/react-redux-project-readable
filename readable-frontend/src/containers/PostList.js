import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPosts } from '../actions/posts';
import { sortBy, openModal, isLoading } from '../actions';
import { connect } from 'react-redux';
import Post from './Post';
import Toolbar from '../components/Toolbar';
import Error from '../components/Error';
import Loading from '../components/Loading';

class PostList extends Component  {
  static propTypes = {
    category: PropTypes.string.isRequired
  }
  
  // Get posts from server and update Store
  componentDidMount() {
    const {getPosts, category} = this.props;
    getPosts(category);
  }

  componentWillUnmount() {
    this.props.isLoading(true);
  }

  render() {
    const {category, categories, openModal, sortBy, sorting, posts, ui} = (this.props);
    const homepage = (category === 'all');
    const categoryExists = (categories.indexOf(category) >= 0);

    // Render Loading component
    if (ui.isLoading) {
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

function mapStateToProps ({ posts, categories, sortBy, ui}) {
  return {
    // Dynamic sorting of posts array 
    posts: Object.values(posts)
            .sort((a, b) => b[sortBy] - a[sortBy]),
    categories: categories.map(item => item.path),
    sorting: sortBy,
    ui
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPosts: (category) => dispatch(getPosts(category)),
    sortBy: (data) => dispatch(sortBy(data)),
    isLoading: (data) => dispatch(isLoading(data)),
    openModal: (role, id, activeCat) => dispatch(openModal(role, id, activeCat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);