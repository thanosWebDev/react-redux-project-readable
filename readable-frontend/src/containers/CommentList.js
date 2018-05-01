import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchComments, createComment } from '../actions/comments';
import { connect } from 'react-redux';
import CommentForm from '../components/CommentForm';
import Comment from './Comment';

class CommentList extends Component  {
  static propTypes = {
    post_id: PropTypes.string.isRequired
  }

  state = {
    body: "",
    author: "",
    warning: false,
  }
  
  // Get the post's comments from server and update Store
  componentDidMount() {
    const {fetchComments, post_id} = this.props;
    fetchComments(post_id);
  }

  submitNewComment = (e) => {
    e.preventDefault()
    const {body, author} = this.state;
    const {post_id, createComment} = this.props;
    // Check for empty fields else submit post
    if (!body || !author) {
      //this.setState({warning: true});
    } else {
      createComment(body, author, post_id);
      this.setState({body: "", author: ""});
    }
  }

  // Form control
  handleInputChange= (event) => {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  render() {
    const {comments} = this.props;
    const {body, author} = this.state;
    return (
      <div className="commentsSection">
            <h4 className="commentsNum">{comments.length || 0} Comments</h4>
            <CommentForm  handleInputChange={this.handleInputChange}
                          submitNewComment={this.submitNewComment}
                          body={body}
                          author={author}
            />
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
    fetchComments: (data) => dispatch(fetchComments(data)),
    createComment: (body, author, parentId) => dispatch(createComment(body, author, parentId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);