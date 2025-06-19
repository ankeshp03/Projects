import React, { useState, useEffect } from 'react';
import { Navbar } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import './header-styles.scss';
import { Link } from 'react-router-dom';

const Hamburger = ({ clickCallback, isOpen }) => {
    return (
        <div className={`hamburgerContainer${isOpen ? " open" : ""}`} onClick={clickCallback}>
            <div className="bar-1"></div>
            <div className="bar-2"></div>
            <div className="bar-3"></div>
        </div>
    );
};

const Header = ({ header, subHeader = null, url, subUrl = null, isMenuPresent = false, menuBtnClick, isMenuClosed }) => {
    const [isMenuOpen, setMenuOpenStatus] = useState(false);
    useEffect(() => {
        if(isMenuClosed) {
            setMenuOpenStatus(false);
        }
    }, [isMenuClosed]);
    return (
        <Navbar bg="light" className="headerNav" fixed="top" expand="lg">
            {
                isMenuPresent &&
                <Hamburger clickCallback={function () { setMenuOpenStatus(!isMenuOpen); menuBtnClick(!isMenuOpen); }} isOpen={!isMenuClosed ?? isMenuOpen} />
            }
            <Navbar.Brand as={Link} to={url}>{header}</Navbar.Brand>
            {
                subHeader &&
                <React.Fragment>
                    <FontAwesome name="chevron-right" className="seperator" />
                    <Navbar.Brand as={Link} to={subUrl ?? "/"}>{subHeader}</Navbar.Brand>
                </React.Fragment>
            }
        </Navbar>
    );
}

export default Header;