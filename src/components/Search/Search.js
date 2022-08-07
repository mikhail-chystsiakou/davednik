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
  const [showResult, setShowResult] = React.useState(false);
  const dispatch = useDispatch()

  console.log(searchResults.length);

  const handleInput = (value) => {
    setValue(value);
    if (showResult === true){
      fetchRequest(value);
    }
  }

  const fetchRequest = async (value) => {
    setShowResult(true);
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
          onChange={event => handleInput(event.target.value)}
          id="search"
          fullWidth
        />
        <Button onClick={event => fetchRequest(value)} sx={{minWidth: 30, p:0}}>
          <img src={search} height={30} />
        </Button>
        
      </Box>
      {(showResult && value != "") && <Results users={searchResults} />}
    </Box>
  )
}
