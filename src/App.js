import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import Main from './components/Main/Main';
import LoginForm from './components/Login/LoginForm.js';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { AppProvider } from './AppContext';

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
  const [sessionUser, setSessionUser] = useState(null);

  useEffect(() => {
    const _sessionUser = JSON.parse(localStorage.getItem('user'));
    if (_sessionUser) {
      setSessionUser(_sessionUser);
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        {(isDialogOpen) && <LoginForm
          isOpen={isDialogOpen} sessionUser={sessionUser}
          handleClose={() => setIsDialogOpen(!isDialogOpen)}
        />}
        {
          (me && me._id) ?
            <>
              <Main />
            </>
            : (!isDialogOpen &&
              <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
            )
        }
      </AppProvider>
    </ThemeProvider>
  );
}
