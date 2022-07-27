import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from "react";
import DavednikGraph from './components/DavednikGraph';
import Main from './components/Main/Main';
import LoginForm from './components/Login/LoginForm.js';

var data = {
  nodes: [
    { id: "Volha Lytkina", color: "#3050C1", name: "Volha" },
    { id: "B", color: "#ADA8A8" },
    { id: "C", color: "#ADA8A8" },
    { id: "D", color: "#ADA8A8" }],
  links: [
    { source: "Volha Lytkina", target: "B", value: 8 },
    { source: "Volha Lytkina", target: "C", value: 10 },
    { source: "Volha Lytkina", target: "D", value: 6 }
  ]
};

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
  const [graphData, setGraphData] = useState(data);
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
