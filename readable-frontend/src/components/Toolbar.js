import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortBy } from '../actions';

class Toolbar extends Component  {
  static propTypes = {
    openModal: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired
  }

  render() {
    const {category, openModal, sortBy, sorting} = this.props;
    return (
        <div className="toolbar">
          <div className="addPost-container">
            <div className="greenButton" onClick={()=>openModal('create', null, category)}>Add New Post</div>
          </div>
          <div className="sortPosts-container">
           <label>Sort by:</label>
           <select value={sorting} onChange={(event) => sortBy(event.target.value)}>
              <option value="date">Date</option>
              <option value="votes">Votes</option>
            </select>
          </div>
        </div>
    )
  }
}

function mapStateToProps ({sortBy}) {
  //Using Store to control select state
  return {sorting: sortBy}
}

function mapDispatchToProps (dispatch) {
  return {
    sortBy: (data) => dispatch(sortBy(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);