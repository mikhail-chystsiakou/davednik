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

