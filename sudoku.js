"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardString = board_string
    this.kordinat = 0
    this.papan = 0;
    this.multiDimensi = 0;
  }

  solve() {
    let x = 0;
    let y = 1;
    let angka = '1';
    if(this.cekBaris(x,angka) === true && this.cekKolom(y,angka) === true ){
      console.log(angka + ' BISA, Silahkan masukkan angka ke [' + x,y + ']'); // masukkan value baru
    } else {
      console.log('Angka sudah ada');
    }
    // console.log('-->'+this.cekBaris(0,'7'));
  }

  // Returns a string representing the current state of the board
  board() {
    var stringBoard = this.boardString;

    var inc = 0;
    var papan = [];
    var kordinat = [];
    var multidimensiArray = [];
    for(let b=0; b<9; b++){
      var baris = [];
      var multi = [];
      for(let c=0; c<9; c++){
        var detailKordinat = {};
        if(this.boardString[inc] === '0'){
          detailKordinat.ind = inc
          detailKordinat.x = b
          detailKordinat.y = c
          detailKordinat.char = this.boardString[inc]
          multi.push([b, c]);
          kordinat.push(detailKordinat);
          baris.push(0);
        } else {
          detailKordinat.ind = inc
          detailKordinat.x = b
          detailKordinat.y = c
          detailKordinat.char = this.boardString[inc]
          // multi.push([b, c, this.boardString[inc]]);
          kordinat.push(detailKordinat);
          baris.push(this.boardString[inc]);
        }
        inc++;
      }
      papan.push(baris.join(' '));
      multidimensiArray.push(multi);
    }
    // console.log(papan);
    // console.log(kordinat);
    this.multiDimensi = multidimensiArray;
    this.papan = papan;
    this.kordinat = kordinat;
    return papan;
  }
  cekBaris(cekX,angka){
    for(var b=0; b<this.kordinat.length; b++){
      if(this.kordinat[b].x === cekX){
        if(this.kordinat[b].char === angka){
          return false;
        }
      }
    }
    return true;
  }
  cekKolom(cekY,angka){
    for(var k=0; k<this.kordinat.length; k++){
      if(this.kordinat[k].y === cekY){
        if(this.kordinat[k].char === angka){
          return false;
        }
      }
    }
    return true;
  }
  assign(){
    
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
game.solve()

console.log(game.board())
