import {
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  COMMENT_VOTE,
  DELETE_COMMENT
} from '../actions/comments';

export function comments (state = {}, action) {
  const {id, comments, voteScore, comment} = action
  switch (action.type) {
    case RECEIVE_COMMENTS :
      return comments
    case ADD_COMMENT :
      return {
        ...state,
        [comment.id]: comment
      }
    case DELETE_COMMENT : {
      const { [action.commentId]: value, ...newState } = state;
      return newState
    }
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

export default comments