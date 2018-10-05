import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
class Chart extends Component {
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
    fetch("http://localhost:5000/matches2")
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
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(255, 99, 132, 0.6)",
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
              //   {
              //     label: "High",
              //     data: this.state.arr2,
              //     backgroundColor: "#EBCCD1" // red
              //   },
              //   {
              //     label: "High",
              //     data: this.state.arr2,
              //     backgroundColor: "#FAEBCC" // red
              //   },
              //   {
              //     label: "High",
              //     data: this.state.arr2,
              //     backgroundColor: "#D6E9C6" // red
              //   },
              //   {
              //     label: "High",
              //     data: this.state.arr2,
              //     backgroundColor: "rgba(255, 99, 132, 0.6)" // red
              //   },
              //   {
              //     label: "High",
              //     data: this.state.arr2,
              //     backgroundColor: "rgba(255, 159, 64, 0.6)" // red
              //   }
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
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }]
          }
        }}
        options={{
          title: {
            display: true,
            text:
              " A bar chart of matches won of all teams over all the years of IPL ",
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

export default Chart;
