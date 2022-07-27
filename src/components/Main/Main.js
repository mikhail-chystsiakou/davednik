import * as React from 'react';
import styles from './Main.module.css';
import { useSelector } from 'react-redux';
import FirstScreen from './FirstScreen';
import Profile from '../Profile/Profile';
import Search from '../Search/Search';

export default function Main({ graphData, setGraphData }) {
  const screenId = useSelector(state => state.window.windowId);

  let mainWidget = [
    <FirstScreen />,
    <Profile setGraphData={setGraphData} />,
    <Search />
  ][screenId];

  return (
    <div className={styles.Main}>
      {mainWidget}
    </div>
  )
}
