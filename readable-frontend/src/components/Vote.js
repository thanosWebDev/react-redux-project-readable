import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { postVote } from '../actions';
import { connect } from 'react-redux';
import * as readableAPI from '../utils/readableAPI';

class Vote extends Component  {
    static propTypes = {
        votes: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
    }

    // Update a post's votes in the server and the store
    vote = (direction, id) => {
        readableAPI.votePost(direction, id);
        this.props.postVote(direction, id);
    }

    render() {
    const {votes, id} = this.props;
    return (
            <div className="votes">
                <div className="arrowUp" onClick={()=>this.vote('upVote', id)}></div>
                <div className="voteNum">{votes || 0}</div>
                <div className="arrowDown" onClick={()=>this.vote('downVote', id)}></div>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
      postVote: (direction, id) => dispatch(postVote(direction, id))
    }
  }

export default connect(null, mapDispatchToProps)(Vote);