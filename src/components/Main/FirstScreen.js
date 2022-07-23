import React from "react";
import {
  Button, Box, IconButton
} from '@mui/material';
import styles from './Main.module.css'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch } from "react-redux";
import { setWindowId } from '../../features/window/windowSlice';


export default function FirstScreen() {
  const dispatch = useDispatch();

  return (
    <Box className={styles.buttons}>
      <IconButton
        sx={{ backgroundColor: 'white' }}
        className={styles.big_rounded_button}
        onClick={() => dispatch(setWindowId(1))}
      >
        <PersonIcon className={styles.button_icon} />
      </IconButton>
      <IconButton
        sx={{ backgroundColor: "white" }}
        className={styles.big_rounded_button}
        onClick={() => dispatch(setWindowId(2))}
      >
        <SearchIcon className={styles.button_icon} />
      </IconButton>
    </Box>

  )
}

