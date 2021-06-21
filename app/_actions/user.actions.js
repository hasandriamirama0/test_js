import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
  login,
  logout,
  register
};

function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    userService.login(email, password)
      .then(
        (user) => {
          dispatch(success(user));
          window.location.hash = '/';
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) { return { type: 'USERS_LOGIN_REQUEST', user } }
  function success(user) { return { type: 'USERS_LOGIN_SUCCESS', user } }
  function failure(error) { return { type: 'USERS_LOGIN_FAILURE', error } }
}

function logout() {
  userService.logout();
  return { type: 'USERS_LOGOUT' };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user)
      .then(
        user => {
          dispatch(success());
          window.location.hash = '/login';
          dispatch(alertActions.success('Registration successful'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) { return { type: 'USERS_REGISTER_REQUEST', user } }
  function success(user) { return { type: 'USERS_REGISTER_SUCCESS', user } }
  function failure(error) { return { type: 'USERS_REGISTER_FAILURE', error } }
}
