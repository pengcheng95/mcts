class Node {
	constructor() {
		this.state;
		this.parent;
		this.childArray = [];
	}
}

class Tree {
  constructor() {
    this.root;
  }
}

class State {
  constructor() {
    this.board;
    this.playerNo;
    this.visitCount;
    this.winScore;
  }

  getAllPossibleStates() {

  }

  randomPlay() {

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

  performMove(player, p) {
    this.totalMoves++;
    boardValues[p] = player;
  }

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

  checkStatus() {
    let checks = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    let count = 0;
    boardValues.forEach(elem => {
      elem === 0 ? count++ : null;
    })
    if (count > 0) {
      return -1;
    }
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
    return 0;
  }
}

