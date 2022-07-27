import React from 'react';
import SearchInput from './SearchInput';
import Result from './Result';
import { Fade } from "react-awesome-reveal";

export default function Search() {
  return (
    <Fade
      style={{
        width: '100%',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <SearchInput />
    </Fade>
  )
}
