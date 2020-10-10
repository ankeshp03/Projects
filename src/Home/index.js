import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Header from './../Header';
import ProjectList from './../ProjectList.json';
import './home-styles.scss';

const getCard = (project) => {
    return (
        <Card>
            <h5 className="title">{project.title}</h5>
            <p className="description mB0">{project.description}</p>
        </Card>
    );
}

const Home = () => {
    return (
        <Container fluid className="projectsContainer wrapper">
            <Header header="Projects" url="#" />
            <Row className="project-row">
                {
                    ProjectList.map(project => (
                        <Col key={project.key} md={4} sm={6} xs={12} className="mB20">
                            {
                                !project.newTab
                                    ? (
                                        <Link to={project.path} className="project" target={(project.newTab ? "_blank" : "_self")}>
                                            {getCard(project)}
                                        </Link>
                                    )
                                    : (
                                        <a href={project.path} className="project" target="_blank" rel="noopener noreferrer">
                                            {getCard(project)}
                                        </a>
                                    )
                            }
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
};

export default Home;