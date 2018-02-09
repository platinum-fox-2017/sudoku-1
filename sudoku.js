"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardString = this.boardToArr(board_string);
    this.empty=this.emptyList(board_string)
  }

  solve() {
    let value=0;
    let maxValue=9;
    for(let i=0; i<this.empty.length; i++) {
      value=this.empty[i].value;
      value++
      let x=this.empty[i].x;
      let y=this.empty[i].y;
      while(value<=maxValue) {
        if(value,this.checker(value,x,y)) {
          this.empty[i].value=value;
          this.boardString[y][x]=value;
          break;
        }
        else value++
      }
      if(value>maxValue) {
        this.empty[i].value=0;
        this.boardString[y][x]=0;
        i-=2;
      }
    }
    console.log(this.boardString)
  }

  // Returns a string representing the current state of the board
  board() {
  }

  emptyList(str) {
    let arrOfEmpty=[]
    for(let i=0; i<str.length; i++) {
      let obj={};
      if(str[i]== 0) {
        obj.x=i%9;
        obj.y=Math.floor(i/9)
        obj.value=0;
        arrOfEmpty.push(obj);
      }
    }
    return arrOfEmpty;
  }

  getVertical(x) {
    let verticalArr=[];
    for(let i=0; i<9; i++) {
      verticalArr.push(this.boardString[i][x])
    }
    return verticalArr;
  }

  getBlock(x,y) {
    x=(x-(x%3))
    y=(y-(y%3))
    let blockArr=[];
    for(let i=0; i<3; i++) {
      for(let j=0; j<3; j++) {
        blockArr.push(this.boardString[y+i][x+j])
      }
    }
    return blockArr;
  }

  checker(num,x,y) {
    let vertical=this.getVertical(x);
    let horizontal=this.boardString[y];
    let block=this.getBlock(x,y);
    if(horizontal.indexOf(num)!==-1) return false;
    if(vertical.indexOf(num)!==-1) return false;
    if(block.indexOf(num)!==-1) return false;
    return true;
  }

  boardToArr(str) {
    let tempBoard=str.split('');
    let arrBoard=[];
    for(let i=0; i<9; i++) {
      arrBoard.push(tempBoard.slice(i*9,(i*9)+9));
      arrBoard[i]=arrBoard[i].map(a=>Number(a))
    }
    return arrBoard;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[10]

var game = new Sudoku(board_string);
console.log(game.boardString);
// console.log(game.empty)
game.solve();