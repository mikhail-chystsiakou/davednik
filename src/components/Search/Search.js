import React from 'react';
import { Box, TextField, InputBase } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import * as userAPI from '../../features/user/userAPI';
import { setSearchResult } from '../../features/user/userSlice';

export default function Search() {
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch()

  const fetchRequest = async (value) => {
    setValue(value)
    if (!value) return;
    let searchResult = [];
    if (value[0] === "#") {
      if (value.length > 1) {
        searchResult = await userAPI.searchByTag(value.slice(1))
      }
    } else {
      searchResult = await userAPI.searchUser(value)
    }
    dispatch(setSearchResult(searchResult.map(u => u._id)))
  }

  return (
    <Box
      sx={{
        position: 'absolute', zIndex: 10,
        top: 32, left: 32, right: 32,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box sx={{
        backgroundColor: "#FFFFFF", borderRadius: 10,
        width: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <InputBase
          placeholder="Поиск"
          inputProps={{ 'aria-label': 'search google maps' }}
          value={value}
          onChange={event => fetchRequest(event.target.value)}
          sx={{ width: '80%', maxWidth: 1000, backgroundColor: "#FFFFFF", marginLeft: 3 }}
        />
      </Box>
    </Box>
  )
}
