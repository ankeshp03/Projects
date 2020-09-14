import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import Routes from './CssRoutes';
import SideMenu from './../SideMenu';
import Header from './../Header';
import './cssArts-styles.scss';
import ArtsList from './cssArtsList.json';

const CssArts = ({ match, location: { state } }) => {
    let subUrl = window.location.href.split("/");
    subUrl = subUrl[subUrl.length - 1];
    let data = state ?? ArtsList.filter(art => art.path === subUrl)[0];
    return (
        <Container fluid className="cssArtsContainer wrapper">
            <Header header="Projects" subHeader="CSS Charts" url="#" subUrl="#cssarts" />
            <Row>
                <Col sm={3} lg={2} className="sideMenuContainer animatCol">
                    <SideMenu title={"CSS Arts List"} menu={ArtsList} activeKey={data?.key} options={{ route: `${match.url}/` }} />
                </Col>
                <Col sm={9} lg={10} className="animatCol">
                    <Routes url={match.url} data={data} />
                </Col>
            </Row>
        </Container>
    );
};

export default CssArts;