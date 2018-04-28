import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { commentVote } from '../actions';
import { postVote } from '../actions/posts';
import { connect } from 'react-redux';
import * as readableAPI from '../utils/readableAPI';

class Vote extends Component  {
    static propTypes = {
        votes: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        voteRole: PropTypes.string
    }

    // Update a post's votes in the server and the store
    vote = (direction, id) => {
        const {voteRole, postVote, commentVote} = this.props;
        if (voteRole === "post") {
            readableAPI.votePost(direction, id);
            postVote(direction, id);
        }
        if (voteRole === "comment") {
            readableAPI.voteComment(direction, id);
            commentVote(direction, id);
        }
    }

    render() {
    const {votes, id, voteRole} = this.props;
    return (
            <div className={`votes v-${voteRole}`}>
                <div className={`arrow arrowUp-${voteRole}`} onClick={()=>this.vote('upVote', id)}></div>
                <div className={`voteNum vNum-${voteRole}`}>{votes || 0}</div>
                <div className={`arrow arrowDown-${voteRole}`} onClick={()=>this.vote('downVote', id)}></div>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        postVote: (direction, id) => dispatch(postVote(direction, id)),
        commentVote: (direction, id) => dispatch(commentVote(direction, id))
    }
  }

export default connect(null, mapDispatchToProps)(Vote);