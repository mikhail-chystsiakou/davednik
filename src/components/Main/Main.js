import * as React from 'react';
import styles from './Main.module.css';
import {
  Button, Box, IconButton
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentNode } from '../../features/graph/graphSlice';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

export default function Main() {
  const currentNode = useSelector(state => state.graph.currentNode);

  const dispatch = useDispatch();

  console.log(currentNode)
  return (
    <div className={styles.Main}>
      <Box className={styles.buttons}>
        <IconButton sx={{ backgroundColor: 'white' }} className={styles.big_rounded_button} >
          <PersonIcon className={styles.button_icon} />
        </IconButton>
        <IconButton sx={{ backgroundColor: "white" }} className={styles.big_rounded_button} >
          <SearchIcon className={styles.button_icon} />
        </IconButton>
      </Box>
    </div>
  )
}
