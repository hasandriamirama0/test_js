import { authHeader, handleResponse } from '../_helpers';

export const commentService = {
  add,
  update,
  getAll,
  delete: _delete
};

function add(car_id, comment) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  };

  return fetch(`http://localhost:4000/cars/${ car_id }/add-comment`, requestOptions).then(handleResponse);
}

function update(_id, comment) {
  const requestOptions = {
    method: 'PATCH',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  };

  return fetch(`http://localhost:4000/cars/update-comment/${ _id }`, requestOptions).then(handleResponse);
}

function getAll(car_id) {
  const requestOptions = { method: 'GET' };

  return fetch(`http://localhost:4000/cars/${ car_id }/comments`, requestOptions).then(handleResponse);
}

function _delete(_id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`http://localhost:4000/cars/delete-comment/${ _id }`, requestOptions).then(handleResponse);
}
