import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
class EconomicalBowler extends Component {
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
    fetch("http://localhost:5000/deliveries2")
      .then(res => res.json())
      .then(temp => {
        // var chartData = temp.map((id, count) => {
        //   // this.setState({ chartData });
        // });
        for (var i = 0; i < temp.result2.length; i++) {
          this.state.arr1.push(temp.result2[i]._id.bowler);
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
            text: "For the year 2015, the top economical bowlers",
            fontSize: 30
          },
          legend: {
            display: false,
            position: "right"
          }
        }}
      />
    );
  }
}

export default EconomicalBowler;
