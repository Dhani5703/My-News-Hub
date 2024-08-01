import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../src/styles/Sidebar.css';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          {/* <NavLink to="/table" activeClassName="active">테이블</NavLink> */}
          <NavLink to="/table" className={(navData) => (navData.isActive ? "active-style" : 'none')}>테이블</NavLink>
        </li>
        <li>
        <NavLink to="/chart" className={(navData) => (navData.isActive ? "active-style" : 'none')}>차트</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
