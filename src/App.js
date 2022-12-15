import React from 'react';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { 
  HomePage,
  Day1Page,
  Day2Page,
  Day3Page,
  Day4Page,
  Day5Page,
  Day6Page,
  Day7Page,
  Day8Page,
  Day9Page,
  Day10Page,
  Day11Page,
  Day12Page,
  Day13Page,
  Day14Page,
  Day15Page,
  Day16Page,
  Day17Page,
  // Day18Page,
  // Day19Page,
  // Day20Page,
  // Day21Page,
  // Day22Page,
  // Day23Page,
  // Day24Page,
  // Day25Page,
} from './pages';

const App = () => {
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/1/:taskNumber">
          <Day1Page />
        </Route>
        <Route exact path="/2/:taskNumber">
          <Day2Page />
        </Route>
        <Route exact path="/3/:taskNumber">
          <Day3Page />
        </Route>
        <Route exact path="/4/:taskNumber">
          <Day4Page />
        </Route>
        <Route exact path="/5/:taskNumber">
          <Day5Page />
        </Route>
        <Route exact path="/6/:taskNumber">
          <Day6Page />
        </Route>
        <Route exact path="/7/:taskNumber">
          <Day7Page />
        </Route>
        <Route exact path="/8/:taskNumber">
          <Day8Page />
        </Route>
        <Route exact path="/9/:taskNumber">
          <Day9Page />
        </Route>
        <Route exact path="/10/:taskNumber">
          <Day10Page />
        </Route>
        <Route exact path="/11/:taskNumber">
          <Day11Page />
        </Route>
        <Route exact path="/12/:taskNumber">
          <Day12Page />
        </Route>
        <Route exact path="/13/:taskNumber">
          <Day13Page />
        </Route>
        <Route exact path="/14/:taskNumber">
          <Day14Page />
        </Route>
        <Route exact path="/15/:taskNumber">
          <Day15Page />
        </Route>
        <Route exact path="/16/:taskNumber">
          <Day16Page />
        </Route>
        <Route exact path="/17/:taskNumber">
          <Day17Page />
        </Route>
        {/* <Route exact path="/18/:taskNumber">
          <Day18Page />
        </Route>
        <Route exact path="/19/:taskNumber">
          <Day19Page />
        </Route>
        <Route exact path="/20/:taskNumber">
          <Day20Page />
        </Route>
        <Route exact path="/21/:taskNumber">
          <Day21Page />
        </Route>
        <Route exact path="/22/:taskNumber">
          <Day22Page />
        </Route>
        <Route exact path="/23/:taskNumber">
          <Day23Page />
        </Route>
        <Route exact path="/24/:taskNumber">
          <Day24Page />
        </Route>
        <Route exact path="/25/:taskNumber">
          <Day25Page />
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
