import { authHeader, handleResponse } from '../_helpers';

export const carService = {
  add,
  update,
  getAll,
  getById,
  delete: _delete
};

function add(car) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader() },
    body: car
  };

  return fetch('http://localhost:4000/cars', requestOptions).then(handleResponse);
}

function update(_id, car) {
  const requestOptions = {
    method: 'PATCH',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  };

  return fetch(`http://localhost:4000/cars/${ _id }`, requestOptions).then(handleResponse);
}

function getAll() {
  const requestOptions = { method: 'GET' };

  return fetch('http://localhost:4000/cars', requestOptions).then(handleResponse);
}

function _delete(_id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`http://localhost:4000/cars/${ _id }`, requestOptions).then(handleResponse);
}

function getById(_id) {
  const requestOptions = { method: 'GET' };

  return fetch(`http://localhost:4000/cars/${ _id }`, requestOptions).then(handleResponse);
}
