import * as React from 'react';
import "./css/App.css";

class App extends React.Component {

  public render() {
    return (
      <div className="app">
        <div className="header">
          <img id="logo" src="/assets/img/logo.png" />
          <h1>CS Guidebook</h1>
          By Brian Yu
        </div>
      </div>
    );
  }
}

export default App;
