import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({userObj}) => (
    <nav>
        <ul>
            <li className="fill">
                <Link to="/">홈으로 가기</Link>
            </li>
            <li className="fill">
                <Link to="/profile">
                    {userObj.displayName}의 프로필
                </Link>
            </li>
        </ul>
    </nav>
)
export default Navigation;