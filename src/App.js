import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from "react";
import DavednikGraph from './components/DavednikGraph';
import Main from './components/Main/Main';
import LoginForm from './components/Login/LoginForm.js';

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
  const [graphData, setGraphData] = useState({nodes:[], links:[]});
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const addUserNode = (user) => {
    setGraphData({
      nodes: [...graphData.nodes, { ...user }],
      links: graphData.links
    })
  }
  return (
    <ThemeProvider theme={theme}>
      <Main graphData={graphData} setGraphData={setGraphData} />
      <DavednikGraph graphData={graphData} setGraphData={setGraphData} />
      <LoginForm
        isOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(!isDialogOpen)}
        addNode={addUserNode}
      />
    </ThemeProvider>
  );
}
