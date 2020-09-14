import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import Routes from './ChartRoutes';
import SideMenu from './../SideMenu';
import Header from './../Header';
import './d3Charts-styles.scss';
import ChartList from './chartsList.json';

const D3Charts = ({ match }) => {
    return (
        <Container fluid className="d3ChartsContainer wrapper">
            <Header header="Projects" subHeader="D3 Charts" url="#" subUrl="#d3charts" />
            <Row>
                <Col sm={3} lg={2} className="sideMenuContainer animatCol">
                    <SideMenu title={"Charts List"} menu={ChartList} options={{ route: `${match.url}/` }} />
                </Col>
                <Col sm={9} lg={10} className="animatCol">
                    <Routes url={match.url} />
                </Col>
            </Row>
        </Container>
    );
};

export default D3Charts;