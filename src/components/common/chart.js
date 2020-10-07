import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';



class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            doughnut: {},
            options: {}
        }
    }

    componentDidMount(){
        const {dataComments} = this.props
        let countPositive = 0;
        let countNegative = 0;
        let countNeutral = 0;
        dataComments.map(val => {
            if(val.analysis === 'tích cực'){
                countPositive++
            }
            else if(val.analysis === 'tiêu cực'){
                countNegative++
            }
            else{
                countNeutral++
            }
        })
        
        let data, enabled;
        if (countPositive > 0 || countNegative > 0 || countNeutral > 0){
            data = [countPositive, countNegative, countNeutral];
            enabled = true;
        }
        else {
            data = [0,0,0,1];
            enabled = false;
        }

        this.setState({
            doughnut: {
                labels: [
                    'Tích cực',
                    'Tiêu cực',
                    'Bình thường'
                ],
                datasets: [
                {
                    data,
                    backgroundColor: [
                        '#28a745',
                        '#f00',
                        '#fc3'
                    ],
                }],
                
            },
            options: {
                title: {
                    display: false,
                    text: '5.0/10',
                    position: 'bottom'
                },
                tooltips: {
                    enabled
                }
            }
        })
    }

    componentWillReceiveProps(props){
        const {dataComments} = props
        let countPositive = 0;
        let countNegative = 0;
        let countNeutral = 0;
        dataComments.map(val => {
            if(val.analysis === 'tích cực'){
                countPositive++
            }
            else if(val.analysis === 'tiêu cực'){
                countNegative++
            }
            else{
                countNeutral++
            }
        })

        let data, enabled;
        if (countPositive > 0 || countNegative > 0 || countNeutral > 0){
            data = [countPositive, countNegative, countNeutral];
            enabled = true;
        }
        else {
            data = [0,0,0,1];
            enabled = false;
        }

        this.setState({
            doughnut: {
                labels: [
                    'Tích cực',
                    'Tiêu cực',
                    'Bình thường'
                ],
                datasets: [
                {
                    data,
                    backgroundColor: [
                        '#28a745',
                        '#f00',
                        '#fc3'
                    ],
                }],
                
            },
            options: {
                title: {
                    display: false,
                    text: '5.0/10',
                    position: 'bottom'
                },
                tooltips: {
                    enabled
                }
            }
        })
    }

    render() {
        const {doughnut, options} = this.state
        return (
            <Doughnut data={doughnut} options={options} />
        );
    }
}

export default Chart;