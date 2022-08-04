import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from "react";
import Main from './components/Main/Main';
import LoginForm from './components/Login/LoginForm.js';
import { useDispatch, useSelector } from 'react-redux';
import { AppProvider, useApp } from "./AppContext";

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
  const dispatch = useDispatch();
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <LoginForm
          isOpen={isDialogOpen}
          handleClose={() => setIsDialogOpen(!isDialogOpen)}
        />
        {
          (me && me._id) ?
            <Main />
            : (!isDialogOpen &&
              <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
            )
        }
      </AppProvider>
    </ThemeProvider>
  );
}
