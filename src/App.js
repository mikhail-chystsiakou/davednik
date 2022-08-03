import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState, useCallback } from "react";
import DavednikGraph from './components/DavednikGraph';
import Main from './components/Main/Main';
import LoginForm from './components/Login/LoginForm.js';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
    ].join(','),
  },
  palette: {
    secondary: {
      main: "#000000",
    }
  }
});

export default function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const me = useSelector(state => state.user.user);

  return (
    <ThemeProvider theme={theme}>
      <LoginForm
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(!isDialogOpen)}
      />
      {
        (me && me._id) ?
          <>
            <Main />
            <DavednikGraph />
          </>
          : (!isDialogOpen &&
            <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
          )
      }
    </ThemeProvider>
  );
}
