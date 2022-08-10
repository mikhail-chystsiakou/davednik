import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Row = ({ name, about, handleClick }) => {
  return (
    <ListItem alignItems="flex-start" onClick={handleClick}>
      <ListItemAvatar>
        <Avatar alt={name} src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <React.Fragment>
            {about}
          </React.Fragment>
        }
      />
      <IconButton sx={{ marginTop: 1 }} >
        <ArrowForwardIosIcon />
      </IconButton>
    </ListItem>
  )
}
