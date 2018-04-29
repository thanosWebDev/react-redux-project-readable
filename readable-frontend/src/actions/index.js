import * as readableAPI from '../utils/readableAPI';

// categories
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
// General
export const COMMENT_VOTE ='COMMENT_VOTE'
export const SORT_BY = 'SORT_BY'
// Modal
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const OPEN_MODAL = 'OPEN_MODAL'
// Comments
export const GET_COMMENTS = 'GET_COMMENTS'
export const DELETE_COMMENT = 'DELETE_COMMENT'



// Comments actions
export function getComments (comments) {
  return {
    type: GET_COMMENTS,
    comments
  }
}
export function deleteComment (commentId) {
  return {
    type: DELETE_COMMENT,
    commentId
  }
}

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
export function commentVote (direction, id) {
  return {
    type: COMMENT_VOTE,
    direction,
    id
  }
}
export function sortBy (sort) {
  return {
    type: SORT_BY,
    sort
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
