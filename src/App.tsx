import React from 'react';
import Header from "./components/Header";
import Game from "./components/Game";
import "./App.css";

const App: React.FC = () => {
  return (
    <div id="sudoku">
      <Header />
      <Game />
    </div>
  );
}

export default App;
