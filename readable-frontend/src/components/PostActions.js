import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../actions';
import PropTypes from 'prop-types';
import * as readableAPI from '../utils/readableAPI';

class PostActions extends Component  {
  static propTypes = {
    id: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    redirect: PropTypes.func

  }

  // Deletes a post from server and store
  deletePost = (id) => {
    const {deletePost, redirect} = this.props;
    readableAPI.deletePost(id)
    deletePost(id);
    if (window.location.pathname.includes(id)){
      redirect('/')
    }
  }

  render() {
    const {id, openModal} = this.props;
    return (
      <div className="postActions">
        <div className="edit" onClick={()=>openModal('update', id)}>edit</div>
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