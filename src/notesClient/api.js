import { API_ADDRESS } from '../const';


export async function updateNote(author, user, note) {
  const relation = author.split('/')[1] + ":::" + user.split('/')[1];
  fetch(`${API_ADDRESS}/about/${relation}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: note
    })
  }).then(reponse => reponse.json()).catch(console.error)
}

export async function getNote(author, user) {
  const relation = author.split('/')[1] + ":::" + user.split('/')[1];
  return fetch(`${API_ADDRESS}/about/${relation}`)
    .then(res => res.json()).then((responseData) => {
      return responseData.note
    });
}
