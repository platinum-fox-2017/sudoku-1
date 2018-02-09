"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardData = board_string
    this.gameState = this.board_data_process()
    this.toFill = []
    // this.modifier = 0
    // this.loop = 0
  }

  solve_v2(){
    var limit, rows, sides, index, numValue, valueFound;
    limit = 9;

    for (var i = 0; i < this.toFill.length;) {
      // console.log(i);
      index = this.toFill[i].coords;
      rows = this.toFill[i].coords[0];
      sides = this.toFill[i].coords[1];

      // move to next index pos

      numValue = this.boardStartMap[rows][sides] + i
      valueFound = false;
      while(!valueFound && numValue <= limit){
        if (this.checkArea(numValue, index)) {
          valueFound = true;
          this.boardStartMap[rows][sides] = numValue
          i++ // move to next case
        } else {
          numValue++
        }
      }
      // no value found
      if (!valueFound) {
        this.boardStartMap[rows][sides] = 0
        i-- // return to previous cycle
      }
    }
    this.boardPrint()
  }

  fillAnswer(f){
    // console.log('test');
    if (this.toFill[f].answers.length !== 0) {
      // console.log(this.toFill[f].answers[0]);
      this.boardStartMap[this.toFill[f].coords[0]][this.toFill[f].coords[1]] = this.toFill[f].answers[0]
      return false
    } else {
      // reset board, add modifier 1
      // this.resetBoard()
      // case 0 if answer.length > 1 add modifier 1
      // this.modifier = 1;
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
    // this.boardPrint(boardMap)
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
      // console.log(this.toFill[i])
      this.boardStartMap[this.toFill[i].coords[0]][this.toFill[i].coords[1]] = 0
    }
    this.boardPrint()
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

  checkArea(numValue, index){
    if (this.checkHorizontal(numValue, index) && this.checkVertical(numValue, index) && this.checkBlock(numValue, index)) {
      return true
    } else {
      return false
    }
  }

  checkHorizontal(numValue, index){
    for (let i = 0; i < 9; i++) {
      if (this.boardStartMap[index[0]][i] === numValue) {
        return false
      }
    }
    return true
  }

  checkVertical(numValue, index){
    for (let i = 0; i < 9; i++) {
      if (index[0] != i && this.boardStartMap[i][index[1]] === numValue) {
        return false
      }
    }
    return true
  }

  checkBlock(numValue, index){
    let left;
    let right;
    let up;
    let down;
    if ((index[1]+1) % 3 === 0 ) { // at the right
      left = 2
      right = 0
    } else {
      if ((index[1]+1) % 2 === 0 ) { // at the middle
        left = 1
        right = 1
      } else { // at the left
        left = 0
        right = 2
      }
    }

    if ((index[0]+1) % 3 === 0 ) { // at the bottom
      up = 2
      down = 0
    } else {
      if ((index[0]+1) % 2 === 0 ) { // at the middle
        up = 1
        down = 1
      } else { // at the top
        up = 0
        down = 2
      }
    }

    for (let height = index[0]-up; height <= index[0]+down; height++) {
      for (let i = index[1]-left; i <= index[1]+right; i++) {
        if (this.boardStartMap[height][i] === numValue) {
          return false
        }
      }
    }
    return true
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
// console.log(game.toFill);
// game.makeCoords(19)
// game.checkHorizontal(5, game.toFill[0])
// game.checkVertical(game.toFill[0])
// game.checkBlock(game.toFill[40])
// game.solve()
// console.log(game.boardStartMap);
game.solve_v2()
