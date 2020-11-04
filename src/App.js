import React from 'react';
import './App.css';
import ListOfChannels from './ListOfChannels';
import Menu from './Menu';

function App() {
  return (
    <div className="app">
      <Menu />
      <ListOfChannels />
    </div>
  );
}

export default App;
