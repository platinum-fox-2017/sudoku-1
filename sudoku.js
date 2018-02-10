"use strict";

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string;
    this.sudokuBoard = this.board()
  }

  board() {
    let board = [];
    let index = 0;

    for (let i = 0; i < 9; i++) {
      let rows = [];
      for (let j = 0; j < 9; j++) {
        rows.push(Number(this.board_string[index]));
        index++;
      }
      board.push(rows);
    }

    return board;
  }

  empty_index() {
    let index = [];

    for (let i = 0; i < this.sudokuBoard.length; i++) {
      for (let j = 0; j < this.sudokuBoard.length; j++) {
        if (this.sudokuBoard[i][j] === 0) {
          index.push([i, j]);
        }
      }
    }

    return index;
  }

  row_check(board, row, value) {
    for (let i = 0; i < board[row].length; i++) {
      if (board[row][i] === value) {
        return false;        
      }
    }
    return true;
  }

  column_check(board, col, value) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][col] === value) {
        return false;        
      }
    }
    return true;
  }

  square_check(board, col, row, value) {
    let colCorner = 0;
    let rowCorner = 0;
    let size = 3;
    

    while (col >= colCorner + size) {
      colCorner += size;      
    }

    while (row >= rowCorner + size) {
      rowCorner += size;
    }

    for (let i = rowCorner; i < rowCorner+size; i++) {
      for (let j = colCorner; j < colCorner + size; j++) {
        
        if (board[i][j] === value) {
          return false;
        }
      }
    }
    
    return true;
  }

  validation(board, col, row, value) {
    
    if (this.row_check(board, row, value) && this.column_check(board, col, value) && this.square_check(board, col, row, value)) {
      return true;      
    } else {
      return false;
    }
    
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  solve(board, emptyindex) {
    let max = 9;

    for(let i = 0; i < emptyindex.length;) {
      var row = emptyindex[i][0];
      var col = emptyindex[i][1];
      var value = board[row][col] + 1;
      var found = false;
      while(!found && value <= max) {
        if(this.validation(board, col, row, value)) {
          found = true;
          board[row][col] = value;
          i++;
          console.log(board);
          this.sleep(30);
        } else {
          value++;
        }
      }
      if(found === false) {
        board[row][col] = 0;
        i--;
      }
    }

    // return board;
  }
}

// 105802000090076405200400819019007306762083090000061050007600030430020501600308900
// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require("fs");
var board_string = fs
  .readFileSync("set-01_sample.unsolved.txt")
  .toString()
  .split("\n")[0];
// console.log(board_string);

var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"
// game.board();
// game.empty_index();
game.solve(game.board(), game.empty_index());

// console.log(game.board())
// console.log(game.empty_index());
// console.log(game.solve(arrBoard, empty));
// console.log(row_check(arrBoard, 3, 2))
// console.log(game.emptyindex().length)