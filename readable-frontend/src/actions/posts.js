import {constructPost} from '../utils/helper'
import * as readableAPI from '../utils/readableAPI';
import {isLoading, isPostIdvalid} from '../actions'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const POST_VOTE = 'POST_VOTE'


// Post actions

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
      if (activeCategory === selectedCategory || activeCategory === "all") {
        dispatch(addPost(data))
      }
    })
}
//-----------------------------------
export const fetchPost = (postId) => dispatch => {
  readableAPI.getPost(postId)
    .then( post => {
      // Check if post id is valid
      if (post.error || !post.id) {
        dispatch(isPostIdvalid(false));
        dispatch(isLoading(false));
      } else {
        dispatch(receivePosts({[post.id]: post}));
        dispatch(isLoading(false));
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
export const removePost = (postId) => dispatch => (
  readableAPI
    .erasePost(postId)
    .then(data => dispatch(deletePost(data.id)))
)
//-----------------------------------
export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}
export const getPosts = (category) => dispatch => {
  if (category === 'all') { // for homepage
    readableAPI
    .getAllPosts()
    .then(data => {
      dispatch(receivePosts(data));
      dispatch(isLoading(false));
    })
  } else { // for specific category
    readableAPI
    .getCategoryPosts(category)
    .then(data => {
      dispatch(receivePosts(data));
      dispatch(isLoading(false));
    })
  }
}
//-----------------------------------
export const editPost = (id, title, body) => dispatch => (
  readableAPI
    .updatePost(id, title, body)
    .then(post => dispatch(addPost(post)))
)
//-----------------------------------
export function postVote (id, voteScore) {
  return {
    type: POST_VOTE,
    id,
    voteScore
  }
}
export const setPostVote = (direction, id) => dispatch => (
  readableAPI
    .votePost(direction, id)
    .then(post => dispatch(postVote(id, post.voteScore)))
)
