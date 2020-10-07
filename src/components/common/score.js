import React, { Component } from 'react';
import classNames from "classnames";

class Score extends Component {
    constructor(props){
        super(props);
        this.state = {
            background: ""
        }
    }

    componentDidMount() {
        const {children, select} = this.props;
        if(!select){
            this.setState({
                background: "bg-Unselect-Score"
            })
        }
        else if(children > 6){
            this.setState({
                background: "bg-Hight-Score"
            })
        }
        else if (children > 3) {
            this.setState({
                background: "bg-Medium-Score"
            })
        }
        else{
            this.setState({
                background: "bg-Low-Score"
            })
        }
    }
    
    componentWillReceiveProps(props){
        const {children, select} = props;
        if(!select){
            this.setState({
                background: "bg-Unselect-Score"
            })
        }
        else if(children > 6){
            this.setState({
                background: "bg-Hight-Score"
            })
        }
        else if (children > 3) {
            this.setState({
                background: "bg-Medium-Score"
            })
        }
        else{
            this.setState({
                background: "bg-Low-Score"
            })
        }
    }

    render() {
        const {children, sizeScore, classname, onMouseOver, onMouseLeave, onClick} = this.props;
        const {background} = this.state;

        return (
            <div className={classNames(
                'score', 
                sizeScore, 
                background,
                classname
            )} 
            onMouseOver={onMouseOver} 
            onMouseLeave={onMouseLeave} 
            onClick={onClick}
            >{children}</div>
        );
    }
}

export default Score;