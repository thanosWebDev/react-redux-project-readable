// posts
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
// categories
export const GET_CATEGORIES = 'GET_CATEGORIES'
// General
export const POST_VOTE = 'POST_VOTE'
export const COMMENT_VOTE ='COMMENT_VOTE'
export const SORT_BY = 'SORT_BY'
// Modal
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const OPEN_MODAL = 'OPEN_MODAL'
// Comments
export const GET_COMMENTS = 'GET_COMMENTS'
export const DELETE_COMMENT = 'DELETE_COMMENT'


// Post actions
export function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}
export function deletePost (postId) {
  return {
    type: DELETE_POST,
    postId
  }
}
export function getAllPosts (posts) {
  return {
    type: GET_ALL_POSTS,
    posts
  }
}
export function editPost (id, title, body) {
  return {
    type: EDIT_POST,
    id,
    title,
    body
  }
}

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
export function getCategories (categories) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

// General app actions
export function postVote (direction, id) {
  return {
    type: POST_VOTE,
    direction,
    id
  }
}
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
