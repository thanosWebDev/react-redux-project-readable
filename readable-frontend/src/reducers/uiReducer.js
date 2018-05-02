import {
  SORT_BY,
  SET_LOADING_STATUS,
  SET_POST_ID_STATUS
} from '../actions';

const defaultUI = {
  isLoading: true,
  isPostIdvalid: true,
  sortBy: "timestamp"
}

export function ui (state = defaultUI, action) {
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

export default ui