import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Toolbar extends Component  {
  static propTypes = {
    open: PropTypes.func.isRequired
  }
  render() {
    return (
        <div className="toolbar">
          <div className="addPost-container">
            <div className="greenButton" onClick={()=>this.props.open('create')}>Add New Post</div>
          </div>
          <div className="sortPosts-container">
           <label>Sort by:</label>
           <select>
              <option value="">Date</option>
              <option value="">Votes</option>
            </select>
          </div>
        </div>
    )
  }
}

export default Toolbar