import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Routes from './ChartRoutes';
import SideMenu from './../SideMenu';
import Header from './../Header';
import './d3Charts-styles.scss';
import ChartList from './chartsList.json';

const D3Charts = ({ match, location: { state } }) => {
    const [showMenu, setMenuOpenStatus] = useState(false);
    let subUrl = window.location.href.split("/");
    subUrl = subUrl[subUrl.length - 1];
    let data = state ?? ChartList.filter(art => art.path === subUrl)[0];
    return (
        <Container fluid className="d3ChartsContainer wrapper">
            <Header header="Projects" subHeader="D3 Charts" url="#" subUrl="#d3charts" isMenuPresent={true} menuBtnClick={(shouldOpen) => setMenuOpenStatus(shouldOpen)} isMenuClosed={!showMenu} />
            <SideMenu title={"Charts List"} menu={ChartList} activeKey={data?.key} options={{ route: `${match.url}/` }} showMenu={showMenu} closeMenu={() => setMenuOpenStatus(false)} />
            <Row>
                <Col sm={12} lg={{ span: 10, offset: 2 }} className="animatCol">
                    <Routes url={match.url} />
                </Col>
            </Row>
        </Container>
    );
};

export default D3Charts;