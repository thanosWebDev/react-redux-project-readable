import {
  CLOSE_MODAL,
  OPEN_MODAL
} from '../actions';

const defaultModal = {
  open: false,
  role: "",
  editPostId: "",
  activeCategory: ""
}

export function modal (state = defaultModal, action) {
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

export default modal