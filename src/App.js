import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import {Wysiwyg, ConvertToHTML} from "./node_modules/components/wysiwyg"
import {Wysiwyg, ConvertToHTML} from "mx-react-wysiwyg"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: null
    }
  }


  updateValue(value){
    this.setState({value})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header" style={{marginBottom: 50, height: 250}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <div style={{marginTop: 50, width: "80%", margin:"auto"}}>
          <Wysiwyg
            onChange={this.updateValue.bind(this)}
            value={this.state.value}
          />
        </div>
        <ConvertToHTML html={this.state.value}/>
      </div>
    );
  }
}

export default App;
