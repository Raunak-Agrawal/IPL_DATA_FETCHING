import React, { Component } from "react";
import "./App.css";
import Chart from "./Chart";
import Winner from "./Winner";
import ExtraRuns from "./ExtraRuns";
import EconomicalBowler from "./EconomicalBowler";
import PlayerOfMatch from "./PlayerOfMatch";

class App extends Component {
  render() {
    // console.log(this.state.chartData);
    return (
      <div className="App">
        {/* {result &&
          result.map(test => {
            return <Chart test={test} />;
          })} */}
        <Chart />
        <hr />
        <Winner />
        <hr />
        <ExtraRuns />
        <EconomicalBowler />
        <PlayerOfMatch />
      </div>
    );
  }
}

export default App;
