import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './sideMenu-styles.scss';

const SideMenu = ({ menu = [], activeKey = "", options = {}, showMenu = false, closeMenu }) => {
    return (
        <Nav defaultActiveKey={activeKey} variant="pills" className={`sideMenu flex-column ${(options?.menuClass ?? "")}${showMenu ? "open" : ""} scrollbar`}>
            {
                menu?.map(item => {
                    return (
                        <Nav.Item key={item.key} className={`menuItem ${(options?.menuItemClass ?? "")}${(item?.isComplete ? "" : " strike")}`}>
                            <Nav.Link
                                as="div"
                                // href={`#${options?.route}${item.path}`}
                                eventKey={item.key}
                                className={`menuLinkContainer ${(options?.menuLinkClass ?? "")}`}
                            >
                                <Link to={{ pathname: `${options?.route}${item.path}`, state: item }} className="menuLink" onClick={() => closeMenu()}>
                                    {item.title}
                                </Link>
                            </Nav.Link>
                        </Nav.Item>
                    );
                })
            }
        </Nav>
    );
}

export default SideMenu;