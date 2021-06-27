import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isInputValid, setIsInputValid] = useState(false);

    useEffect(() => {
        const timoutId = setTimeout(() => {
            setIsInputValid(
                email.includes("@") && password.trim().length >= 6
            );
        }, 100); // if timeout is too long, will cause bug in case set input status from valid to invalid, submit button still enable before timeout.

        return () => {
            clearTimeout(timoutId);
        }
    }, [email, password])

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.onLoggedIn();
    }

    return (
        <React.Fragment>
            <Row className="justify-content-center">
                <h1>Login</h1>
            </Row>
            <Form onSubmit={onSubmit}>
                <Form.Group as={Row} controlId="email" >
                    <Form.Label column sm={2}>
                        Email:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="email" value={email} onChange={onEmailChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="password">
                    <Form.Label column sm={2}>
                        Password:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="password" value={password} onChange={onPasswordChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ offset: 2, span: 1 }} className="justify-content-around">
                        <Button type="submit" disabled={!isInputValid}>Login</Button>
                    </Col>
                </Form.Group>
            </Form>
        </React.Fragment>
    )
}