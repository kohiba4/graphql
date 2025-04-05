import logo from './logo.svg';
import './App.css';
import Counter from './components/counter';
import Login from './components/login';
import { useState } from 'react';



function App() {
  return (
    <div>
      <Login />
      {/* <Counter /> */}
    </div>
  );
}

export default App;
