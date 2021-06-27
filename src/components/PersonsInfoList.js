import React from 'react';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import FormPerson from './FormPerson';
import PersonsInfoListItem from './PersonsInfoListItem';
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
                            {
                                data.map((item, index) => {
                                    return (
                                        <PersonsInfoListItem
                                            key={item.id}
                                            matchPath={this.props.matchPath}
                                            item={item}
                                            index={index}
                                            editPerson={this.editPerson}
                                            deletePerson={this.deletePerson}
                                        />
                                    )
                                })
                            }
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