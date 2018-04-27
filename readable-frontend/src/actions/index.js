export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const POST_VOTE = 'POST_VOTE'
export const SORT_BY = 'SORT_BY'


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
export function getCategories (categories) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}
export function postVote (direction, id) {
  return {
    type: POST_VOTE,
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