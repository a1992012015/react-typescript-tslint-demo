import React from 'react';
import './App.css';
import logo from './logo.svg';

import FetchApiPage from './pages/FetchApiPage/FetchApiPage';

const App: React.FC = () => {
  return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo'/>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
              className='App-link'
              href='https://reactjs.org'
              target='_blank'
              rel='noopener noreferrer'
          >
            Learn React
          </a>
          <FetchApiPage/>
        </header>
      </div>
  );
};

export default App;