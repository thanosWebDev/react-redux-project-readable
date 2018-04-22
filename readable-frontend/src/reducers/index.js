import { combineReducers } from 'redux';

import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  GET_ALL_POSTS,
  GET_CATEGORIES
} from '../actions';

// Categories reducer
function categories (state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES :
      return action.categories
    default :
      return state
  }
}

//Posts reducer
function posts (state = {}, action) {
  switch (action.type) {
    case GET_ALL_POSTS :
      return action.posts
    case ADD_POST :
      const {post} = action;
      return {
        ...state,
        [post.id]: post
      }
    case EDIT_POST :
      const {id, title, body} = action;
      return {
        ...state,
        [id]: {
          ...state[id],
          title: title,
          body: body
        }
      }
    case DELETE_POST :
      const { [action.postId]: value, ...newState } = state;
      return newState
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
})