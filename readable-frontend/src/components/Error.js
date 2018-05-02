import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => (
  <div className="errorPage">
    <h2>Error 404: Page not found :-(</h2>
    <p>The page you are looking for does not exist.<br/>Please use the menu to navigate.</p>
    <Link to="/" className="returnLink"> &#8592; Back to homepage</Link>
  </div>
)

export default Error