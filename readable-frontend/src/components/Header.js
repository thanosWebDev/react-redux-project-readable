import React from 'react';
import PropTypes from 'prop-types';
import {capitalize} from '../utils/helper';
import { NavLink } from 'react-router-dom';
import Home from 'react-icons/lib/fa/home';

const Header = ({categories}) => (
  <header>
    <h1 className="logo">Readable</h1>
    <p className="subtitle">Everythging worth reading</p>
    <nav>
      <div className="menu">
        <NavLink exact to='/' className="menu-item"><Home /></NavLink>
        {categories.map((category, index) => (
          <NavLink to={`/${category.path}`} className="menu-item" key={index}>{capitalize(category.name)}</NavLink>
        ))}
      </div>
    </nav>
  </header>
)


Header.propTypes = {
  categories: PropTypes.array.isRequired
}

export default Header