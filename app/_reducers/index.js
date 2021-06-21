import { combineReducers } from 'redux';
import { cars } from './cars.reducer';
import { comments } from './comments.reducer';
import { login } from './login.reducer';
import { register } from './register.reducer';

const rootReducer = combineReducers({
  cars,
  comments,
  login,
  register
});

export default rootReducer;
