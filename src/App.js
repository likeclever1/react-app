import React from 'react';
import Todos from './components/Todos';

import logo from './logo.svg';
import './App.css';

const App = () => {
    return (
      <div className="App">
        <div className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h2>Todo List!</h2>
        </div>

        <Todos />
      </div>
    );
};

export default App;
