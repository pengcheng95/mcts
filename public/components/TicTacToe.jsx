import React from "react";
import Game from "../../ticTacToe/classes.js";

class TicTacToe extends React.Component {
	constructor(props) {
		super(props);

    this.state = {
      board: new Game.Board(),
      player: 1,
      difficulty: 'easy'
    }

    this.togglePlayer = this.togglePlayer.bind(this);
    this.spaceClick = this.spaceClick.bind(this);
    this.renderPiece = this.renderPiece.bind(this);
	}

  componentDidMount() {
  }

  togglePlayer() {
    let currentPlayer = this.state.player;
    this.setState({
      player: (3 - currentPlayer)
    })
  }

  spaceClick(e) {
    let space = parseInt(e.target.id);
    if (this.state.board.boardValues[space] === 0) {
      let board = this.state.board.boardValues;
      board[space] = this.state.player;
      this.setState({
        board: this.state.board,
        player: 3 - this.state.player
      }, () => {
        // console.log(this.state.board, this.state.player)
        // let newBoard = Game.MonteCarloTreeSearch.findNextMove(this.state.board, this.state.player);
        let winStatus = this.state.board.checkStatus();
        console.log(winStatus);
        if (winStatus === -1) {
          let newBoard = Game.MonteCarloTreeSearch.findNextMove(this.state.board, this.state.player, 2);
          console.log(newBoard);
          this.setState({
            board: newBoard,
            player: 3 - this.state.player
          })
        }
        // this.setState({
        //   board: newBoard
        // })
      });
      
    } else {
      alert('illegal move');
    }

  }

  renderPiece(p) {
    if (p === 1) {
      return 'X'
    } else if (p === 2) {
      return 'O'
    }
  }

  render() {
    console.log(this.state)
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

            <div className="board-container">
              <div className="board-item" id="0" ref="0" onClick={this.spaceClick}>{this.renderPiece(this.state.board.boardValues[0])}</div>
              <div className="board-item" id="1" ref="1" onClick={this.spaceClick}>{this.renderPiece(this.state.board.boardValues[1])}</div>
              <div className="board-item" id="2" ref="2" onClick={this.spaceClick}>{this.renderPiece(this.state.board.boardValues[2])}</div>
            </div>
            <div className="board-container">
              <div className="board-item" id="3" ref="3" onClick={this.spaceClick}>{this.renderPiece(this.state.board.boardValues[3])}</div>
              <div className="board-item" id="4" ref="4" onClick={this.spaceClick}>{this.renderPiece(this.state.board.boardValues[4])}</div>
              <div className="board-item" id="5" ref="5" onClick={this.spaceClick}>{this.renderPiece(this.state.board.boardValues[5])}</div>
            </div>
            <div className="board-container">
              <div className="board-item" id="6" ref="6" onClick={this.spaceClick}>{this.renderPiece(this.state.board.boardValues[6])}</div>
              <div className="board-item" id="7" ref="7" onClick={this.spaceClick}>{this.renderPiece(this.state.board.boardValues[7])}</div>
              <div className="board-item" id="8" ref="8" onClick={this.spaceClick}>{this.renderPiece(this.state.board.boardValues[8])}</div>
            </div>

            </div>

          </div>
        </div>

      </div>
      )
  }
}

export default TicTacToe;