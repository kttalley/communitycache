import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import PledgeView from "./pledgeView.jsx";
import NeededView from "./neededView.jsx";
import FulfilledView from "./fulfilledView.jsx";
import {AppBar} from "material-ui";
import {Tab, Tabs} from "material-ui/Tabs/index";


export default class App extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="App">
        <AppBar title={"Cat Stuff"} zDepth={0}/>
        <Tabs>
          <Tab label="Pledge" containerElement={<Link to={'/'}/>} />
          <Tab label="Needed" containerElement={<Link to={'/needed'}/>} />
          <Tab label="Fulfilled" containerElement={<Link to={'/fulfilled'}/>} />
        </Tabs>
        <Switch>
          <Route exact path='/' component={PledgeView}/>
          <Route path='/needed' component={NeededView}/>
          <Route path='/fulfilled' component={FulfilledView}/>
        </Switch>
      </div>
    );
  }
}
