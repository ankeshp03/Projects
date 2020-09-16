import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import Routes from './CssRoutes';
import SideMenu from './../SideMenu';
import Header from './../Header';
import './cssArts-styles.scss';
import ArtsList from './cssArtsList.json';

const CssArts = ({ match, location: { state } }) => {
    const [showMenu, setMenuOpenStatus] = useState(false);
    let subUrl = window.location.href.split("/");
    subUrl = subUrl[subUrl.length - 1];
    let data = state ?? ArtsList.filter(art => art.path === subUrl)[0];
    return (
        <Container fluid className="cssArtsContainer wrapper">
            <Header header="Projects" subHeader="CSS Charts" url="#" subUrl="#cssarts" isMenuPresent={true} menuBtnClick={(shouldOpen) => setMenuOpenStatus(shouldOpen)} isMenuClosed={!showMenu} />
            <SideMenu title={"CSS Arts List"} menu={ArtsList} activeKey={data?.key} options={{ route: `${match.url}/` }} showMenu={showMenu} closeMenu={() => setMenuOpenStatus(false)} />
            <Row>
                <Col sm={12} lg={{ span: 10, offset: 2 }} className="animatCol">
                    <Routes url={match.url} data={data} />
                </Col>
            </Row>
        </Container>
    );
};

export default CssArts;