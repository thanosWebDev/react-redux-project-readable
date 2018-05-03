import React from 'react';
import PropTypes from 'prop-types';

const Vote = ({votes, id, voteRole, submitVote}) => (
    <div className={`votes v-${voteRole}`}>
        <div className={`arrow arrowUp-${voteRole}`} onClick={()=>submitVote('upVote', id)}></div>
        <div className={`voteNum vNum-${voteRole}`}>{votes || 0}</div>
        <div className={`arrow arrowDown-${voteRole}`} onClick={()=>submitVote('downVote', id)}></div>
    </div>
)

Vote.propTypes = {
    votes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    voteRole: PropTypes.string.isRequired,
    submitVote: PropTypes.func.isRequired
}

export default Vote;