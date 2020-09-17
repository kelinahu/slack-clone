import React from 'react';
import './Header.css';
import { Avatar } from '@material-ui/core';
import { AccessTime, Search, HelpOutline } from '@material-ui/icons';
import { useStateValue } from './StateProvider';

function Header() {
    const [{ user }] = useStateValue();
    return (
        <div className="header">
            <div className="header_left">
                <Avatar
                className="header_avatar"
                alt={user?.displayName}
                src={user?.photoURL}
                />
                <AccessTime/>
            </div>
            <div className="header_search">
                <Search/>
                <input placeholder="Search..."/>
            </div>
            <div className="header_right">
                <HelpOutline/>
            </div>
        </div>
    )
}

export default Header
