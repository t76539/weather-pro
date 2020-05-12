import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';

class WClient extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.handleRefresh = this.handleRefresh.bind(this);
        this.updateStart = this.updateStart.bind(this);
        this.updateEnd = this.updateEnd.bind(this);
    }

    getInitialState = () => ({
        start: '01.12.2018',
        end: '31.01.2019',
        option: [
            {
                title: {text: 'temperatyre'},
                xAxis: {
                    type: 'category',
                    data: [0, 1, 2],
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [10, 20, 15],
                    type: 'line'
                }]
            },
            {
                title: {text: 'pressure'},
                xAxis: {
                    type: 'category',
                    data: [0],
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [0],
                    type: 'line'
                }]
            },
            {
                title: {text: 'rainfall'},
                xAxis: {
                    type: 'category',
                    data: [0],
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [0],
                    type: 'line'
                }]
            },
        ],
    });

    loadData() {
        const url = 'http://' + (typeof window !== 'undefined' ? window.location.hostname : 'localhost') +
                    ':8080/weather?start=' + this.state.start + '&stop=' + this.state.end;
        console.log('url:' + url);

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                const xAxis = [];
                const temp_y = [];
                const tempo_y = [];
                const press_y = [];
                const presso_y = [];
                const wet_y = [];
                const weto_y = [];
                data.forEach((item) => {
                    xAxis.push(item.date_metering);
                    temp_y.push(item.temp);
                    press_y.push(item.press);
                    wet_y.push(item.wet);
                    if (item.presso === 0) {
                        tempo_y.push(null);
                        presso_y.push(null);
                        weto_y.push(null);
                    } else {
                        tempo_y.push(item.tempo);
                        presso_y.push(item.presso);
                        weto_y.push(item.weto);
                    }
                });
                this.setState(state => ({
                    option: [
                        {
                            title: {text: 'temperature'},
                            xAxis: {
                                type: 'category',
                                data: xAxis,
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [
                                {
                                    data: temp_y,
                                    type: 'line',
                                    smooth: true
                                },
                                {
                                    data: tempo_y,
                                    type: 'line',
                                    smooth: true
                                }
                            ]
                        },
                        {
                            title: {text: 'pressure'},
                            xAxis: {
                                type: 'category',
                                data: xAxis,
                            },
                            yAxis: {
                                type: 'value',
                                min: 710
                            },
                            series: [
                                {
                                    data: press_y,
                                    type: 'line',
                                    smooth: true
                                },
                                {
                                    data: presso_y,
                                    type: 'line',
                                    smooth: true
                                },
                            ]
                        },
                        {
                            title: {text: 'wet'},
                            xAxis: {
                                type: 'category',
                                data: xAxis,
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [
                                {
                                    data: wet_y,
                                    type: 'line',
                                    smooth: true
                                },
                                {
                                    data: weto_y,
                                    type: 'line',
                                    smooth: true
                                },
                            ]
                        },
                    ],

                }));
            })
            .catch(console.log)
    }

    handleRefresh = () => {
        this.loadData();
    }

    updateStart(event) {
        this.setState({start: event.target.value})
    }

    updateEnd(event) {
        this.setState({end: event.target.value})
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <div className="App">
                <ReactEcharts option={this.state.option[0]}/>
                <ReactEcharts option={this.state.option[1]}/>
                <ReactEcharts option={this.state.option[2]}/>
                <div>
                    <input type="text" value={this.state.start} onChange={this.updateStart}/>
                    <input type="text" value={this.state.end} onChange={this.updateEnd}/>
                    <button onClick={this.handleRefresh}>Refresh data</button>
                </div>
            </div>
        );
    }
}

export default WClient;
