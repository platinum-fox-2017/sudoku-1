"use strict"

class Sudoku {
  constructor(board_string) {
   this.board_string = board_string; 
   this.boardHorizontal = this.getBoardHorizontal();
   this.boardKotak = this.getBoardKotak();
  }

  getBoardHorizontal(){
    var boardString = this.board_string;
    var boardHorizontal = [];
    //board horizontal 
    var rowBoard = [];
    var rowKe = 0;
    for(var i = 0; i <= this.board_string.length; i++){
      if(rowKe % 9 === 0 && rowKe > 0){
        boardHorizontal.push(rowBoard);  
        rowBoard = [];
        rowKe = 0;
      }
      rowBoard.push(boardString[i]);
      rowKe++;
    }
    return boardHorizontal;
    
    
  }
  getBoardKotak(){
    var boardHorizontal = this.boardHorizontal;
    var boardKotak = [];
    
    //baord Perkotak 
    // board horizontal di bagi per 3 angka
    var boardDibagiPerbaris = [];
    var boardBagi3 = ''
    for(var i = 0; i < boardHorizontal.length; i++){
       for(var j = 1; j <= boardHorizontal[i].length; j++){
           boardBagi3 += boardHorizontal[i][j - 1]; 
           if(j % 3 === 0){
             boardDibagiPerbaris.push(boardBagi3);
             boardBagi3 = '';
           }
       }  
    }
    // habis di bagi pertiga, disatuin per kotak-kotak
    var indexMulaiSatu = 0;
    var indexMulaiDua = 1;
    var indexMulaiTiga = 2;
    //setiap satu baris di tambah 3
    var kotakSatu = '';
    var kotakDua = '';
    var kotakTiga = '';
    var kolomKe = 1;
    for(var i = 0; i < boardDibagiPerbaris.length; i++){
       
       if(i === indexMulaiSatu){
         kotakSatu += boardDibagiPerbaris[i];  
         indexMulaiSatu += 3;
       }
       if(i === indexMulaiDua){
         kotakDua += boardDibagiPerbaris[i];  
         indexMulaiDua += 3;
       }
       if(i === indexMulaiTiga){
         kotakTiga += boardDibagiPerbaris[i];  
         indexMulaiTiga += 3;
       }
       
       if(kolomKe % 9 === 0 && i > 0){
          boardKotak.push(kotakSatu);
          boardKotak.push(kotakDua);
          boardKotak.push(kotakTiga);
          kotakSatu = '';
          kotakDua = '';
          kotakTiga = '';
       }
       kolomKe++;
    }
    return boardKotak;
    
  }
  cariPosisiKotak(barisKe,kolomKe){
      if(barisKe >= 1 && barisKe <= 3){
        if(kolomKe >= 1 && kolomKe <= 3){
          return 1  
        }  
        if(kolomKe >= 4 && kolomKe <= 6){
          return 2  
        }  
        if(kolomKe >= 7 && kolomKe <= 9){
          return 3; 
        }  
      }
      if(barisKe >= 4 && barisKe <= 6){
        if(kolomKe >= 1 && kolomKe <= 3){
          return 4  
        }  
        if(kolomKe >= 4 && kolomKe <= 6){
          return 5  
        }  
        if(kolomKe >= 7 && kolomKe <= 9){
          return 6; 
        }  
      }
      if(barisKe >= 7 && barisKe <= 9){
        if(kolomKe >= 1 && kolomKe <= 3){
          return 7  
        }  
        if(kolomKe >= 4 && kolomKe <= 6){
          return 8  
        }  
        if(kolomKe >= 7 && kolomKe <= 9){
          return 9; 
        }  
      }
  }
  cariKotakKosong(barisKe,kolomKe){
    var done = false;
    var barisKolom = [-1, -1];

    while (!done) {
      if (barisKe == 9) {
          done = true;
      }
      else {
        if (this.boardHorizontal[barisKe][kolomKe] == 0) {
            barisKolom[0] = barisKe;
            barisKolom[1] = kolomKe;
            done = true;
        }
        else {
          if (kolomKe < 8) {
              kolomKe++;
          }
          else {
              barisKe++;
              kolomKe = 0;
          }
        }
      }
    }

    return barisKolom;
    
    
  }
  solve(barisKe,kolomKe) {
    var kotakKosong = this.cariKotakKosong(barisKe, kolomKe);
    barisKe = kotakKosong[0];
    kolomKe = kotakKosong[1];

    //jika sudah habis berhenti
    if (barisKe == -1) {
        return true;
    }

    for (var num = 1; num <= 9; num++) {

        if ( this.cekSemuaSisi(barisKe, kolomKe, num) ) {   
            this.boardHorizontal[barisKe][kolomKe] = String(num);
            //lanjut ke next kosong
            if ( this.solve(barisKe, kolomKe) ) {                
                return true;
            }

        }
    }
    //gak ketemu juga, back tracking nya ngulang
    this.boardHorizontal[barisKe][kolomKe] = 0;
    return false;

  }
  cekSemuaSisi(barisKe,kolomKe,num){
     var cekBaris = this.cekPerbaris(barisKe,num);
    var cekKolom = this.cekPerkolom(kolomKe,num);
    var cekKotak = this.cekPerkotak(barisKe,kolomKe,num);
    if(cekBaris && cekKolom && cekKotak){
      return true;  
    } else {
      return false;
    }
  }

  cekPerbaris(barisKe,num){
      var boardHorizontal = this.boardHorizontal;

      for(var i = 0; i < boardHorizontal[barisKe].length; i++ ){
        if(num == boardHorizontal[barisKe][i]){
         return false; 
        }
      }
      return true;  
  }

  cekPerkolom(kolomKe,num){
      var boardHorizontal = this.boardHorizontal;
      for(var i = 0; i < 9; i++ ){
        if(num == boardHorizontal[i][kolomKe]){
         return false; 
        }
      }
      return true;  
  }

  cekPerkotak(barisKe,kolomKe,num){
      var kotakKe = this.cariPosisiKotak(barisKe + 1,kolomKe + 1);
      kotakKe--;
      this.boardKotak = this.getBoardKotak();
      var boardKotak = this.boardKotak;
      for(var i = 0; i < boardKotak[kotakKe].length; i++ ){
        if(num == boardKotak[kotakKe][i]){
         return false; 
        }
      }
      return true;  
  }

  // Returns a string representing the current state of the board
  board() {
    var wholeBoard = "";

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            wholeBoard += this.boardHorizontal[i][j];
        }
        wholeBoard += "\n";
    }
    console.log(wholeBoard);
  }
}

// The file has newlines at the end of each line,

// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split("\n")[1]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log("Before Solved -----")
game.board()
game.solve(0,0);
console.log('After Solved ----')
game.board()
//console.log(game.cekPerkotak(0,1,4))
