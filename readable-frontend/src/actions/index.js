import * as readableAPI from '../utils/readableAPI';

// Categories
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
// UI
export const SORT_BY = 'SORT_BY'
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS'
export const SET_POST_ID_STATUS = 'SET_POST_ID_STATUS'
// Modal
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const OPEN_MODAL = 'OPEN_MODAL'


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

// UI actions
export function sortBy (sort) {
  return {
    type: SORT_BY,
    sort
  }
}
export function isLoading (status) {
  return {
    type: SET_LOADING_STATUS,
    status
  }
}
export function isPostIdvalid (status) {
  return {
    type: SET_POST_ID_STATUS,
    status
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
