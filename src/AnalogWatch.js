import React, {Component} from 'react';
import './App.css';
import Clock from 'react-clock';
import Helpit from './Helpit';


class AnalogWatch extends Component {
    constructor(props) {
        super(props);
        console.log("AnalogWatch: constructor-metodissa");
        this.state = {
            pvm: new Date()
        };
    }
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            5000
        );
        console.log("AnalogWatch: componentDidMount-metodissa");
    }
    tick() {
        console.log("AnalogWatch: tickissä");
        this.setState({
            pvm: new Date()
        });
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
        console.log("AnalogWatch: componentWillUnmount-metodissa");
    }
    render() {
        console.log("AnalogWatch: tultiin render-metodiin");
        return (
            <div className="digitaalikello">
                <Helpit moduli="AnalogWatch" />
                <Clock value={this.state.pvm} size={100} hourMarksLength={20} />
            </div>
    );
  }
}

export default AnalogWatch;
