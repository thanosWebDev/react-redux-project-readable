import {constructPost} from '../utils/helper'
import * as readableAPI from '../utils/readableAPI';

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const POST_VOTE = 'POST_VOTE'



export function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}
export const createPost = (postData, activeCategory, selectedCategory) => dispatch => {
  const newPost = constructPost(postData)
  readableAPI.addNewPost(newPost)
    .then( data => {
      if (activeCategory === selectedCategory || activeCategory === "") {
        dispatch(addPost(data))
      }
    })
}
//-----------------------------------
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
//-----------------------------------
export const editPost = (id, title, body) => dispatch => (
  readableAPI
    .updatePost(id, title, body)
    .then(post => dispatch(addPost(post)))
)
//-----------------------------------
export function postVote (direction, id) {
  return {
    type: POST_VOTE,
    direction,
    id
  }
}
