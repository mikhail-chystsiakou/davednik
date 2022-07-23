import * as React from 'react';
import styles from './Main.module.css';
import {
  Button, Box, Paper
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentNode } from '../../features/graph/graphSlice';

export default function Main() {
  const currentNode = useSelector(state => state.graph.currentNode);

  const dispatch = useDispatch();

  console.log(currentNode)
  return (
    <div className={styles.Main}>
      <div className={styles.buttons}>
        <Paper elevation={3} className={styles.big_rounded_button} onClick={() => {
          dispatch(setCurrentNode({ id: Math.random() }))
        }}> Text </Paper>
        <Paper elevation={3} className={styles.big_rounded_button}> Text </Paper>
        <Button variant='contained' onClick={() => {
          dispatch(setCurrentNode({ id: Math.random(), x: Math.random() * 100, y: Math.random() * 10 }))
        }}> {(currentNode.id === 0) ? 0 : (+(currentNode.id * 100))} </Button>
      </div>
    </div>
  )
}
