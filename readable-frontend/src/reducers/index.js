import { combineReducers } from 'redux';

import {
  RECEIVE_CATEGORIES,
  SORT_BY,
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_LOADING_STATUS,
  SET_POST_ID_STATUS
} from '../actions';
import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  RECEIVE_POSTS,
  POST_VOTE,
} from '../actions/posts';
import {
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  COMMENT_VOTE,
  DELETE_COMMENT
} from '../actions/comments';

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

// UI reducer
const defaultUI = {
  isLoading: true,
  isPostIdvalid: true,
  sortBy: "timestamp"
}
function ui (state = defaultUI, action) {
  switch (action.type) {
    case SET_LOADING_STATUS :
      return {
        ...state,
        isLoading: action.status}
    case SET_POST_ID_STATUS :
      return {
        ...state,
        isPostIdvalid: action.status}
    case SORT_BY :
      return {
        ...state,
        sortBy: action.sort}
    default :
      return state
  }
}

//Posts reducer
function posts (state = {}, action) {
  const {id, post, posts, voteScore} = action
  switch (action.type) {
    case RECEIVE_POSTS :
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
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: voteScore
        }
      }
    default :
      return state
  }
}

//Comments reducer
function comments (state = {}, action) {
  const {id, comments, voteScore, comment} = action
  switch (action.type) {
    case RECEIVE_COMMENTS :
      return comments
    case ADD_COMMENT :
      return {
        ...state,
        [comment.id]: comment
      }
    case DELETE_COMMENT :
      const { [action.commentId]: value, ...newState } = state;
      return newState
    case COMMENT_VOTE :
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: voteScore
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
  modal,
  ui
})