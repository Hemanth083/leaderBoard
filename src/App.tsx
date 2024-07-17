// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Leaderboard from './leaderBoard';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Leaderboard />
      </div>
    </Provider>
  );
};

export default App;
