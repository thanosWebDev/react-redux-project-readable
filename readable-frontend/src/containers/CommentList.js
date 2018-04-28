import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getComments } from '../actions';
import { connect } from 'react-redux';
import Comment from '../components/Comment';
import * as readableAPI from '../utils/readableAPI';
import {capitalize, dateConvert} from '../utils/helper';

class CommentList extends Component  {
  static propTypes = {
    post_id: PropTypes.string.isRequired
  }
  
  // Get the post's comments from server and update Store
  componentDidMount() {
    const {getComments, post_id} = this.props;
    readableAPI.allPostComments(post_id)
      .then( comments => getComments(comments))
  }

  render() {
    const {comments} = this.props;
    return (
      <div className="commentsSection">
            <h4 className="commentsNum">{comments.length || 0} Comments</h4>
            <ul className="commentsList">
              {comments.map((comment, index) => (
                <li key={index}>
                  <Comment comment={comment}/>
                </li>
              ))}
            </ul>
      </div>
    )
  }
}

function mapStateToProps ({comments}) {
  return {
    comments: [...Object.values(comments)]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getComments: (data) => dispatch(getComments(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);