import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from "react";
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
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const me = useSelector(state => state.user.user);

  const connectNodes = (from, to) => {
    setGraphData(() => {
      return {
        nodes: graphData.nodes,
        links: [...graphData.links, { source: from, target: to }]
      };
    });
  }

  const disconnectNodes = (from, to) => {
    setGraphData(() => {
      return {
        nodes: graphData.nodes,
        links: graphData.links.filter(link => (link.source.id !== from || link.target.id !== to)),
      };
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <LoginForm
          isOpen={isDialogOpen}
          handleClose={() => setIsDialogOpen(!isDialogOpen)}
        />
        {
          (me && me._id) ?
            <>
              <Main
                graphData={graphData} setGraphData={setGraphData}
                connectNodes={connectNodes}
                disconnectNodes={disconnectNodes}
              />
            </>
            : (!isDialogOpen &&
              <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
            )
        }
      </AppProvider>
    </ThemeProvider>
  );
}
