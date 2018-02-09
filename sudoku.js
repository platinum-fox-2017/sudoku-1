"use strict"

class Sudoku {
  constructor(board_string) {
    this.nilai = board_string;
    this.board_x = this.board();
    this.nilai_nol = this.zero_positions();
  }
  solve() {
    for(let i=0; i<this.nilai_nol.length; i++){
        let row = this.nilai_nol[i][0];
        let col = this.nilai_nol[i][1];
        if(this.board_x[row][col] === 0){
            for(let j=1; j<=9; j++){
                if(this.check_value(row,col,j)){
                  this.board_x[row][col] = j;
                  this.reset_board();
                  console.log(this.board_x);
                  this.sleep(50);
                  if(this.solve()){
                      return true;
                  } else {
                      this.board_x[row][col] = 0;
                  }
                }
             }
             return false;
        } 
    }
    return this.board_x;
  } 
  
  // Returns a string representing the current state of the board
  board() {
    let count =0;
    let outside =[];
    for(let i=0; i<9; i++){
      outside.push([]);
      for(let j=0; j<9; j++){
        outside[i].push(parseInt(this.nilai[count]));
        count += 1;
      };
    }
    return outside
  }
  zero_positions() {
    let outside =[];
    for(let i=0; i<this.board_x.length; i++){
      for(let j=0; j<this.board_x[i].length; j++){
        if(this.board_x[i][j] === 0){
          outside.push([i,j]);
        }
      }
    }
    return outside;
  }
  check_row(row,value){
    for(let i=0; i<this.board_x[row].length; i++){
      if(this.board_x[row][i] === value){
        return false;
      }
    }
    return true;
  }
  check_col(col,value){
    for(let i=0; i<this.board_x.length; i++){
      if(this.board_x[i][col] === value){
        return false;
      }
    }
    return true;
  }
  check_3x3(row,col,value){
    let grid_row = Math.floor(row/3)*3;
    let grid_col = Math.floor(col/3)*3;

    for(let i= grid_row; i< grid_row + 3; i++){
      for(let j= grid_col; j< grid_col + 3; j++ ){
        if(this.board_x[i][j] === value){
          return false;
        }
      }
    }
    return true;
  }
  check_value(row,col,value){
    if(this.check_row(row,value) 
      && this.check_col(col,value) 
      && this.check_3x3(row,col,value)){
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
  reset_board() {
    console.log("\x1B[2J");
  }
  checkboard(){
      return this.board_x;
  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]


let new_sudoku = new Sudoku(board_string);

new_sudoku.solve();








