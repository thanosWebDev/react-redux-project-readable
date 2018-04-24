import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAllPosts } from '../actions';
import { connect } from 'react-redux';
import Post from './Post';
import Toolbar from './Toolbar';
import Error from './Error';
import * as readableAPI from '../utils/readableAPI';
import {transformData} from '../utils/helper';

class PostListContainer extends Component  {
  static propTypes = {
    openModal: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired
  }
  
  // Get posts from server, change data format and update Store
  componentDidMount() {
    const {getAllPosts, category} = this.props;
    if(category) { //For e specific category
    readableAPI.allCategoryPosts(category)
      .then( posts => {
        const data = transformData(posts);
        getAllPosts(data);
      })
    } else {// For homepage
      readableAPI.allPosts()
      .then( posts => {
        const data = transformData(posts);
        getAllPosts(data);
      })
    }
  }

  render() {
    const {category, categories} = (this.props);
    const homepage = (category === "");
    const routeExists = (categories.indexOf(category) >= 0);
    return (
      <div>
      {(routeExists || homepage)  &&
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
      }
      {(!routeExists && !homepage) &&
        <div>
          <Error />
        </div>           
      }
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories}) {
  return {
    posts: Object.values(posts),
    categories: categories.map(item => {
      return item.path
    })
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: (data) => dispatch(getAllPosts(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);