import { combineReducers } from 'redux';

import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  GET_ALL_POSTS,
  GET_CATEGORIES,
  POST_VOTE,
  SORT_BY,
  CLOSE_MODAL,
  OPEN_MODAL
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

// Sorting reducer

const defaultModal = {
  open: false,
  role: "",
  editPostId: "",
  activeCategory: ""
}

function modal (state = defaultModal, action) {
  const {role, editPostId, activeCategory} = action;
  switch (action.type) {
    case OPEN_MODAL :
      return {
        open: true,
        role,
        editPostId,
        activeCategory
      }
    case CLOSE_MODAL :
      return defaultModal
    default :
      return state
  }
}

// Modal control reducer
function sortBy (state = "timestamp", action) {
  switch (action.type) {
    case SORT_BY :
      return action.sort
    default :
      return state
  }
}

//Posts reducer
function posts (state = {}, action) {
  const {id, title, body, direction, post, posts} = action
  switch (action.type) {
    case GET_ALL_POSTS :
      return posts
    case ADD_POST :
      return {
        ...state,
        [post.id]: post
      }
    case EDIT_POST :
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
    case POST_VOTE :
      const currentVote = state[id].voteScore;
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: direction === 'upVote' ? (currentVote + 1) : (currentVote - 1)
        }
      }
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  sortBy,
  modal
})