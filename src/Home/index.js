import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Header from './../Header';
import ProjectList from './../ProjectList.json';
import './home-styles.scss';

const Home = () => {
    return (
        <Container fluid className="projectsContainer wrapper">
            <Header title="Projects" url="#home" />
            <Row className="project-row">
                {
                    ProjectList.map(project => (
                        <Col key={project.key} sm={4}>
                            <Link to={project.path} className="project">
                                <Card>
                                    <h5 className="title">{project.title}</h5>
                                    <p className="description mB0">{project.description}</p>
                                </Card>
                            </Link>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
};

export default Home;