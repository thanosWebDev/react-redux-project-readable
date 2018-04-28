import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAllPosts, getComments } from '../actions';
import { connect } from 'react-redux';
import Vote from './Vote';
import PostActions from './PostActions';
import Error from './Error';
import Loading from './Loading';
import Comment from './Comment';
import * as readableAPI from '../utils/readableAPI';
import {capitalize, dateConvert} from '../utils/helper';

class FullPost extends Component  {
  static propTypes = {
    post_id: PropTypes.string.isRequired
  }

  state = {
    isIdValid: true,
    isLoading: true
  }
  
  componentDidMount() {
    const {getAllPosts, getComments, post_id} = this.props;
      // Get post details from server and update Store
      readableAPI.getPost(post_id)
      .then( post => {
        if (post.error || !post.id) { // Check if post id is invalid
          this.setState(() => ({isIdValid: false, isLoading: false}));
        } else {
          getAllPosts({[post.id]: post});
          this.setState(() => ({isLoading: false}));
        }
      })
      // Get comments of the post from server and update Store
      readableAPI.allPostComments(post_id)
      .then( comments => getComments(comments))
  }

  render() {
    const {post, comments} = this.props;

    // Render Loading component
    if (this.state.isLoading) {
      return <span><Loading /></span>
    }
    // Render Error page if post id is not valid
    if (!this.state.isIdValid) {
      return <span><Error /></span>
    }

    return (
      <div className="fullPostContainer">

        <div className="voteSection">
          <Vote votes={post.voteScore} id={post.id} voteRole={"post"}/>
        </div>

        <div className="postSection">
          <div className="fullPost">
            <p className="fullpostInfo"><span className="greenText">{capitalize(post.author)}</span> • {dateConvert(post.timestamp)} • {capitalize(post.category)}</p>
            <h1 className="fullpostTitle">{post.title || "loading.."}</h1>
            <p className="fullpostBody">{post.body || "loading.."}</p>
            <PostActions  id={post.id}
                          redirect={this.props.push}
            />
          </div>

          <div className="commentsSection">
            <h4 className="commentsNum">{post.commentCount || 0} Comments</h4>
            <ul className="commentsList">
              {comments.map((comment, index) => (
                <li key={index}>
                  <Comment comment={comment}/>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps ({posts, comments}) {
  return {
    post: {...Object.values(posts)[0]},
    comments: [...Object.values(comments)]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: (data) => dispatch(getAllPosts(data)),
    getComments: (data) => dispatch(getComments(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullPost);