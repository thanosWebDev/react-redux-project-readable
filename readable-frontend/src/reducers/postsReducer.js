import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  RECEIVE_POSTS,
  POST_VOTE,
} from '../actions/posts';


export function posts (state = {}, action) {
  const {id, post, posts, voteScore} = action;
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
    case DELETE_POST : {
      const { [action.postId]: value, ...newState } = state;
      return newState
    }
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

export default posts