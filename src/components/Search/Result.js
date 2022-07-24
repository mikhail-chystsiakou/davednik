import React from "react";
import {
  Box, List, ListItem, IconButton,
  Avatar, ListItemAvatar, ListItemText,
  Button
} from '@mui/material';
import styles from './Search.module.css'
import FolderIcon from '@mui/icons-material/Folder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch } from "react-redux";
import { setWindowId } from '../../features/window/windowSlice';
import close from '../../img/close.png';


function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function Result() {
  const dispatch = useDispatch();
  return (
    <Box className={styles.Container} sx={{ backgroundColor: 'white', borderRadius: 5 }} >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }} >
        <Box sx={{ display: 'flex', gap: 3 }}>
        </Box>
        <IconButton onClick={() => dispatch(setWindowId(0))} variant="text">
          <img src={close} width={20} height={20} />
        </IconButton>
      </Box>
      <List dense={false} sx={{ maxHeight: '50hw', overflowY: "scroll", paddging: 5 }}>
        {generate(
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <ArrowForwardIosIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Single-line item"
              secondary={'Secondary text'}
            />
          </ListItem>,
        )}
      </List>
    </Box>
  )
}

