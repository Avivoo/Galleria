import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';


const Header = () => {

    return (
        <div>
            <Nav className="navbar navbar-expand-md navbar-dark bg-dark  fixed-top">
                <NavItem>
                    <NavLink  href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/Artists">Artists</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/next-to-do">Next to do</NavLink>
                </NavItem>

            </Nav>
        
        </div >
    )
}

export default Header;