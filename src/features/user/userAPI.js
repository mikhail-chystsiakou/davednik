import { API_ADDRESS } from '../../const';

export function getUser(userId) {
  return fetch(`${API_ADDRESS}users/${userId}`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json()).then((responseData) => responseData.user);
}

export function editUser(user) {
  const id = user.id;
  return fetch(`${API_ADDRESS}users/${id.replace('users/', '')}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user) // body data type must match "Content-Type"
  }).then(res => res.json());
}

export function searchByTag(tag) {
  const tagTitle = tag //.replace(/[^0-9a-z]/gi, '')
  return fetch(`${API_ADDRESS}search/tag/${tag}`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json()).then((responseData) => responseData.users)
}

export function searchUser(user) {
  const userName = user.replace(/[^0-9a-z]/gi, '')
  return fetch(`${API_ADDRESS}search/name/${userName}`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json()).then((responseData) => responseData.users)
}
