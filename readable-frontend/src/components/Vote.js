import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Vote extends Component  {
    static propTypes = {
        votes: PropTypes.number.isRequired
    }

    render() {
    const {votes} = this.props;
    return (
            <div className="votes">
                <div className="arrowUp"></div>
                <div className="voteNum">{votes}</div>
                <div className="arrowDown"></div>
            </div>
        )
    }
}

export default Vote