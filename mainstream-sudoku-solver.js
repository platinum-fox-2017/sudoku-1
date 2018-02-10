"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string;
    this.board = this.boards();
    this.empty = this.zero();
  }

  boards(){
    let papan = [];
    let baris = [];
    for(let i=0; i<this.board_string.length; i++){
      if(i%9===0){
        baris.join(' ');
        papan.push(baris);
        baris = [];
        baris.push(Number(this.board_string[i]));
      } else {
        baris.push(Number(this.board_string[i]));
      }
    }
    baris.join(' ');
    papan.push(baris);
    papan.shift();
    return papan;
  }

  zero(){
    let koordinat = [];
    for(let j=0; j<this.board.length; j++){
      for(let k=0; k<this.board[j].length; k++){
        if(this.board[j][k]===0){
          koordinat.push([j,k])
        }
      }
    }
    return koordinat;
  }

  scanRow(board,row,num){
    for(let l=0; l<board[row].length; l++){
      if(board[row][l]===num){
        return false;
      }
    }
    return true;
  }

  scanCol(board,col,num){
    for (let m=0; m<board[col].length; m++){
      if (board[m][col]===num){
        return false;
      }
    }
    return true;
  }

  scanSmallBox(board,row,col,num){
    let koorBaris = Math.floor(row/3)*3;
    let koorKolom = Math.floor(col/3)*3;
    for(let n=koorBaris; n<koorBaris+3; n++){
      for (let o=koorKolom; o<koorKolom+3; o++){
        if(board[n][o]===num){
          return false;
        }
      }
    }
    return true;
  }

  checkAll(board,row,col,num){
    if(this.scanRow(board,row,num) && this.scanCol(board,col,num) && this.scanSmallBox(board,row,col,num)){
      return true;
    } else {
      return false;
    }
  }

  solve() {
    let papanAwal = this.board.join('\n');
    console.log(papanAwal);
    console.log('--------------------');
    let limit = 9;
    for (let p=0; p<this.empty.length;){
      let baris = this.empty[p][0];
      let kolom = this.empty[p][1];
      let num = this.board[baris][kolom]+1;
      let sign = false;
      while(!sign && num<=limit){
        if(this.checkAll(this.board,baris,kolom,num)){
          this.board[baris][kolom] = num;
          p++;
          sign = true;
        } else {
          num++;
        }
      }
      if(!sign) {
        this.board[baris][kolom] = 0;
        p--;
      }
    }
    return this.board.map(a=>a.map(b=>''+b).join(' ')).join('\n');
  }

}

var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

console.log(game.solve())
