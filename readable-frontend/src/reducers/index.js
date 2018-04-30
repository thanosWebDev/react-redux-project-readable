import { combineReducers } from 'redux';

import {
  RECEIVE_CATEGORIES,
  SORT_BY,
  CLOSE_MODAL,
  OPEN_MODAL,
  GET_COMMENTS,
  COMMENT_VOTE,
  DELETE_COMMENT,
  SET_LOADING_STATUS
} from '../actions';
import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  GET_ALL_POSTS,
  POST_VOTE,
} from '../actions/posts';

// Categories reducer
function categories (state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES :
      return action.categories
    default :
      return state
  }
}

// Modal control reducer
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

// Sorting reducer
function sortBy (state = "timestamp", action) {
  switch (action.type) {
    case SORT_BY :
      return action.sort
    default :
      return state
  }
}

// isLoading reducer
function isLoading (state = true, action) {
  switch (action.type) {
    case SET_LOADING_STATUS :
      return action.status
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
        [post.id]: post
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

//Comments reducer
function comments (state = {}, action) {
  const {id, direction, comments} = action
  switch (action.type) {
    case GET_COMMENTS :
      return comments
    case DELETE_COMMENT :
      const { [action.commentId]: value, ...newState } = state;
      return newState
    case COMMENT_VOTE :
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
  comments,
  posts,
  sortBy,
  modal,
  isLoading
})