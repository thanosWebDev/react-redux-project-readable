import {constructComment} from '../utils/helper'
import * as readableAPI from '../utils/readableAPI';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const COMMENT_VOTE ='COMMENT_VOTE'


// Comments actions

export function receiveComments (comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}
export const fetchComments = (post_id) => dispatch => {
  readableAPI
    .getComments(post_id)
    .then( data => dispatch(receiveComments(data)))
}
//-----------------------------------------
export function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}
export const createComment = (body, author, parentId) => dispatch => {
  const newComment = constructComment(body, author, parentId)
  readableAPI
    .addNewComment(newComment)
    .then( data => dispatch(addComment(data)))
}
//-----------------------------------------
export function deleteComment (commentId) {
  return {
    type: DELETE_COMMENT,
    commentId
  }
}
export const removeComment = (commentId) => dispatch => (
  readableAPI
    .eraseComment(commentId)
    .then(comment => dispatch(deleteComment(comment.id)))
)
//-----------------------------------------
export const editComment = (id, body) => dispatch => {
  const timestamp = Date.now();
  readableAPI
    .updateComment(id, timestamp, body)
    .then(comment => dispatch(addComment(comment)))
}
//-----------------------------------------
export function commentVote (id, voteScore) {
  return {
    type: COMMENT_VOTE,
    id,
    voteScore
  }
}
export const setCommentVote = (direction, id) => dispatch => (
  readableAPI
    .voteComment(direction, id)
    .then(comment => dispatch(commentVote(id, comment.voteScore)))
)
