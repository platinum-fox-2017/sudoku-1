"use strict"

class Sudoku {
  constructor(board_string) {
   this.board_string = board_string; 
   this.boardHorizontal = this.getBoardHorizontal();
   this.boardVertikal = this.getBoardVertikal();
   this.boardKotak = this.getBoardKotak();
  }

  getBoardHorizontal(){
    var boardString = this.board_string;
    var boardHorizontal = [];
    //board horizontal 
    var rowBoard = '';
    for(var i = 0; i <= this.board_string.length; i++){
      rowBoard += boardString[i];
      if(i % 9 === 0 && i > 0){
        var sliceRow = rowBoard.slice(0,rowBoard.length - 1);
        var sliceRow = sliceRow.replace('undefine','')
        boardHorizontal.push(sliceRow);  
        rowBoard[rowBoard.length - 1];
        rowBoard = rowBoard[rowBoard.length - 1];
      }
    }
    return boardHorizontal;
    
    
  }
  getBoardVertikal(){
    var boardString = this.board_string;
    var boardHorizontal = this.boardHorizontal;
    var boardVertikal = [];
    //board vertikal
    var columnBoard = '';
    for(var i = 0; i < 9; i++){
      for(var j = 0; j < 9; j++){
        columnBoard += boardHorizontal[j][i];
      } 
      boardVertikal.push(columnBoard);
      columnBoard = '';
    }
    return boardVertikal;
  }
  getBoardKotak(){
    var boardString = this.board_string;
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
  solve() {
    var boardString = this.board_string;
    var boardHorizontal = this.boardHorizontal;
    var boardVertikal = this.boardVertikal;
    var boardKotak = this.boardKotak;
    boardString = boardString.split('');
    var kolomKe = 0;
    var barisKe = 0;
    for(var i = 0; i < boardString.length; i++){
      //posisi kotak
      kolomKe++;
      if(i % 9 === 0){
        barisKe++;  
        kolomKe = 1;
      }
      var posisiKotak = this.cariPosisiKotak(barisKe,kolomKe);
      //console.log('Posisi Kotak ',posisiKotak, 'Baris ',barisKe,' Kolom ',kolomKe)
      if(boardString[i]  == '0'){
        var isKetemuAngkanya = false;
        for(var j = 1; j < 10; j++){
          if(this.cekSemuaSisi(barisKe,kolomKe,posisiKotak,j)){
              isKetemuAngkanya = true;
              break;
          }
        }
        if(isKetemuAngkanya){
          var isiAngka = j;  
        } else {
          var isiAngka = '0';  
        }
        boardString[i] = isiAngka;  
        this.board_string = boardString.join('')
        this.boardHorizontal = this.getBoardHorizontal();
        this.boardVertikal = this.getBoardVertikal();
        this.boardKotak = this.getBoardKotak();
      }  

    }
    //this.board_string = boardString.join('')

  }
  cekSemuaSisi(barisKe,kolomKe,posisiKotak,num){
    var cekBaris = this.cekPerbaris(barisKe,num);
    var cekKolom = this.cekPerkolom(kolomKe,num);
    var cekKotak = this.cekPerkotak(posisiKotak,num);
    if(cekBaris && cekKolom && cekKotak){
      return true;  
    } else {
      return false;
    }
  }

  cekPerbaris(barisKe,num){
      barisKe--;
      var boardHorizontal = this.boardHorizontal;
      for(var i = 0; i < boardHorizontal[barisKe].length; i++ ){
        if(num == boardHorizontal[barisKe][i]){
         return false; 
        }
      }
      return true;  
  }

  cekPerkolom(kolomKe,num){
      kolomKe--;
      var boardVertikal = this.boardVertikal;
      for(var i = 0; i < boardVertikal[kolomKe].length; i++ ){
        if(num == boardVertikal[kolomKe][i]){
         return false; 
        }
      }
      return true;  
  }

  cekPerkotak(kotakKe,num){
      kotakKe--;
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
    var wholeBoard = [];
    var rowBoard = '';
    var boardString = this.board_string;
    for(var i = 0; i <= this.board_string.length; i++){
      rowBoard += boardString[i];
      if(i % 9 === 0 && i > 0){
        var sliceRow = rowBoard.slice(0,rowBoard.length - 1);
        var sliceRow = sliceRow.replace('undefine','')
         sliceRow = sliceRow.split('');
         sliceRow = sliceRow.join('|');

        wholeBoard.push(sliceRow);  
        rowBoard[rowBoard.length - 1];
        rowBoard = rowBoard[rowBoard.length - 1];
      }
    }
    return wholeBoard.join('\n'); 
  }
}

// The file has newlines at the end of each line,

// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log("Before Solved -----")
console.log(game.board())
game.solve()
console.log('========================')
console.log("After Solved -----")
console.log(game.board())
//console.log(game.cekPerkotak(1,9));
//console.log(game.cekPerkolom(1,9));
//console.log(game.cekPerbaris(3,3));
