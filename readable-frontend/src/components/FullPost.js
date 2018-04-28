import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {capitalize, dateConvert} from '../utils/helper'

class FullPost extends Component  {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  render() {
    const {post} = this.props;
    return (
      <div className="fullPost">
          <p className="fullpostInfo"><span className="greenText">{capitalize(post.author)}</span> • {dateConvert(post.timestamp)} • {capitalize(post.category)}</p>
          <h1 className="fullpostTitle">{post.title}</h1>
          <p className="fullpostBody">{post.body}</p>
      </div>
    )
  }
}

export default FullPost