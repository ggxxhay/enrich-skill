import React from 'react';
import { Switch, Route } from "react-router-dom";
import PersonsInfoDetails from './PersonsInfoDetails';
import PersonsInfoList from './PersonsInfoList';

export default class PersonsInfo extends React.Component {
    render() {
        const matchPath = this.props.match.path;
        const data = this.props.data;

        return (
            <Switch>
                <Route exact path={matchPath}>
                    <PersonsInfoList data={data} matchPath={matchPath} />
                </Route>
                <Route path={`${matchPath}/:id`} render={props =>
                    <PersonsInfoDetails {...props} data={data.find(p => p.id.toString() === props.match.params.id)} />}
                />
            </Switch>
        );
    }
}