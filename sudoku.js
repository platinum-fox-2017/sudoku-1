"use strict"

class Sudoku {
  constructor(board_string) {
  	this.board_arr = this.createBoard(board_string);
  }

  createBoard(board_string) {
  	let result = [];
  	for (let i = 0; i < 9; i++) {
  		let temp = [];
  		for (let j = 0; j < 9; j++) {
  			temp.push(board_string[9*i+j])
  		}
  		result.push(temp);
  	}
  	return result;
  }

  solve() {
    let index = {
      row: 0,
      column: 0
    };

    if (!this.findZero(index)) return true;
    for (let i = 1; i <= 9; ++i) {
      if (this.isSafe(i, index)) {
        this.board_arr[index.row][index.column] = i.toString();
        if (this.solve()) return true;
        this.board_arr[index.row][index.column] = 0;
      }
    }

    return false;
  }

  findZero(index) {
    for (index.row = 0; index.row < this.board_arr.length; index.row++) {
      for (index.column = 0; index.column < this.board_arr.length; index.column++) {
        if (this.board_arr[index.row][index.column] == 0) {
          return true;
        }
      }
    }
    return false;
  }

  isSafe(num, index) {
  	if (!this.checkhorizontal(num, index) && 
  		!this.checkvertical(num, index) && 
  		!this.checkblock(num, index.row - index.row % 3, index.column - index.column % 3)) return true;
  	else return false;
  }

  checkhorizontal(num, index) {
  	for (let i = 0; i < 9; i++)
  		if (this.board_arr[index.row][i] == num) return true;
    return false;
  }

  checkvertical(num, index) {
  	for (let i = 0; i < 9; i++)
  		if (this.board_arr[i][index.column] == num) return true;
    return false;
  }

  checkblock(num, row, column) {
  	for (let i = 0; i < 3; i++) {
  		for (let j = 0; j < 3; j++) {
  			if (this.board_arr[i + row][j + column] == num) return true;
  		}
  	}
  	return false;
  }

  // Returns a string representing the current state of the board
  board() {
  	return this.board_arr;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split("\n")[49]

// var str = '530070000600195000098000060800060003400803001700020006060000280000419005000080079';
var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board())