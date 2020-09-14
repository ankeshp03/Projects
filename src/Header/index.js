import React from 'react';
import { Navbar } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import './header-styles.scss';

const Header = ({ header, subHeader = null, url, subUrl = null }) => {
    return (
        <Navbar bg="light" className="headerNav" fixed="top" expand="lg">
            <Navbar.Brand href={url}>{header}</Navbar.Brand>
            {
                subHeader &&
                <>
                    <FontAwesome name="chevron-right" className="mR10 seperator" />
                    <Navbar.Brand href={subUrl ?? "#"}>{subHeader}</Navbar.Brand>
                </>
            }
        </Navbar>
    );
}

export default Header;