// import { log } from 'util';
"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string;
    this.sudoku_board = [];
    this.arrIndexBacktrack = [];
  }

  checkHorizontal(number,row) {
    let arrRow = this.sudoku_board[row];
    let unique = this.checkUnique(number,arrRow);
    return unique;
  }

  checkVertical(number,column) {
    let arrColumn = []

    for(let i = 0; i < this.sudoku_board.length; i++) {
      arrColumn.push(this.sudoku_board[i][column]);
    }

    let unique = this.checkUnique(number,arrColumn);
    return unique;
  }
  
  giveLimitColumn(column) {
    let limitColumn = 0;
    if(column <= 2) {
      limitColumn = 2;
    } else if (column <= 4) {
      limitColumn = 5;
    } else if (column <= 8) {
      limitColumn = 8;
    }

    return limitColumn;
  }

  giveLimitRow(row) {
    let limitRow = 0;
    if(row <= 2) {
      limitRow = 2;
    } else if (row <= 4) {
      limitRow = 5;
    } else if (row <= 8) {
      limitRow = 8;
    }

    return limitRow;
  }

  giveFirstLimitColumn(column) {
    let limitFirstColumn = 0;
    if(column <= 2) {
      limitFirstColumn = 0;
    } else if (column <= 4) {
      limitFirstColumn = 3;
    } else if (column <= 8) {
      limitFirstColumn = 6;
    }
    return limitFirstColumn;
  }

  giveFirstLimitRow(row) {
    let limitFirstRow = 0;
    if(row <= 2) {
      limitFirstRow = 0;
    } else if (row <= 4) {
      limitFirstRow = 3;
    } else if (row <= 8) {
      limitFirstRow = 6;
    }
    return limitFirstRow;
  }

  checkBlock(number,row,column) {
    let limitRow          = this.giveLimitRow(row);
    let limitColumn       = this.giveLimitColumn(column);
    let limitFirstRow     = this.giveFirstLimitRow(limitRow-1);
    let limitFirstColumn  = this.giveFirstLimitColumn(limitColumn-1);
    let arrBlock = []

    for(let i = limitFirstRow; i <= limitRow;i++) {
      for(let j = limitFirstColumn; j <= limitColumn; j++) {
        arrBlock.push(this.sudoku_board[i][j]);
      }
    }

    let unique = this.checkUnique(number,arrBlock);
    return unique;
  }

  checkUnique(number,arr) {
    for(let i = 0; i < arr.length; i++) {
      if(number == arr[i]) {
        return false;
      }
    }    
    return true;
  }

  board() {
    let counterRow = 0;
    let counterColumn = 0;
    while(counterRow < 9) {
      let row = [];
      for(let i = counterColumn; i < counterColumn+9; i++) {
        row.push(this.board_string[i]);
      }
      this.sudoku_board.push(row);
      counterColumn = counterColumn + 9;
      counterRow = counterRow + 1;
    }
    return this.sudoku_board;
  }

  findZeroIndex() {
    for(let i = 0; i < this.sudoku_board.length; i++) {
        for (let j = 0; j < this.sudoku_board[i].length; j++) {
            if (this.sudoku_board[i][j] == '0') {
            let arrIndexZero = [];
            arrIndexZero.push(i);
            arrIndexZero.push(j);
            return arrIndexZero;
            }
        }
    }

    return false;
  }

  fillAnswer(row,column) {
    let answer      = 1;
    let checkVert   = this.checkVertical(answer,column);
    let checkHor    = this.checkHorizontal(answer,row);
    let checkBlock  = this.checkBlock(answer, row, column);

    while(checkVert == false || checkHor == false || checkBlock == false) {
      answer = answer + 1;
      if (answer > 9) {
        checkVert   = true;
        checkHor    = true;
        checkBlock  = true;
      } else {
        checkVert   = this.checkVertical(answer,column);
        checkHor    = this.checkHorizontal(answer,row);
        checkBlock  = this.checkBlock(answer, row, column);
      }
    }

    if (answer > 9) {
      answer = 0;
      this.sudoku_board[row][column] = answer.toString();
    } else {
      this.sudoku_board[row][column] = answer.toString();
      this.saveIndexBacktrack(row,column);
    }

    return answer;
  }

  saveIndexBacktrack(row,column) {
    let arrIndex = [];
    arrIndex.push(row);
    arrIndex.push(column);
    this.arrIndexBacktrack.push(arrIndex);
  }

  fixBackTrack() {
    let row         = this.arrIndexBacktrack[(this.arrIndexBacktrack.length)-1][0]
    let column      = this.arrIndexBacktrack[(this.arrIndexBacktrack.length)-1][1]
    
    let answer      = parseInt(this.sudoku_board[row][column]);
    let checkVert   = this.checkVertical(answer,column);
    let checkHor    = this.checkHorizontal(answer,row);
    let checkBlock  = this.checkBlock(answer, row, column);

    while(checkVert == false || checkHor == false || checkBlock == false) {
      answer = answer + 1;
      if (answer > 9) {
        checkVert   = true;
        checkHor    = true;
        checkBlock  = true;
      } else {
        checkVert   = this.checkVertical(answer,column);
        checkHor    = this.checkHorizontal(answer,row);
        checkBlock  = this.checkBlock(answer, row, column);
      }
    }

    
    if (answer > 9) {
      answer = 0;
      this.sudoku_board[row][column] = answer.toString();
      this.arrIndexBacktrack.pop();
    } else {
      this.sudoku_board[row][column] = answer.toString();
    }

    return answer;
  }
 
  solve() {
    let arrCheck = this.findZeroIndex();
    while (arrCheck != false) {
        let row     = arrCheck[0];
        let column  = arrCheck[1];
        let answer  = this.fillAnswer(row,column);

        if (answer == 0) {
            let cekBackTrack = this.fixBackTrack();
            while(cekBackTrack <= 0) {
                cekBackTrack  = this.fixBackTrack();
            }
        }

        arrCheck = this.findZeroIndex();
        console.log(this.sudoku_board);
        console.log(" ");
        
    }

    console.log(this.sudoku_board);
    
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
console.log("------------------------------");

console.log(game.board())

console.log(" ");
game.solve()
