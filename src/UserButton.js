import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Trans} from "@lingui/macro";
import jwtDecode from 'jwt-decode';
import {LoginButton} from "./LoginModal";
import {addListener, EVENT_TYPE} from "./eventManager";

export const UserButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isProfileMenuOpen = Boolean(anchorEl);

    const getUserFromLocalStorage = () => {
        let user = null;
        if (localStorage.getItem('token') !== null) {
            user = jwtDecode(localStorage.getItem('token'));
        }
        return user;
    }
    const [user, setUser] = useState(getUserFromLocalStorage());

    addListener(event => {
        if (event.type === EVENT_TYPE.LOGIN) {
            setUser(getUserFromLocalStorage());
        }
    });

    const handleUserButtonClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        handleMenuClose();
    };

    const profileMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isProfileMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}><Trans>Logout</Trans></MenuItem>
        </Menu>
    );

    return <>
        {user ? <Button color="inherit" onClick={handleUserButtonClick}>{user.name}</Button> : <LoginButton/>}
        {profileMenu}
    </>;
};
