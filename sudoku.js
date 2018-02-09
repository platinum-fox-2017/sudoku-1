"use strict"
const Datarandom= require('./datarandom.js')
class Sudoku {
  constructor(board_string) {
    this.data=board_string
    this.boards=this.board()
    this.nilaiacak=new Datarandom()
    this.arrkolom=[]
    this.arrbaris=[]
    this.arrblock=[]
  }

  solve() {
    for(let i=0;i<this.boards.length;i++){
      for(let j=0;j<this.boards[i].length;j++){
        if(this.boards[i][j]===0){
          var simpannilai=this.nilaiacak.acak()
          this.boards[i][j]=this.cekbarkol(i,j)
        }
      }
    }
    return this.boards
  }

  cekbarkol(baris,kolom){
    this.arrkolom=[],this.arrbaris=[]
    var simpanajebaris=[],simpanajekolom=[]
    for(let i=0;i<this.boards[baris].length;i++){
      if(this.boards[baris][i]!=0){
        simpanajebaris.push(this.boards[baris][i])
      }
    }
    while(simpanajebaris.length<9){
      var nilai=this.nilaiacak.acak()
      if(simpanajebaris.includes(nilai)===false){
        this.arrbaris.push(nilai)
        simpanajebaris.push(nilai)
      }
    }

    for(let i=0;i<this.boards.length;i++){
      if(this.boards[i][kolom]!=0){
        simpanajekolom.push(this.boards[i][kolom])
      }
    }

    while(simpanajekolom.length<9){
      var nilai=this.nilaiacak.acak()
      if(simpanajekolom.includes(nilai)===false){
        this.arrkolom.push(nilai)
        simpanajekolom.push(nilai)
      }
    }
    this.blok(baris,kolom)
    for(let i=0 ;i<this.arrbaris.length;i++){
      if(this.arrkolom.includes(this.arrbaris[i])===true && this.arrblock.includes(this.arrbaris[i])===true){
        return this.arrbaris[i]
      }
    }
    return 0

  }

  blok(baris,kolom){
    var simpanbentar=[]
    this.arrblock=[]
    var barisloop=Math.floor(baris/3)*3
    var kolomloop=Math.floor(kolom/3)*3

    for(let i=barisloop;i<barisloop+3;i++){
      for(let j=kolomloop;j<kolomloop+3;j++){
        if(this.boards[i][j]!=0){
          simpanbentar.push(this.boards[i][j])
        }
      }
    }

    while(simpanbentar.length<9){
      var nilai=this.nilaiacak.acak()
      if(simpanbentar.includes(nilai)===false){
        this.arrblock.push(nilai)
        simpanbentar.push(nilai)
      }
    }
    this.arrblock
  }

  // Returns a string representing the current state of the boards
  board() {
    var count=0
    var board=[]
    for(let i=0;i<9;i++){
      board.push([])
      for(let j=0;j<9;j++){
        board[i].push(Number(this.data[count]))
        count++
      }
    }
    return board
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
var finish=false
while(finish===false){
  var tampil=game.solve()
  var ada=true
  for(let i=0;i<tampil.length;i++){
    if(tampil[i].includes(0)===true){
      ada=false
      game = new Sudoku(board_string)
      break;
    }
  }
  if(ada != false){
    finish=true
  }
}
console.log(tampil)
// console.log(game.solve())
