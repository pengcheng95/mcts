const classes = require('./classes.js');
const Node = classes.Node;
const Tree = classes.Tree;
const State = classes.State;
const Board = classes.Board;
const mcts = classes.MonteCarloTreeSearch;
const selectPromisingNode = classes.selectPromisingNode;
const UCT = classes.UCT;
const expandNode = classes.expandNode;
const backPropogation = classes.backPropogation;
const simulateRandomPlayout = classes.simulateRandomPlayout;


// console.log(classes);

let simulatePlay = () => {
  let board = new Board();
  let player = 1;
  let totalMoves = 9;
  console.log('start', board);
  for (var i = 0; i < 9; i++) {
    board = mcts.findNextMove(board, player);
    console.log(board);
    if (board.checkStatus() !== -1) {
      console.log('get here?');
      break;
    }
    player = 3 - player;
  }
  let winStatus = board.checkStatus();
  console.log(winStatus);
}



simulatePlay();




