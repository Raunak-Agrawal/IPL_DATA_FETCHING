import React, { Component } from "react";
import { Bar, Pie } from "react-chartjs-2";
class PlayerOfMatch extends Component {
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
    // this.getChartData2();
  }
  getChartData() {
    fetch("http://localhost:5000/matches3")
      .then(res => res.json())
      .then(temp => {
        // var chartData = temp.map((id, count) => {
        //   // this.setState({ chartData });
        // });
        for (var i = 0; i < temp.result2.length; i++) {
          // console.log(temp.result[i]);
          this.state.arr1.push(temp.result2[i]._id);
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
                  "rgba(255, 99, 142, 0.6)",
                  "rgba(154, 162, 235, 0.6)",
                  "rgba(205, 216, 16, 0.6)",
                  "rgba(175, 192, 122, 0.6)",
                  "rgba(155, 30, 102, 0.6)",
                  "rgba(105, 30, 112, 0.6)"
                ]
              }
            ]
          }
        });
      });
  }

  render() {
    return (
      <Pie
        height={150}
        width={350}
        data={this.state.chartData}
        options={{
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }]
          }
        }}
        options={{
          title: {
            display: true,
            text:
              " A pie chart of top five player of the match over all the years of IPL ",
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

export default PlayerOfMatch;
