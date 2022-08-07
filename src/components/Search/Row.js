import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Row = ({ name, about, handleClick }) => {
  return (
    <ListItem alignItems="flex-start">
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
      <IconButton sx={{ marginTop: 1 }} onClick={handleClick} >
        <ArrowForwardIosIcon />
      </IconButton>
    </ListItem>
  )
}
