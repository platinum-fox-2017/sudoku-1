"use strict"

class Sudoku {
  constructor(board_string) {
    this.template=['1','2','3','4','5','6','7','8','9']
    this.boardString = board_string
    this.tile = []
    this.resBoardString=[];
  }

  solve() {
    game.tilePossibilities();
    let status=0;
    // while(status<81) {
      status=0;
      let tempBoard=String(this.boardString).split('');
      let value=0
      for(let i=0; i<game.tile.length; i++) {
        if(this.tile[i].possibilities.length>1) {
          game.checkAvaiableHorizontal(i);
          game.checkAvaiableVertical(i);
          game.checkAvaiableBlock(i)
          if(game.tile[i].possibilities.length===1) {
            value=game.tile[i].possibilities[0];
            status++
          }
          else value=0;
          tempBoard.splice(i,1,value)
          }
        }
      this.boardString=tempBoard.join('')
      console.log(this.board());
    // }
  }

  // Returns a string representing the current state of the board
  board() {
    let tempBoard=String(this.boardString).split('');
    let arrBoard=[]
    for(let i=0; i<9; i++) {
      arrBoard.push(tempBoard.slice(i*9,(i*9)+9))
      arrBoard[i]=arrBoard[i].join(' ');
    }
    return arrBoard;
  }

  checkAvaiableHorizontal(index) {
    let x=Math.floor(index/9);
    let y=index%9;
    let tempBoard=String(this.boardString).split('');
    let tileToken=this.tile[index].possibilities;
    let boardToken=tempBoard.slice((x*9),((x*9)+9)).slice();
    // console.log(x,tileToken)
    // console.log(boardToken)

    for(let i=0; i<boardToken.length; i++) {
      let spliceIndex = tileToken.indexOf(boardToken[i])
      // console.log(spliceIndex)
      if(spliceIndex>=0) {
        tileToken.splice(spliceIndex,1)
      }
    }
    // console.log(tileToken)
  }

  checkAvaiableVertical(index) {
    let x=Math.floor(index/9);
    let y=index%9;
    let tempBoard=String(this.boardString).split('');
    let tileToken=this.tile[index].possibilities;
    let boardToken=[];
    for(let i=0; i<9; i++) {
      boardToken.push(tempBoard[(i*9)+y])
    }
    for(let i=0; i<boardToken.length; i++) {
      let spliceIndex = tileToken.indexOf(boardToken[i])
      if(spliceIndex>=0) {
        tileToken.splice(spliceIndex,1)
      }
    }
  }

  checkAvaiableBlock(index) {
    let x=Math.floor(index/9);
    let y=index%9;
    let tempBoard=String(this.boardString).split('');
    let tileToken=this.tile[index].possibilities;
    let boardToken=[];
    boardToken=this.blockToken(x,y,tempBoard);
    for(let i=0; i<boardToken.length; i++) {
      let spliceIndex = tileToken.indexOf(boardToken[i])
      if(spliceIndex>=0) {
        tileToken.splice(spliceIndex,1)
      }
    }
  }

  blockToken(x,y,boardArr) {
    let tempArr=[];
    if(x>=0 && x<3) {
      if(y>=0 && y<3)
        for(let i=0; i<3; i++)
          for(let j=0; j<3; j++)
            tempArr.push(boardArr[(i*9)+j]);
      else if(y>2 && y<6)
        for(let i=0; i<3; i++)
            for(let j=0; j<3; j++)
              tempArr.push(boardArr[(i*9)+(j+3)]);
      else if(y>5 && y<8)
        for(let i=0; i<3; i++)
              for(let j=0; j<3; j++)
                tempArr.push(boardArr[(i*9)+(j+6)]);
    }
    else if(x>2 && x<6) {
      if(y>=0 && y<3)
        for(let i=0; i<3; i++)
              for(let j=0; j<3; j++)
                tempArr.push(boardArr[27+(i*9)+j]);
      else if(y>2 && y<6)
        for(let i=0; i<3; i++)
              for(let j=0; j<3; j++)
                tempArr.push(boardArr[27+(i*9)+(j+3)]);
      else if(y>5 && y<8)
        for(let i=0; i<3; i++)
              for(let j=0; j<3; j++)
                tempArr.push(boardArr[27+(i*9)+(j+6)]);
    }
    else if(x>5 && x<8){
      if(y>=0 && y<3)
        for(let i=0; i<3; i++)
              for(let j=0; j<3; j++)
                tempArr.push(boardArr[54+(i*9)+j]);
      else if(y>2 && y<6)
        for(let i=0; i<3; i++)
              for(let j=0; j<3; j++)
                tempArr.push(boardArr[54+(i*9)+(j+3)]);
      else if(y>5 && y<8)
        for(let i=0; i<3; i++)
              for(let j=0; j<3; j++)
                tempArr.push(boardArr[54+(i*9)+(j+6)]);
    }
    return tempArr;
  }
  
  tilePossibilities() {
    let tempBoard=String(this.boardString).split('');
    for(let i=0; i<tempBoard.length; i++) {
      let obj= {};
      if(tempBoard[i]!=='0') {
        obj.index=i;
        obj.possibilities=[tempBoard[i]]
      }
      else {
        obj.index=i;
        obj.possibilities=this.template.slice();
      }
      this.tile.push(obj)
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
console.log(game.board())
// game.solve()
// for(let i=0; i<81; i++){
//   console.log(game.tile[i].index,game.tile[i].possibilities)
// }
game.tilePossibilities()
game.solve()
game.solve()
game.solve()
game.solve()
game.solve()


