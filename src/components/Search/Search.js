import React from 'react';
import { Box, InputBase } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import * as userAPI from '../../features/user/userAPI';
import { setSearchResult } from '../../features/user/userSlice';
import { openSearch, closeSearch } from '../../features/window/windowSlice';
import Results from './Results';

export default function Search() {
  const [value, setValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const profileIsOpen = useSelector(state => state.window.profileIsOpen);
  const dispatch = useDispatch()

  const fetchRequest = async (value) => {
    setValue(value);
    if (!value) {
      dispatch(setSearchResult([]));
      dispatch(closeSearch());
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
    dispatch(openSearch());
  }

  return (
    <>
      <Box
        sx={{
          position: 'absolute', zIndex: 10,
          top: 16, left: 5, right: 5,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box>
          <Box sx={{
            backgroundColor: "#FFFFFF", borderRadius: 10,
            width: '100%', display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <InputBase
              placeholder="Поиск"
              inputProps={{ 'aria-label': 'search google maps' }}
              value={value}
              onChange={event => fetchRequest(event.target.value.toLowerCase())}
              sx={{ width: '80%', maxWidth: 1000, backgroundColor: "#FFFFFF", marginLeft: 3 }}
              id="search"
            />
          </Box>
        </Box>
      </Box>
      {(value && !profileIsOpen) && <Results users={searchResults} />}
    </>
  )
}
