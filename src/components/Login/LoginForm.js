import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TelegramLoginButton from 'react-telegram-login';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/user/userAPI';
import { getNeighbors } from '../../features/graph/graphAPI.js';
import { setUser, setNeighbors } from '../../features/user/userSlice';



const fakeUser = {
  id: 100,
  first_name: "mich" + Math.floor(Math.random() * 10),
  username: "mich_life",
  auth_date: 1658663402,
  hash: "d819754366d50443471464184ca64571552bc3b1f022b5641c84b363e8060135"
};


export default function LoginForm({ isOpen, handleClose }) {
  const dispatch = useDispatch();

  const handleTelegramResponse = response => {
    const name = response.first_name + (response.last_name ? " " + response.last_name : "");

    const addUserRequest = {
      id: response.id,
      user: response.username,
      name: name,
      about: "",
      tags: ""
    }

    const loadUserNeighbors = async () => {
      const userNeighbors = await getNeighbors(response.id);
      dispatch(setNeighbors(userNeighbors))
    }

    loginUser({ user: addUserRequest }).then(res => {
      console.log(res.user)
      dispatch(setUser(Object.assign({}, res.user)));
      try {
        loadUserNeighbors().catch(console.error);
      } catch (err) {
        console.error(err)
      }
    });
    handleClose();
  };

  const handleGuestLogin = () => {
    dispatch(setUser({ id: "guest", _id: "guest" }));
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Вход</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Для входа используйте Telegram
        </DialogContentText>
        <TelegramLoginButton dataOnauth={handleTelegramResponse} botName="lipenski_davednik_bot" />
        <Button onClick={() => handleTelegramResponse(fakeUser)}>Fake login</Button> <br />

        <Button onClick={() => handleGuestLogin()}>Войти гостем</Button>
      </DialogContent>
    </Dialog>
  )
}

