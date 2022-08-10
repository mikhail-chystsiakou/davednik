import { API_ADDRESS } from '../../const';

export async function getUser(userId) {
  console.log("getting user " + userId)
  return fetch(`${API_ADDRESS}/users/${userId}`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json()).then((responseData) => {
    console.log(responseData);
    return responseData.user
  });
}

export async function getUserByTgId(userTgId) {
  console.log("getting user " + userTgId)
  return fetch(`${API_ADDRESS}/users/tg/${userTgId}`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json()).then((responseData) => {
    console.log(responseData);
    return responseData.user
  });
}

export async function editUser(user) {
  console.log(user);
  return fetch(`${API_ADDRESS}/users/${user.id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user) // body data type must match "Content-Type"
  }).then(res => res.json());
}

export async function loginUser(user) {
  console.log("user id:")
  console.log(user.user.id)
  const possibleUser = await getUserByTgId(user.user.tgId);
  console.log("possible user: ")
  console.log(possibleUser);
  if (possibleUser === {} || !possibleUser) {  // If user doesnt exists - create new user
    const result = await fetch(`${API_ADDRESS}/users/${user.user.tgId}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user) // body data type must match "Content-Type"
    }).then(res => res.json());
    console.log(result)
    if (result.success) {
      return { user: { ...user, _id: result.success } }
    }
    return result;
  };
  console.log('possibleUser = ', possibleUser)
  return { user: possibleUser }; // if user already exists - return user
}


export async function searchByTag(tag) {
  return fetch(`${API_ADDRESS}/search/tag/${tag}`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json()).then((responseData) => responseData.users)
}

export async function searchUser(user) {
  return fetch(`${API_ADDRESS}/search/name/${user}`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json()).then((responseData) => responseData.users)
}
