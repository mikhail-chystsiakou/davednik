import React from 'react';
import { Box, Button, InputBase } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import * as userAPI from '../../features/user/userAPI';
import { setSearchResult } from '../../features/user/userSlice';
import Results from './Results';
import search from '../../img/search.png';

export default function Search() {
  const [value, setValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const dispatch = useDispatch()

  console.log(searchResults.length);

  const fetchRequest = async (value) => {
    setValue(value);
    if (!value) {
      dispatch(setSearchResult([]))
      return;
    }
    let searchResult = [];
    if (value[0] === "#") {
      if (value.length > 1) {
        searchResult = await userAPI.searchByTag(value.slice(1))
      }
    } else {
      searchResult = await userAPI.searchUser(value)
    }
    setSearchResults(searchResult)
    dispatch(setSearchResult(searchResult.map(u => u._id)))
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        left: '2%',
        right: '2%',
        top: '2%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        maxHeight: '100%',
        justifyContent: 'flex-start'
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 5, paddingLeft: 3, paddingRight: 2, height: '3rem' }}>
        <InputBase
          placeholder="Поиск"
          inputProps={{ 'aria-label': 'search google maps' }}
          value={value}
          onChange={event => fetchRequest(event.target.value)}
          id="search"
          fullWidth
        />
        <img src={search} height={30} />        
      </Box>
      {(value != "") && <Results users={searchResults} />}
    </Box>
  )
}
