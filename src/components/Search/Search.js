import React from 'react';
import SearchInput from './SearchInput';
import Result from './Result';
import styles from './Search.module.css';


export default function Search() {
  return (
    <div
      style={{
        width: '100%', height: '50%',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Result />
      <div></div>
      <SearchInput />
    </div>
  )
}
