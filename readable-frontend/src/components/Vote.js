import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Vote extends Component  {
    static propTypes = {
        votes: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        voteRole: PropTypes.string.isRequired,
        submitVote: PropTypes.func.isRequired
    }

    render() {
    const {votes, id, voteRole, submitVote} = this.props;
    return (
            <div className={`votes v-${voteRole}`}>
                <div className={`arrow arrowUp-${voteRole}`} onClick={()=>submitVote('upVote', id)}></div>
                <div className={`voteNum vNum-${voteRole}`}>{votes || 0}</div>
                <div className={`arrow arrowDown-${voteRole}`} onClick={()=>submitVote('downVote', id)}></div>
            </div>
        )
    }
}

export default Vote;