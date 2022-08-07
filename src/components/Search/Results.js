import * as React from 'react';
import {
  List, Box,
  Divider,
  Typography,
} from '@mui/material';
import { Row } from './Row';
import { useDispatch } from 'react-redux';
import { setSelectedNode } from "../../features/graph/graphSlice";
import { closeProfile, openProfile } from '../../features/window/windowSlice';

export default function Results({ users }) {
  const dispatch = useDispatch();
  return (
    <Box sx={{ borderRadius: 5, marginTop: 1, paddingTop: 2, paddingBottom: 4, backgroundColor: "#ffffff", maxHeight: '80%'}}>
      <List sx={{ width: '100%', overflow: 'auto', height: '100%'}}>
        {users.length != 0 ? users.map((user, i) => <>
          <Row key={i} name={user.name} about={user.about} handleClick={() => {
            dispatch(openProfile());
            dispatch(setSelectedNode(user))
            console.log(user)
          }} />
          {(users.length - i > 1) && <Divider variant="inset" component="li" />}
        </>)
        : <Typography sx={{paddingLeft: 3}}>No results found</Typography>}
      </List>
    </Box>
  );
}

