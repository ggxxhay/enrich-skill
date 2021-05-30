import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function PersonsInfo(props) {
    // const data = props.location.state;
    const data = props.data;

    return (
        <React.Fragment>
            <Row>
                <Col>Id: {data.id}</Col>
                <Col>Name: {data.name}</Col>
            </Row>
            <Row>
                <Col>Address: {data.address}</Col>
                <Col>Job: {data.job}</Col>
            </Row>
        </React.Fragment>
    )
}