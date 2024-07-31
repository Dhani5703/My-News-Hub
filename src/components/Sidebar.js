import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink to="/table" activeClassName="active">테이블</NavLink>
        </li>
        <li>
          <NavLink to="/chart" activeClassName="active">차트</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
