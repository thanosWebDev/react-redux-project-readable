import { combineReducers } from 'redux';

import {posts} from './postsReducer';
import {comments} from './commentsReducer';
import {ui} from './uiReducer';
import {modal} from './modalReducer';
import {categories} from './categoriesReducer';

export default combineReducers({
  categories,
  comments,
  posts,
  modal,
  ui
})