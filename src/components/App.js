import React, { Component } from 'react';
import Header from './Header';
import {Canvas} from './Canvas';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Canvas/>
      </div>
    );
  }
}

export default App;
