import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Toolbar extends Component  {
  static propTypes = {
    openModal: PropTypes.func.isRequired,
    sortBy: PropTypes.func.isRequired,
    sorting: PropTypes.string.isRequired
  }

  render() {
    const {openModal, sortBy, sorting} = this.props;
    return (
        <div className="toolbar">
          <div className="addPost-container">
            <div className="greenButton" onClick={openModal}>Add New Post</div>
          </div>
          <div className="sortPosts-container">
           <label>Sort by:</label>
           <select value={sorting} onChange={(event) => sortBy(event.target.value)}>
              <option value="timestamp">Date</option>
              <option value="voteScore">Votes</option>
              <option value="commentCount">Comments</option>
            </select>
          </div>
        </div>
    )
  }
}

export default Toolbar