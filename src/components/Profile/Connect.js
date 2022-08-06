import React from "react";
import { useApp } from '../../AppContext';
import { styled } from '@mui/material/styles';
import { connectUsers, disconnectUsers } from '../../features/graph/graphAPI';
import { addNeighbor, removeNeighbor } from '../../features/user/userSlice';
import {
  Avatar, Box, Button, Typography, Input
} from '@mui/material';
import { useDispatch } from "react-redux";


const ConnectButton = styled(Button)({
  color: "#FFFFFF",
  backgroundColor: "#3050C1",
  '&:hover': {
    backgroundColor: "#3050C1",
  },
  borderRadius: 20,
  fontSize: 10,
  fontWeight: 200,
  width: 80
});

const DisconnectButton = styled(Button)({
  color: "#FFFFFF",
  backgroundColor: "#c13050",
  '&:hover': {
    backgroundColor: "#c13050",
  },
  borderRadius: 20,
  fontSize: 10,
  fontWeight: 200,
  width: 80
});

export const Connect = ({ isConnected, from, to }) => {
  const dispatch = useDispatch();
  const { connectNodes, disconnectNodes } = useApp();
  if (isConnected) {
    return (
      <ConnectButton variant="contained" onClick={() => {
        const createEdge = async () => {
          dispatch(addNeighbor(to));
          await connectNodes({ from: from, to: to });
          await connectUsers({ from: from, to: to });
        }
        createEdge().catch(console.error);
      }}>Connect</ConnectButton>
    )
  }
  return (
    <DisconnectButton variant="contained" onClick={() => {
      const deleteEdge = async () => {
        dispatch(removeNeighbor(to));
        await disconnectNodes({ from: from, to: to });
        await disconnectUsers({ from: from, to: to });
      }
      deleteEdge().catch(console.error);
    }}>Disconnect</DisconnectButton>
  )
}
