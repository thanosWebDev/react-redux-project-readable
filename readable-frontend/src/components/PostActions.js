import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../actions';
import PropTypes from 'prop-types';
import * as readableAPI from '../utils/readableAPI';

class PostActions extends Component  {
  static propTypes = {
    id: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired
  }

  // Deletes a post from server and store
  deletePost = (id) => {
    readableAPI.deletePost(id)
    this.props.deletePost(id);
  }

  render() {
    const {id} = this.props;
    return (
      <div className="postActions">
        <div className="edit" onClick={()=>this.props.openModal('update', id)}>edit</div>
        <div className="delete" onClick={() => this.deletePost(id)}>delete</div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    deletePost: (data) => dispatch(deletePost(data))
  }
}

export default connect(null, mapDispatchToProps)(PostActions);