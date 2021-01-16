import React from 'react';
import {
  Link
} from "react-router-dom";

function Menu() {
  return (
    <nav className="menu">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/todo">Todo</Link></li>
      </ul>
    </nav>
  );
}

export default Menu;