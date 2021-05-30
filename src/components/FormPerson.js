import React from "react"
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Modes } from "../constants/Common";

export default class FormPerson extends React.Component {
    constructor(props) {
        super(props);
        let title, action;
        if (this.props.mode === Modes.create) {
            title = 'New Person';
            action = 'Create';
        } else {
            title = 'Edit Person';
            action = 'Update';
        }
        this.state = { // Q&A: should use this.state.data?
            title: title,
            action: action,
            id: this.props.data.id,
            name: this.props.data.name,
            age: this.props.data.age,
            address: this.props.data.address,
            job: this.props.data.job,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    onSubmit() {
        let data = {
            id: this.state.id,
            name: this.state.name,
            age: this.state.age,
            address: this.state.address,
            job: this.state.job,
        };
        this.props.onSubmit(true, data);
    }

    render() {
        return (
            <React.Fragment>
                <Row className="justify-content-center">
                    <h1>{this.state.title}</h1>
                </Row>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group as={Row} controlId="name" >
                        <Form.Label column sm={2}>
                            Name:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Name" value={this.state.name} onChange={this.onChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="age">
                        <Form.Label column sm={2}>
                            Age:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="number" placeholder="Age" value={this.state.age} onChange={this.onChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="address">
                        <Form.Label column sm={2}>
                            Address:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Address" value={this.state.address} onChange={this.onChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={{ offset: 2, span: 1 }} className="justify-content-around">
                            <Button type="submit">{this.state.action}</Button>
                        </Col>
                        <Col sm={9}>
                            <Button type="button" variant="secondary" onClick={() => this.props.onSubmit(false)}>Cancel</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </React.Fragment>
        );
    }
}