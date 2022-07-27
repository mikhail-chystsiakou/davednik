import * as React from 'react';
import styles from './Main.module.css';
import { useSelector, useDispatch } from 'react-redux';
import FirstScreen from './FirstScreen';
import Profile from '../Profile/Profile';

export default function Main({ graphData, setGraphData }) {
  const screenId = useSelector(state => state.window.windowId);

  // console.log(user)
  let mainWidget;
  switch (screenId) {
    case 0:
      mainWidget = <FirstScreen />;
      break;
    case 1:
      mainWidget = <Profile setGraphData={setGraphData} />;
      break;
  }

  return (
    <div className={styles.Main}>
      {mainWidget}
    </div>
  )
}
