import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Components/Navbar.component.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Navbar />, div);
});
