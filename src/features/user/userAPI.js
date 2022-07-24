import { API_ADDRESS } from '../../const';

export function getUser(userId) {
  return fetch(`${API_ADDRESS}users/${userId}`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json()).then((responseData) => responseData.user);
}


