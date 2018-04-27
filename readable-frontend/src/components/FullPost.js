import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAllPosts } from '../actions';
import { connect } from 'react-redux';
import Vote from './Vote';
import PostActions from './PostActions';
import Error from './Error';
import Loading from './Loading';
import * as readableAPI from '../utils/readableAPI';
import {capitalize, dateConvert} from '../utils/helper';

class FullPost extends Component  {
  static propTypes = {
    openModal: PropTypes.func.isRequired,
    post_id: PropTypes.string.isRequired
  }

  state = {
    isIdValid: true,
    isLoading: true
  }
  
  // Get posts from server, change data format and update Store
  componentDidMount() {
    const {getAllPosts, post_id} = this.props;
      readableAPI.getPost(post_id)
      .then( post => {
        if (post.error || !post.id) {
          this.setState(() => ({isIdValid: false, isLoading: false}));
        } else {
          getAllPosts({[post.id]: post});
          this.setState(() => ({isLoading: false}));
        }
      })
  }

  render() {
    const {post} = this.props;

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
          <Vote votes={post.voteScore} id={post.id}/>
        </div>

        <div className="postSection">

          <div className="fullPost">
            <p className="fullpostInfo"><span className="greenText">{capitalize(post.author)}</span> • {dateConvert(post.timestamp)} • {capitalize(post.category)}</p>
            <h1 className="fullpostTitle">{post.title || "loading.."}</h1>
            <p className="fullpostBody">{post.body || "loading.."}</p>
            <PostActions  id={post.id}
                          openModal={this.props.openModal}
                          redirect={this.props.push}
            />
          </div>

          <div className="commentsSection">
            <h4 className="commentsNum">{post.commentCount || 0} Comments</h4>
            {/* <div className="comment">
              <div className="commentVote">
              <Vote votes={"12"} id={"34ee33431e"}/>
              </div>
              <div className="commentBody">
                <p className="commentInfo">John Gleez • 23-5-2018</p>
                <p className="commentText">Lorem ipsum dolor sit amet, adipiscing elit, do eiusmod defa incididunt ut labore et do magna aliqua asase.</p>
                <div className="commentActions">Edit delete</div>
              </div>
            </div> */}
          </div>

        </div>

      </div>
    )
  }
}

function mapStateToProps ({posts}) {
  return {
    post: {...Object.values(posts)[0]}
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: (data) => dispatch(getAllPosts(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullPost);