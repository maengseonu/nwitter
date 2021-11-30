import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">홈</Link>
      </li>
      <li>
        <Link to="/Profile">{userObj.displayName}의 프로필</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
