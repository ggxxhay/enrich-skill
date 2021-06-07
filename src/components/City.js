import React from "react";
import Car from "./Car";

export default class City extends React.Component {
    constructor(props) {
        super(props);
        this.refCar = React.createRef();
    }

    componentDidMount() {
        console.log(this.refCar.current);
        console.log(typeof (this.refCar.current));
    }

    render() {
        return (
            <div className="city">
                <Car ref={this.refCar} speed={0.4} />
                <br />
                <br />
                <Car speed={0.5} />
                <br />
                <br />
                <Car speed={0.3} />
            </div>
        );
    }
}