class Node {
  constructor() {
    this.state;
    this.parent;
    this.childArray = [];
  }

  /**
  * Find a random Child Node
  * @return {Node} child node
  */
  getRandomChildNode() {
    return this.childArray[Math.floor(Math.random() * this.childArray.length)];
  }
}

class Tree {
  constructor() {
    this.root;
  }
}

class State {
  constructor(board) {
    this.board = board;
    this.playerNo;
    this.visitCount;
    this.winScore;
  }

  /**
  * Get all possible future states of a board
  * @return {Array} all possible next move states
  */
  getAllPossibleStates() {
    let possibleStates = [];
    let availablePositions = this.board.getEmptyPositions();

    // create an array of all the possible states a board can become
    availablePositions.forEach(p => {
      let newState = new State(this.board);
      newState.playerNo = 3 - this.playerNo;
      newState.board.performMove(this.playerNo, p);
      possibleStates.push(newState);
    })

    return possibleStates;
  }

  /**
  * Plays a random move on the board
  */
  randomPlay() {
    let availablePositions = this.board.getEmptyPositions();
    let totalPossibilities = availablePositions.size;
    let rdm = Math.floor(Math.random() * totalPossibilities);
    this.board.performMove(this.playerNo, availablePositions[rdm]);
  }

  /**
  * Changes the current player
  */
  togglePlayer() {
    this.playerNo = 3 - this.playerNo;
  }
}

class Board {
  constructor() {
    this.boardValues = [];
    this.DEFAULT_BOARD_SIZE = 3;
    this.IN_PROGRESS = -1;
    this.DRAW = 0;
    this.P1 = 1;
    this.P2 = 1;
    this.totalMoves = 0;
  }

  /**
  * Add a move to the board
  * @param {Number} player - the player number
  * @param {Number} p - position of the move
  */
  performMove(player, p) {
    this.totalMoves++;
    boardValues[p] = player;
  }

  /**
  * Finds all empty positions on a board
  * @return {Array} possible moves
  */
  getEmptyPositions() {
    let size = this.boardValues.length;
    let emptyPositions = [];
    for (var i = 0; i < size; i++) {
      if (boardValues[i] === 0) {
        emptyPositions.push(i);
      }
    }
    return emptyPositions;
  }

  /**
  * Checks status of the game
  * @return {Number}
  * -1  - game incomplete
  *  0  - draw
  *  1  - player 1 wins
  *  2  - player 2 wins
  */
  checkStatus() {
    // all possible winning combinations in Tic Tac Toe
    let checks = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    for (var i = 0; i < checks.length; i++) {
      let check = checks[i];
      function winner1(currentValue) {
        return currentValue === 1;
      }
      function winner2(currentValue) {
        return currentValue === 2;
      }
      if (check.every(winner1)) {
        return 1;
      }
      if (check.every(winner2)) {
        return 2;
      }
    }

    // if there are empty spaces the game is incomplete
    let count = 0;
    boardValues.forEach(elem => {
      elem === 0 ? count++ : null;
    })
    if (count > 0) {
      return -1;
    }

    // if there are no empty spaces, the game is a draw
    return 0;
  }
}

class MonteCarloTreeSearch {
  constructor() {
    this.WIN_SCORE = 10;
    this.level;
    this.opponent;
  }


  /**
  * Find best next move for player
  * @param {Board} board - the current state of the board
  * @param {Number} playerNo - player
  */
  findNextMove(board, playerNo) {
    let opponent = 3 - playerNo;
    let tree = new Tree();
    let rootNode = tree.root;
    rootNode.state.board = board;
    rootNode.state.playerNo = opponent;

    // while loop runs for 500 milliseconds
    let startTime = Date.now();
    while ((Date.now() - startTime) < 500) {
      let promisingNode = selectPromisingNode(rootNode);
      // if status of board is -1, game has not finished yet
      if (promisingNode.state.board.checkStatus() === board.IN_PROGRESS) {
        expandNode(promisingNode);
      }
      let nodeToExplore = promisingNode;
      if (nodeToExplore.childArray.length > 0) {
        nodeToExplore = promisingNode.getRandomChildNode();
      }
      let playoutResult = simulateRandomPlayout(nodeToExplore);
      backPropogation(nodeToExplore, playoutResult);
    }

  }
}

/**
* Selection Phase
* Starting with the root node, picks the node with the maximum win rate
*/

/**
* Finds the most promising node
* @param {Node} rootNode - the node we start out at
* @return {Node} most promising node
*/
let selectPromisingNode = (rootNode) => {
  let node = rootNode;
  while (node.childArray.length !== 0) {
    node = UCT.findBestNodeWithUCT(node);
  }
  return node;
}

let UCT = {

  /**
  * Calculate the UCT (Upper Confidence Bound) value of Node
  * @param {Number} totalVisit - total number of simulations for the parent node
  * @param {Number} nodeWinScore - number of wins after the i-th move
  * @param {Number} nodeVisit - number of simulations after the i-th move
  * @return {Number} UCT of Node
  */
  uctValue: (totalVisit, nodeWinScore, nodeVisit) => {
    if (nodeVisit === 0) {
      return Number.MAX_SAFE_INTEGER;
    }
    return (nodeWinScore / nodeVisit) + 1.41 * Math.sqrt(Math.log(totalVisit) / nodeVisit);
  },

  /**
  * Find the child Node with the highest UCT
  * @param {Node} node - current node
  * @return {Node} most promising node
  */
  findBestNodeWithUCT: (node) => {
    let parentVisit = node.state.visitCount;
    let childUCT = [];

    // Find the UCT of each child of the Array
    node.childArray.forEach(child => {
      childUCT.push(UCT.uctValue(parentVisit, child.state.winScore, child.state.visitCount))
    })

    // Find the highest UCT value and index of value
    var max = Math.max(...childUCT);
    var idx = childUCT.indexOf(max);
    return node.childArray[idx];
  }
}


/**
* Recommendation Phase
* Recommends a leaf node to be expanded upon
*/

/**
* Find the child Node with the highest UCT
* @param {Node} node - current node
* @return {Node} most promising node
*/
let expandNode = (node) => {
  let possibleStates = node.state.getAllPossibleStates();
}





module.exports = {
  Node: Node,
  Tree: Tree,
  State: State,
  Board: Board,
  MonteCarloTreeSearch: MonteCarloTreeSearch,
  selectPromisingNode: selectPromisingNode,
  UCT: UCT
}