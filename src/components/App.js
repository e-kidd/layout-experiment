import '../styles/App.css';

import React, { Component } from 'react';
import Header from './Header';
import Sheet from './Sheet';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Sheet/>
      </div>
    );
  }
}

export default App;
