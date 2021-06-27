import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function PersonsInfoListItem(props) {
    const { item, index, matchPath } = props;
    return (
        <tr key={item.id}>
            <td className="align-middle text-center">{index + 1}</td>
            <td className="align-middle">
                <Link to={{
                    pathname: matchPath + "/" + item.id,
                    state: item,
                }}>{item.name}
                </Link>
            </td>
            <td className="align-middle">{item.age}</td>
            <td className="align-middle">{item.address}</td>
            <td className="align-middle d-flex justify-content-around">
                <Button variant="success" onClick={() => props.editPerson(index)}>Edit</Button>
                <Button variant="danger" onClick={() => props.deletePerson(index)}>Delete</Button>
            </td>
        </tr>
    )
}