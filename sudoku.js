"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string=board_string;
    this.boardContent=this.board(board_string);
    this.point;
  }
  solve() {
    for(let i=0;i<this.point.length;i++){
        let row = this.point[i][0];
        let col = this.point[i][1];
          for(let j = this.boardContent[row][col]+1;j< 11;j++){
              if(this.rowCheck(row,j)===true && this.colCheck(col,j)===true && this.checkArea(row,col,j)===true){
                this.boardContent[row][col]=j;
                break;
            }
      }
      if(this.boardContent[row][col]>9){
        this.boardContent[row][col]=0;
        i -= 2;
      }
    }
    return this.boardContent;
  }
  // Returns a string representing the current state of the board
  board(board_string) {
    var boardArr=[];
    var nineSpace=0;
    var pointArr = []
    for(let i=0;i<Math.sqrt(board_string.length);i++){
      var rowFill = [];
      for(let j=0;j<Math.sqrt(board_string.length);j++){
        var content = Number(board_string[nineSpace]);
          if(content === 0){
            var colFill = [];
            colFill.push(i);
            colFill.push(j);
            pointArr.push(colFill);
          }
          rowFill.push(content)
          nineSpace++;
        }
      boardArr.push(rowFill);
    }
    this.point = pointArr;
    return boardArr;
  }
  rowCheck(row,numCheck) {
    var num=0;
    for(let i=0;i<Math.sqrt(this.board_string.length);i++){
        if(this.boardContent[row][i]===numCheck){
          num++;
        }
      }
      if(num>0){
        return false;
      }
      else{
        return true;
      }

    }

    colCheck(col,numCheck) {
      var num=0;
      for(let i=0;i<Math.sqrt(this.board_string.length);i++){
          if(this.boardContent[i][col]===numCheck){
            num++;
          }
        }
        if(num>0){
          return false;
        }
        else{
          return true;
        }
      }

      checkArea(row,col,numCheck){
        var num=0;
        var row=Math.floor(row/3)*3;
        var col=Math.floor(col/3)*3;
        for(let i=0;i<3;i++){
          for(let j=0;j<3;j++){
            if(this.boardContent[row+i][col+j]===numCheck){
              num++;
            }
          }
        }
          if(num>0){
            return false;
          }
        else{
          return true;
        }
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


console.log(game.solve());
