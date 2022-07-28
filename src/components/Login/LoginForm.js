import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TelegramLoginButton from 'react-telegram-login';
import { useDispatch } from 'react-redux';
import { setLoginedUser } from '../../features/graph/graphSlice'
import { pushUser } from '../../features/graph/graphAPI';
import { setUser } from '../../features/user/userSlice';



const fakeUser = {
  "id":  Math.floor(245924085 * Math.random()),
  "first_name": "mich" + Math.floor(Math.random() * 10),
  "username": "mich_life",
  "auth_date": 1658663402,
  "hash": "d819754366d50443471464184ca64571552bc3b1f022b5641c84b363e8060135"
};


export default function LoginForm({ isOpen, handleLogin, handleClose }) {
  const dispatch = useDispatch();

  const handleTelegramResponse = response => {

    const name = response.first_name + (response.last_name ? " " + response.last_name : "");
    const user = {
      _id: null,
      id: response.username,
      color: "#3050C1",
      name: name,
      tags: [],
    }

    const addUserRequest = {
      id: response.id,
      user: "@" + response.username,
      name: name,
    }

    pushUser({ user: addUserRequest }).then(res => {
      handleLogin(user);
      user._id = res.success;
      dispatch(setUser({ ...user }));
      dispatch(setLoginedUser({ ...user }));
    });
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

        <Button onClick={handleClose}>Войти гостем</Button>
      </DialogContent>
    </Dialog>
  )
}

