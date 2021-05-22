import React from 'react';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default class PersonsInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
        }
        this.addNewPerson = this.addNewPerson.bind(this);
        this.deletePerson = this.deletePerson.bind(this);
    }

    addNewPerson() {
        let data = this.state.data;
        let maxId = 1;
        if (data.length > 0) {
            maxId = data[data.length - 1].id;
        }
        data.push({ id: maxId + 1, name: "asd", age: Math.floor(Math.random() * 10) + 20, address: "NA" });
        this.setState({
            data: data,
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
        const personRows = this.state.data.map((el, index) => {
            return (
                <tr key={el.id}>
                    <td className="align-middle text-center">{index + 1}</td>
                    <td className="align-middle">{el.name}</td>
                    <td className="align-middle">{el.age}</td>
                    <td className="align-middle">{el.address}</td>
                    <td className="align-middle d-flex justify-content-around">
                        <Button variant="success">Edit</Button>
                        <Button variant="danger" onClick={(e) => this.deletePerson(index, e)}>Delete</Button>
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
                                <th style={{ width: "5%"}} className="text-center">#</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Address</th>
                                <th style={{ width: "15%" }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {personRows}
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