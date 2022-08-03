import React from 'react';
import { Box, Input, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../features/user/userSlice";
import { editUser } from "../../features/user/userAPI";

export default function About({ about, isMyProfile }) {
  const dispatch = useDispatch();
  const me = useSelector(state => state.user.user);
  const user = useSelector(state => state.graph.user);

  const editUserAbout = (newAbout) => {
    editUser({ id: me.id, about: newAbout });
    dispatch(setUser({ ...me, about: newAbout }));
  }
  return (
    <Box>
      <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>О себе</Typography>
      {
        (isMyProfile) ? <Input
          sx={{ fontSize: '0.9rem', fontWeight: 400, minWidth: "100%" }} multiline
          defaultValue={me.about} inputProps={{ maxLength: 400 }}
          onChange={(event) => editUserAbout(event.target.value)} /> :
          <Typography sx={{ fontSize: '0.9rem', fontWeight: 400 }}>{about}</Typography>
      }
    </Box>
  )
}
