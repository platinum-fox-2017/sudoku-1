"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardData = board_string
    this.gameState = this.board_data_process()
    this.toFill = []
    this.modifier = 0
    this.loop = 0
  }

  solve() {
    let numbers = [1,2,3,4,5,6,7,8,9];
    for (let f = 0; f < this.toFill.length; f++) {
      var answersUnsorted = [];
      var answer = []
      answersUnsorted.push(this.checkHorizontal(this.toFill[f]));
      answersUnsorted.push(this.checkVertical(this.toFill[f]));
      answersUnsorted.push(this.checkBlock(this.toFill[f]));
      for (let i = 0; i < numbers.length; i++) {
        var available = [];
        for (let j = 0; j < answersUnsorted.length; j++) {
          for (let k = 0; k < answersUnsorted[j].length; k++) {
            if (numbers[i] === answersUnsorted[j][k]) {
              available.push(true);
            }
          }
        }
        if (available.length === 3) {
          answer.push(numbers[i])
        }
        this.toFill[f].answers = answer
      }
      this.fillAnswer(f)
    }
  }

  fillAnswer(f){
    if (this.toFill[f].answers.length !== 0) {
      this.boardStartMap[this.toFill[f].coords[0]][this.toFill[f].coords[1]] = this.toFill[f].answers[0]
      return false
    } else {
      return true
    }
  }

  board_data_process(){
    let board_process = String(this.boardData).split('')
    board_process.pop()
    return board_process
  }

  // Returns a string representing the current state of the board
  board() {
    let boardMap = [];
    for (let height = 0; height < 9; height++){
      boardMap.push([]);
      for (let side = 0; side < 9; side++){
        boardMap[height].push(Number(this.gameState[side+(9*height)]));
      }
    }
    return this.boardStartMap = boardMap;
  }

  boardPrint(boardMap){
    for (let height = 1; height <= 9; height++){
      if (height === 1) {
        console.log('-----------------');
      }
      console.log(this.boardStartMap[height-1].join(' '));
      if (height % 3 === 0) {
        console.log('-----------------');
      }
    }
  }

  resetBoard(){
    for (var i = 0; i < this.toFill.length; i++) {
      this.boardStartMap[this.toFill[i].coords[0]][this.toFill[i].coords[1]] = 0
    }
    this.boardPrint()
  }

  logCoordinates(){
    let count = 0;
    for (let i = 0; i < this.gameState.length; i++){
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
    coords.push(height)
    coords.push(side)
    return coords
  }

  checkHorizontal(index){
    let possible = [1,2,3,4,5,6,7,8,9];
    let filled = []; //[ 1, 5, 8, 2 ] on 0
    for (let i = 0; i < 9; i++) {
      if (index.coords[1] != i && this.boardStartMap[index.coords[0]][i] !== 0) {
        filled.push(this.boardStartMap[index.coords[0]][i])
      }
    }
    for (let j = 0; j < possible.length; j++) {
      for (let k = 0; k < filled.length; k++) {
        if (possible[j] === filled[k]) {
          possible.splice(j, 1, '')
        }
      }
    }
    possible.sort().reverse()
    return possible;
  }

  checkVertical(index){
    let possible = [1,2,3,4,5,6,7,8,9];
    let filled = [];
    for (let i = 0; i < 9; i++) {
      if (index.coords[0] != i && this.boardStartMap[i][index.coords[1]] !== 0) {
        filled.push(this.boardStartMap[i][index.coords[1]])
      }
    }
    for (let j = 0; j < possible.length; j++) {
      for (let k = 0; k < filled.length; k++) {
        if (possible[j] === filled[k]) {
          possible.splice(j, 1, '')
        }
      }
    }
    possible.sort().reverse()
    return possible;
  }

  checkBlock(index){
    let possible = [1,2,3,4,5,6,7,8,9];
    let filled = [];
    let left;
    let right;
    let up;
    let down;
    if ((index.coords[1]+1) % 3 === 0 ) { // at the right
      left = 2
      right = 0
    } else {
      if ((index.coords[1]+1) % 3 === 2 ) { // at the middle
        left = 1
        right = 1
      } else { // at the left
        left = 0
        right = 2
      }
    }

    if ((index.coords[0]+1) % 3 === 0 ) { // at the bottom
      up = 2
      down = 0
    } else {
      if ((index.coords[0]+1) % 3 === 2 ) { // at the middle
        up = 1
        down = 1
      } else { // at the top
        up = 0
        down = 2
      }
    }
    for (let height = index.coords[0]-up; height <= index.coords[0]+down; height++) {
      for (let i = index.coords[1]-left; i <= index.coords[1]+right; i++) {
        if (this.boardStartMap[height][i] !== 0) {
          filled.push(this.boardStartMap[height][i])
        }
      }
    }
    for (let j = 0; j < possible.length; j++) {
      for (let k = 0; k < filled.length; k++) {
        if (possible[j] === filled[k]) {
          possible.splice(j, 1, '')
        }
      }
    }
    possible.sort().reverse()
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
game.boardPrint();
game.logCoordinates()
game.solve()
game.boardPrint();
