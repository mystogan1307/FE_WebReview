import React, { Component } from 'react';
import classNames from "classnames";

class Classify extends Component {
    constructor(props){
        super(props);
        this.state = {
            background: ""
        }
    }

    componentDidMount() {
        const {children} = this.props;
        if (children === "tích cực"){
            this.setState({
                background: "bg-Hight-Score"
            })
        }
        else if (children === "tiêu cực"){
            this.setState({
                background: "bg-Low-Score"
            })
        }
        else{
            this.setState({
                background: "bg-Medium-Score"
            })
        }
    }

    componentWillReceiveProps(props){
        const {children} = props;
        if (children === "tích cực"){
            this.setState({
                background: "bg-Hight-Score"
            })
        }
        else if (children === "tiêu cực"){
            this.setState({
                background: "bg-Low-Score"
            })
        }
        else{
            this.setState({
                background: "bg-Medium-Score"
            })
        }
    }

    render() {
        const {children} = this.props;
        const {background} = this.state;
        return (
            <div className={classNames(
                background,
                'classify'
            )}>
                {children}
            </div>
        );
    }
}

export default Classify;