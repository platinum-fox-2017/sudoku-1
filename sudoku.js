"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardData = board_string
    this.gameState = this.board_data_process()
    this.toFill = []
  }

  solve() {
    // use this.toFill to parse possible answers
    // possible answers
    let numbers = [1,2,3,4,5,6,7,8,9];


    // loop toFill
    for (let f = 0; f < this.toFill.length; f++) {
      var answersUnsorted = [];
      var answer = []
      // console.log(this.toFill[f])
      // check if this node can be solved
      answersUnsorted.push(this.checkHorizontal(this.toFill[f]));
      answersUnsorted.push(this.checkVertical(this.toFill[f]));
      answersUnsorted.push(this.checkBlock(this.toFill[f]));
      // console.log(answersUnsorted, f);
      // if all true, then pick value....?
      for (let i = 0; i < numbers.length; i++) {
        var available = [];
        // console.log(numbers[i]);
        for (let j = 0; j < answersUnsorted.length; j++) {
          for (let k = 0; k < answersUnsorted[j].length; k++) {
            // if (answersUnsorted[j].length > 0) {
              if (numbers[i] === answersUnsorted[j][k]) {
                available.push(true);
              }
            // }
          }
        }
        // console.log(available);
        if (available.length === 3) {
          answer.push(numbers[i])
        }
        this.toFill[f].answers = answer
      }
      // console.log(this.toFill[f]);
      this.fillAnswer(f);
      if (this.toFill[f].answers.length === 0) {
        // console.log(this.toFill[f]);
        // con`sole.log(f);

      }
      // console.log(this.boardStartMap);

    }

    // answer.sort()
    // console.log(answer);
  }

  fillAnswer(f){
    if (this.toFill[f].answers.length !== 0) {
      // console.log(this.toFill[f].answers[0]);
      // fill in with first value
      // console.log(this.boardStartMap[this.toFill[f].coords[0]][this.toFill[f].coords[1]]);
      this.boardStartMap[this.toFill[f].coords[0]][this.toFill[f].coords[1]] = this.toFill[f].answers[0]
    } else {
      // console.log('cannot fill');
    }

  }

  board_data_process(){
    let board_process = String(this.boardData).split('')
    board_process.pop()
    return board_process
  }

  // Returns a string representing the current state of the board
  board() {
    // let board_process = String(this.boardData).split('')
    // board_process.pop()
    let boardMap = [];
    // loop 9 down
    for (let height = 0; height < 9; height++){
      boardMap.push([]);
      // loop 9 side
      for (let side = 0; side < 9; side++){
        boardMap[height].push(Number(this.gameState[side+(9*height)]));
        // console.log(board_process[side]);
      }
    }
    this.boardPrint(boardMap)
    return this.boardStartMap = boardMap;
  }

  boardPrint(boardMap){
    for (let height = 1; height <= 9; height++){
      if (height === 1) {
        console.log('-----------------');
      }
      console.log(boardMap[height-1].join(' '));
      if (height % 3 === 0) {
        console.log('-----------------');
      }
    }
  }

  logCoordinates(){
    // find 0's
    let count = 0;
    for (let i = 0; i < this.gameState.length; i++){
      // console.log(this.gameState[i], count)
      let toFillBox = {}
      let coords = [];
      if (this.gameState[i] === '0') {
        coords = this.makeCoords(count)
        toFillBox.index = count;
        toFillBox.coords = coords;

        this.toFill.push(toFillBox)
      }
      count += 1; // index
    }
    // console.log(count, coords);
  }

  makeCoords(index){
    let height;
    let side;
    let coords = [];
    if (index < 9) {
      height = 0
      side = index
    } else {
      if (index % 9 === 0) {
        height = index/9 ;
        side = 0;
      } else { // above 9
        height = Math.floor(index / 9);
        side = (index % 9);
      }
    }
    // let height = Math.floor(index / 9)
    coords.push(height)
    coords.push(side)
    // console.log(coords);
    return coords
  }

  checkHorizontal(index){
    // {index: 0, coords:[y,x]}
    // loop through [x,0] => [x,9]
      // if y != i then
        // if found not 0 then store possible answer
        // console.log(this.boardStartMap[index.coords[0]][index.coords[1]]);
    let possible = [1,2,3,4,5,6,7,8,9];
    let filled = []; //[ 1, 5, 8, 2 ] on 0
    for (let i = 0; i < 9; i++) {
      // console.log(this.boardStartMap[index.coords[0]][i]);
      if (index.coords[1] != i && this.boardStartMap[index.coords[0]][i] !== 0) {
        // console.log(this.boardStartMap[index.coords[0]][i]);
        filled.push(this.boardStartMap[index.coords[0]][i])
      }
    }

    // find possible
    for (let j = 0; j < possible.length; j++) {
      // possible[j]
      for (let k = 0; k < filled.length; k++) {
        // filled[k]
        if (possible[j] === filled[k]) {
          possible.splice(j, 1)
        }
      }
    }
    // console.log(possible)
    return possible;
  }

  checkVertical(index){
    // {index: 0, coords:[y,x]}
    let possible = [1,2,3,4,5,6,7,8,9];
    let filled = [];
    for (let i = 0; i < 9; i++) {
      // console.log(this.boardStartMap[index.coords[0]][i]);
      if (index.coords[0] != i && this.boardStartMap[i][index.coords[1]] !== 0) {
        // console.log(this.boardStartMap[i][index.coords[1]]);
        filled.push(this.boardStartMap[i][index.coords[1]])
      }
    }

    // find possible
    for (let j = 0; j < possible.length; j++) {
      // possible[j]
      for (let k = 0; k < filled.length; k++) {
        // filled[k]
        if (possible[j] === filled[k]) {
          possible.splice(j, 1)
        }
      }
    }
    // console.log(possible)
    return possible;
  }

  checkBlock(index){
    // {index: 0, coords:[y,x]}
    let possible = [1,2,3,4,5,6,7,8,9];
    let filled = [];
    // x+1
    // console.log(index.coords);
    let left;
    let right;
    let up;
    let down;
    if ((index.coords[1]+1) % 3 === 0 ) { // at the right
      // loop from index.coords[1]-2 to index.coords[1]+0
      left = 2
      right = 0
    } else {
      if ((index.coords[1]+1) % 2 === 0 ) { // at the middle
        // loop from index.coords[1]-1 to index.coords[1]+1
        left = 1
        right = 1
      } else { // at the left
        // loop from index.coords[1]-0 to index.coords[1]+2
        left = 0
        right = 2
      }
    }

    if ((index.coords[0]+1) % 3 === 0 ) { // at the bottom
      // loop from index.coords[0]-2 to index.coords[1]+0
      up = 2
      down = 0
    } else {
      if ((index.coords[0]+1) % 2 === 0 ) { // at the middle
        // loop from index.coords[0]-1 to index.coords[1]+1
        up = 1
        down = 1
      } else { // at the top
        // loop from index.coords[0]-0 to index.coords[1]+2
        up = 0
        down = 2
      }
    }
    for (let height = index.coords[0]-up; height <= index.coords[0]+down; height++) {
      for (let i = index.coords[1]-left; i <= index.coords[1]+right; i++) {
        // console.log(this.boardStartMap[height][i]);
        if (this.boardStartMap[height][i] !== 0) {
          // console.log(this.boardStartMap[height][i]);
          filled.push(this.boardStartMap[height][i])
        }
      }
    }

    // find possible
    for (let j = 0; j < possible.length; j++) {
      // possible[j]
      for (let k = 0; k < filled.length; k++) {
        // filled[k]
        if (possible[j] === filled[k]) {
          possible.splice(j, 1)
        }
      }
    }
    // console.log(possible)
    return possible;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.board()
game.logCoordinates()
// console.log(game.toFill);
// game.makeCoords(19)
// game.checkHorizontal(game.toFill[0])
// game.checkVertical(game.toFill[0])
// game.checkBlock(game.toFill[40])
game.solve()
console.log(game.boardStartMap);
