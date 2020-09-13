import React from 'react';
import { Navbar } from 'react-bootstrap';
import './header-styles.scss';

const Header = ({ title, url }) => {
    return (
        <Navbar bg="light" className="headerNav" fixed="top" expand="lg">
            <Navbar.Brand href={url}>{title}</Navbar.Brand>
        </Navbar>
    );
}

export default Header;