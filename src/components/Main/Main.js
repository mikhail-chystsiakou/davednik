import * as React from 'react';
import styles from './Main.module.css';
import { useSelector, useDispatch } from 'react-redux';
import FirstScreen from './FirstScreen';
import Profile from '../Profile/Profile';
import Search from '../Search/Search';

export default function Main() {
  const screenId = useSelector(state => state.window.windowId);

  const dispatch = useDispatch();

  let mainWidget;
  switch (screenId) {
    case 0:
      mainWidget = <FirstScreen />;
      break;
    case 1:
      mainWidget = <Profile />;
      break;
    case 2:
      mainWidget = <Search />
      break;
  }

  return (
    <div className={styles.Main}>
      {mainWidget}
    </div>
  )
}
