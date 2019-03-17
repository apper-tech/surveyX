import React, { Component } from 'react';
import './App.css';
import Dashboard from './_layout/Dashboard'

class App extends Component {
  state = { loading: false, drizzleStore: null };
  componentDidMount() {
  }
  compomentWillUnmount() {

  }
  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <Dashboard>
        {this.props.children}
      </Dashboard>
    );
  }
}

export default App;
