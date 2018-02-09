"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.boardParsed = this.boardParser()
    this.empty = this.emptyPositions()
    this.numbers = [1,2,3,4,5,6,7,8,9]
  }

  boardParser(){
    let board = [];
    for (let i = 0; i < 9; i++){
        board.push([])
        for (let j = 0; j < 1; j++){
            var set = 9;
            var multiplier = i*9;
            board[i].push(this.board_string.slice(multiplier, set*(i+1)));
            board[i] = board[i][0].split('').map(a => +a)    
        }
    }
    return board
  }

  emptyPositions(){
    let emptyCoordinates = [];

    for (let i = 0; i < this.boardParsed.length; i++){
      for (let j = 0; j < this.boardParsed[i].length; j++){
        if (this.boardParsed[i][j] === 0){
          emptyCoordinates.push([i,j])
        }
      }
    }
    return emptyCoordinates
  }

  generatePossibles(){
    let possibles = []

    for (let i = 0; i < this.empty.length; i++){
      let obj = {}
      obj.id = this.empty[i]
      obj.rowPossible = this.checkRow(this.empty[i])
      obj.colPossible = this.checkCol(this.empty[i])
      obj.threeByThreePossible = this.check3by3(this.empty[i])
      obj.intersection = this.intersection(obj.rowPossible, obj.colPossible, obj.threeByThreePossible)
      possibles.push(obj)
    }
    return possibles
  }
  checkRow(pos){
    let positionRow = pos[0]
    // console.log(this.boardParsed[positionRow])

    let difference = this.numbers.filter(x => !this.boardParsed[positionRow].includes(x))

    return difference
  }

  checkCol(pos){
    let colNumbers = []
    let positionCol = pos[1]

    // iterate to make a new array for columns
    for (let i = 0; i < this.boardParsed.length; i++){
      colNumbers.push(this.boardParsed[i][positionCol])
    }

    let difference = this.numbers.filter(x => !colNumbers.includes(x))
    
    return difference
  }

  check3by3(pos){
    let startRow = Math.floor(pos[0]/3)*3
    let startCol = Math.floor(pos[1]/3)*3
    let newArray = []

    for (let i = startRow; i < startRow+3; i++){
      for (let j = startCol; j < startCol+3; j++){
        newArray.push(this.boardParsed[i][j])
      }
    }

    let difference = this.numbers.filter(x => !newArray.includes(x))

    return difference
  }

  intersection(rowPossible, colPossible, threeByThreePossible){
    // returns array of number filled with intersection of possible numbers
    let intersect = rowPossible.filter(x => colPossible.includes(x) && threeByThreePossible.includes(x))
    return intersect
  }

  filterPossibles(){
    let shoot = []
    for (let i = 0; i < this.generatePossibles().length;i++){
      if(this.generatePossibles()[i].intersection.length == 1){
        shoot.push(this.generatePossibles()[i])
      }
    }
    // console.log()
    return shoot
  }

  solve() {
    let data = this.filterPossibles()

    for (let i = 0; i < data.length; i++){
      this.boardParsed[data[i].id[0]][data[i].id[1]] = data[i].intersection[0]
    }

    return this.boardParsed.map(a => a.map(b => ''+b).join(' ')).join("\n")
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var board_string2 = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt').toString().split('\n')[0]
  
var game = new Sudoku(board_string)
// var game = new Sudoku(board_string2)

// Uncomment below to see 'intersection' of each empty positions
// console.log(game.filterPossibles())

// Limitation: if 'intersection' in game.filterPossibles() is not found, board cannot be solved
while(game.filterPossibles().length > 0){
  game.solve()
}
console.log(game.solve())
