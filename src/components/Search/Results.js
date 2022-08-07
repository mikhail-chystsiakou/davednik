import * as React from 'react';
import {
  List, Box,
  Divider,
} from '@mui/material';
import { Row } from './Row';
import { useDispatch } from 'react-redux';
import { setSelectedNode } from "../../features/graph/graphSlice";
import { closeProfile, openProfile } from '../../features/window/windowSlice';

export default function Results({ users }) {
  const dispatch = useDispatch();
  return (
    <Box sx={{ borderRadius: 5, marginTop: 1, padding: 1, backgroundColor: "#ffffff" }}>
      <List sx={{ width: '100%', overflowY: 'scroll' }}>
        {users.map((user, i) => <>
          <Row key={i} name={user.name} about={user.about} handleClick={() => {
            dispatch(openProfile());
            dispatch(setSelectedNode(user))
            console.log(user)
          }} />
          {(users.length - i > 1) && <Divider variant="inset" component="li" />}
        </>)}
      </List>
    </Box>
  );
}

