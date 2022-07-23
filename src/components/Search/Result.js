import React from "react";
import {
  Box, List, ListItem, IconButton,
  Avatar, ListItemAvatar, ListItemText
} from '@mui/material';
import styles from './Search.module.css'
import FolderIcon from '@mui/icons-material/Folder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function Result() {
  return (
    <Box className={styles.Container} sx={{ backgroundColor: 'white', borderRadius: 5 }} >
      <List dense={false} sx={{ maxHeight: '50hw', overflowY: "scroll" }}>
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

