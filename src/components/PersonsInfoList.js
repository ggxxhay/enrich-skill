import React from 'react';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import FormPerson from './FormPerson';
import { Modes } from '../constants/Common'

export default class PersonsInfoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            mode: Modes.view,
        }
        this.addNewPerson = this.addNewPerson.bind(this);
        this.deletePerson = this.deletePerson.bind(this);
        this.editPerson = this.editPerson.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    addNewPerson() {
        this.setState({
            mode: Modes.create,
            formData: { id: 0, name: "", age: 18, address: "" },
        })
    }

    editPerson(index) {
        this.setState({
            mode: Modes.edit,
            formData: this.state.data[index],
        })
    }

    submitForm(isSubmitted, formData) {
        if (isSubmitted) {
            let data = this.state.data;
            let maxId = 1;
            if (this.state.mode === Modes.create) {
                if (data.length > 0) {
                    maxId = data[data.length - 1].id;
                }
                data.push({ ...formData, id: maxId + 1 });
            } else {
                let personIndex = data.findIndex(person => person.id === formData.id);
                if (personIndex >= 0) {
                    data[personIndex] = formData;
                }
            }
            this.setState({
                data: data,
            })
        }
        this.setState({
            mode: Modes.view,
        })
    }

    deletePerson(index) {
        let data = this.state.data;
        data.splice(index, 1);
        this.setState({
            data: data,
        })
    }

    render() {
        if (this.state.mode === Modes.create || this.state.mode === Modes.edit) {
            return <FormPerson mode={this.state.mode} data={this.state.formData} onSubmit={this.submitForm} />;
        }

        const data = this.state.data;
        const matchPath = this.props.matchPath;

        const tableRows = data.map((el, index) => {
            return (
                <tr key={el.id}>
                    <td className="align-middle text-center">{index + 1}</td>
                    <td className="align-middle">
                        <Link to={{
                            pathname: matchPath + "/" + el.id,
                            state: el,
                        }}>{el.name}
                        </Link>
                    </td>
                    <td className="align-middle">{el.age}</td>
                    <td className="align-middle">{el.address}</td>
                    <td className="align-middle d-flex justify-content-around">
                        <Button variant="success" onClick={() => this.editPerson(index)}>Edit</Button>
                        <Button variant="danger" onClick={() => this.deletePerson(index)}>Delete</Button>
                    </td>
                </tr>
            )
        })

        return (
            <React.Fragment>
                <Row className="justify-content-center">
                    <h1>Persons info</h1>
                </Row>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{ width: "5%" }} className="text-center">#</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Address</th>
                                <th style={{ width: "15%" }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                    </Table>
                </Row>
                <Row className="justify-content-end">
                    <Button variant="primary" onClick={this.addNewPerson}>Add New person</Button>
                </Row>
            </React.Fragment>
        );
    }
}