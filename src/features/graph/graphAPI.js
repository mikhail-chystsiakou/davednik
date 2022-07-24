import { API_ADDRESS } from '../../const';

export function loadAllUsers() {
  return fetch(`${API_ADDRESS}users/`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json()).then((responseData) => responseData.users);
}

export function pushUser(user) {
  return fetch(`${API_ADDRESS}users/${user.id}`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user) // body data type must match "Content-Type"
  }).then(res => res.json());
}

export function loadAllEdges() {
  return fetch(`${API_ADDRESS}edges/`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json()).then((responseData) => responseData.edges);
}

