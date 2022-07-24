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

