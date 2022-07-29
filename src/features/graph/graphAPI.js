import { API_ADDRESS } from '../../const';

export function loadAllUsers() {
  return fetch(`${API_ADDRESS}users/`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json()).then((responseData) => responseData.users);
}

export function loadAllEdges() {
  return fetch(`${API_ADDRESS}edges/`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json()).then((responseData) => responseData.edges);
}

export async function connectUsers(link) {
  return fetch(`${API_ADDRESS}edges/`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(link)
  }).then(res => res.json());
}

export async function disconnectUsers(link) {
  return fetch(`${API_ADDRESS}edges/`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(link)
  }).then(res => res.json());
}


export async function getNeighbors(userId) {
  return fetch(`${API_ADDRESS}users/neighbors/${userId}`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json()).then((responseData) => responseData.users.map(user => user._id));
}
