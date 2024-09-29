import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div
    role='navigation'
    aria-label='Main menu'
    itemScope
    itemType='http://schema.org/SiteNavigationElement'
    >
      <div className="menu">
        <ul>
            <li><Link itemProp="url" to="/">Homepage</Link></li>
            <li><Link itemProp="url" to="/about">About</Link></li>
            <li><Link itemProp="url" to="/login">Login</Link></li>

        </ul>
    </div>
    </div>
  );
}

export default Menu;
