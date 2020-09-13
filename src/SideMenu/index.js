import React from 'react';
import { Nav } from 'react-bootstrap';
import './sideMenu-styles.scss';

const SideMenu = ({ menu = [], activeKey = "", options = {} }) => {
    return (
        <Nav defaultActiveKey={activeKey} variant="pills" className={`sideMenu flex-column ${(options?.menuClass ?? "")} scrollbar`}>
            {
                menu?.map(item => {
                    return (
                        <Nav.Item key={item.key} className={`menuItem ${(options?.menuItemClass ?? "")}${(item?.isComplete ? "" : " strike")}`}>
                            <Nav.Link
                                href={`#${options?.route}${item.path}`}
                                eventKey={item.key}
                                className={`menuLink ${(options?.menuLinkClass ?? "")}`}
                            >
                                {item.title}
                            </Nav.Link>
                        </Nav.Item>
                    );
                })
            }
        </Nav>
    );
}

export default SideMenu;