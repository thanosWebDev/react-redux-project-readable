import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {capitalize} from '../utils/helper'

class Header extends Component  {

  static propTypes = {
    categories: PropTypes.array.isRequired
  }

  render() {
    const {categories} = this.props;

    return (
      <header>
        <h1 className="logo">Readable</h1>
        <p className="subtitle">Everythging worth reading</p>
        <nav>
          <div className="menu">
            <a className="menu-item" href="/">Home</a>
            {categories.map((category, index) => (
              <a className="menu-item" href={`/${category.path}`} key={index}>{capitalize(category.name)}</a>
            ))}
          </div>
        </nav>
      </header>
    )
  }
}

export default Header