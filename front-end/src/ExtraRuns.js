import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
class ExtraRuns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      arr1: [],
      arr2: []
    };
  }
  componentWillMount() {
    this.getChartData();
  }
  getChartData() {
    fetch("http://localhost:5000/deliveries1")
      .then(res => res.json())
      .then(temp => {
        // var chartData = temp.map((id, count) => {
        //   // this.setState({ chartData });
        // });
        for (var i = 0; i < temp.result2.length; i++) {
          // console.log(temp.result[i]);
          this.state.arr1.push(temp.result2[i]._id.batting_team);
          this.state.arr2.push(temp.result2[i].count);
        }
        console.log(this.state.arr1, this.state.arr2);
        this.setState({
          chartData: {
            labels: this.state.arr1,
            datasets: [
              {
                label: "Hello",
                data: this.state.arr2,
                backgroundColor: [
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(255, 99, 132, 0.6)"
                ]
              }
            ]
          }
        });
      });
  }

  render() {
    return (
      <Bar
        height={150}
        width={350}
        data={this.state.chartData}
        options={{
          title: {
            display: true,
            text: "For the year 2016, the extra runs conceded per team",
            fontSize: 30
          },
          //   scales: {
          //     xAxes: [{ stacked: true }],
          //     yAxes: [{ stacked: true }]
          //   }
          legend: {
            display: false,
            position: "right"
          }
        }}
      />
    );
  }
}

export default ExtraRuns;
