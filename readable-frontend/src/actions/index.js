import * as readableAPI from '../utils/readableAPI';
import {constructComment} from '../utils/helper'

// categories
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
// General
export const COMMENT_VOTE ='COMMENT_VOTE'
export const SORT_BY = 'SORT_BY'
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS'
export const SET_POST_ID_STATUS = 'SET_POST_ID_STATUS'
// Modal
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const OPEN_MODAL = 'OPEN_MODAL'
// Comments
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'



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
export const editComment = (id, body) => dispatch => {
  const timestamp = Date.now();
  readableAPI
    .updateComment(id, timestamp, body)
    .then(comment => dispatch(addComment(comment)))
}
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

// Categories actions
export function receiveCategories (categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}
export const fetchCategories = () => dispatch => (
  readableAPI
    .getCategories()
    .then(data => dispatch(receiveCategories(data)))
)

// General app actions
export function sortBy (sort) {
  return {
    type: SORT_BY,
    sort
  }
}
export function isLoading (status) {
  return {
    type: SET_LOADING_STATUS,
    status
  }
}
export function isPostIdvalid (status) {
  return {
    type: SET_POST_ID_STATUS,
    status
  }
}

// Modal actions
export function closeModal () {
  return {
    type: CLOSE_MODAL
  }
}
export function openModal (role, editPostId, activeCategory) {
  return {
    type: OPEN_MODAL,
    role,
    editPostId,
    activeCategory
  }
}
