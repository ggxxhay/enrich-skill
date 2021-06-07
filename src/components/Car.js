import React from 'react';

export default class Car extends React.Component {
    constructor(props) {
        super(props);

        this.degrees = 0;
        this.speed = this.props.speed;
        this.moveIntervalTime = 10;
        this.rotateIntervalTime = 5;
        this.intervalIds = [];

        this.refCar = React.createRef();
    }

    componentDidMount() {
        let car = this.refCar.current;
        this.moveIntervalId = setInterval(() => {
            // console.log("move");
            let currentLeft = car.style.left.replace("px", "");
            let currentLeftNum = 0;
            if (currentLeft != null && currentLeft != "") {
                currentLeftNum = parseFloat(currentLeft);
            }
            car.style.left = currentLeftNum + this.speed + "px";
            // car.style.webkitTransform = 'rotate(' + this.degrees + 'deg)';

        }, this.moveIntervalTime);
        this.intervalIds.push(this.moveIntervalId);

        this.rotateIntervalId = setInterval(() => {
            // console.log("rotate");
            this.degrees += 0.3;
            car.style.webkitTransform = 'rotate(' + this.degrees + 'deg)';
            if (Math.ceil(this.degrees) % 90 == 0) {
                clearInterval(this.rotateIntervalId);
                car.style.webkitTransform = 'rotate(' + Math.ceil(this.degrees) + 'deg)';
                this.degrees = 0;
            }
        }, this.rotateIntervalTime);
        this.intervalIds.push(this.rotateIntervalId);

        // setTimeout(() => {
        //     car.style.webkitTransform = 'rotate(' + 90 + 'deg)';
        // }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.moveIntervalId);
    }

    render() {
        return (
            <div ref={this.refCar} className="car">
                <div className="carBack">{this.speed * 100} km/h</div>
                <div className="carFront"></div>
            </div>
        )
    }
}