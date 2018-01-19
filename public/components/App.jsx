import React from 'react';
import style from '../css/custom.css';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from './Home.jsx';
import About from './About.jsx';
import TicTacToe from './TicTacToe.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

  render() {
    return (
      <div className = "nav" > 
        <div className = "container">
          <h2 className = "header" > Monte Carlo Tree Search AIs </h2>
        </div>
        <div className = "container">
          <Router>
            <ul>
              <li><Link to="/"> Home </Link></li>
              <li><Link to="/tictactoe"> Tic Tac Toe </Link></li>
              <li><Link to="/about"> About </Link></li>
              </ul>
          </Router>
        </div>


        <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component = {About}/>
            <Route exact path="/tictactoe" component = {TicTacToe}/>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;