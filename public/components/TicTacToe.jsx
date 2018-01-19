import React from "react";

class TicTacToe extends React.Component {
	constructor(props) {
		super(props);

    this.state = {
      board: [0,0,0,0,0,0,0,0,0],
      player: 1,
    }

    this.togglePlayer = this.togglePlayer.bind(this);
    this.spaceClick = this.spaceClick.bind(this);
	}

  componentDidMount() {
    console.log(this.refs["0"]);
  }

  togglePlayer() {
    let currentPlayer = this.state.player;
    this.setState({
      player: (3 - currentPlayer)
    })
  }

  spaceClick(e) {
    let space = parseInt(e.target.id);
    if (this.state.board[space] === 0) {
      let board = this.state.board;
      board[space] = this.state.player;
      this.setState({
        board: board
      });
      this.togglePlayer();
    } else {
      alert('illegal move');
    }

  }

  render() {
    return (
      <div>
        <div className="container">

          <div className = "ticTacToe">
            <div className="gameHeader">
              <div className="title">
                <h5> Tic Tac Toe </h5>
              </div>

              <select className="difficulty">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="ai vs ai">AI vs AI</option>
              </select>
            </div>

            <div className = "board">

            <div class="board-container">
              <div class="board-item" id="0" ref="0" onClick={this.spaceClick}>{this.state.board[0]}</div>
              <div class="board-item" id="1" ref="1" onClick={this.spaceClick}>{this.state.board[1]}</div>
              <div class="board-item" id="2" ref="2" onClick={this.spaceClick}>{this.state.board[2]}</div>
            </div>
            <div class="board-container">
              <div class="board-item" id="3" ref="3" onClick={this.spaceClick}>{this.state.board[3]}</div>
              <div class="board-item" id="4" ref="4" onClick={this.spaceClick}>{this.state.board[4]}</div>
              <div class="board-item" id="5" ref="5" onClick={this.spaceClick}>{this.state.board[5]}</div>
            </div>
            <div class="board-container">
              <div class="board-item" id="6" ref="6" onClick={this.spaceClick}>{this.state.board[6]}</div>
              <div class="board-item" id="7" ref="7" onClick={this.spaceClick}>{this.state.board[7]}</div>
              <div class="board-item" id="8" ref="8" onClick={this.spaceClick}>{this.state.board[8]}</div>
            </div>

            </div>

          </div>
        </div>

      </div>
      )
  }
}

export default TicTacToe;