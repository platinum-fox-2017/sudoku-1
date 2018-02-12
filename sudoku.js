"use strict"

class Sudoku {
    constructor(str) {
        this.arrBoard = new Array();
        // Make the input string into array of integer
        this.inputArr = str.split("");
        this.inputArr = this.inputArr.map(x => parseInt(x));
        //create nested array of board
        this.generate_board(this.arrBoard);
        this.listPlace = new Array();
        this.result = new Array();
    }

    // Function to check the board in square
    check_square(y, x, num) {
        // Grouping xBox and yBox
        // 0 1 2 ---> 0
        // 3 4 5 ---> 3
        // 6 7 7 ---> 6
        let xBox = Math.floor(x / 3) * 3;
        let yBox = Math.floor(y / 3) * 3;
        for (let i = yBox; i < yBox + 3; i++) {
            for (let j = xBox; j < xBox + 3; j++) {
                if (this.arrBoard[i][j] == num)
                    return false;
            }
        }
        return true;
    }

    // Function to check horizontal line
    check_horizontal(y, num) {
        for (let i = 0; i < 9; i++) {
            if (this.arrBoard[y][i] == num)
                return false;
        }
        return true;
    }

    // Function to check vertical line
    check_vertical(x, num) {
        for (let i = 0; i < 9; i++) {
            if (this.arrBoard[i][x] == num)
                return false;
        }
        return true;
    }

    //Function to generate board from input
    generate_board(arr) {
        let count = 0;
        for (let i = 0; i < 9; i++) {
            let tempArray = new Array();
            for (let j = 0; j < 9; j++) {
                tempArray.push(this.inputArr[count++]);
            }
            arr.push(tempArray);
        }
    }

    // Function to check is the number is unique or not
    is_unique(y, x, num){
        if(this.check_square(y,x,num) && this.check_vertical(x,num) && this.check_horizontal(y,num)){
            return true;
        }
        return false;
    }

    // Find zero and store the coordinate
    find_coordinate_zero() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.arrBoard[i][j] == 0) {
                    this.listPlace.push({
                        'x': j,
                        'y': i
                    });
                }
            }
        }
    }

    // Recursive function for finding the right solution
    recur_solve(pointer){
        // Berhasil mengisi semua
        if(pointer == this.listPlace.length){
            return true;
        }
        for(let i = 1; i < 10; i++){
            if(this.is_unique(this.listPlace[pointer].y,this.listPlace[pointer].x,i)){
                this.arrBoard[this.listPlace[pointer].y][this.listPlace[pointer].x] = i;
                if(this.recur_solve(pointer+1))return true;
            }
        }
        this.arrBoard[this.listPlace[pointer].y][this.listPlace[pointer].x] = 0;
        return false;
    }

    solve() {
        this.find_coordinate_zero();
        this.recur_solve(0);
    }
  // Returns a string representing the current state of the board
    board() {
        return this.arrBoard.join(",").split(",").join("");
    }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[3]

var game = new Sudoku(board_string)
console.log("\nSudoku Question: ");
console.log(game.arrBoard);
// Remember: this will just fill out what it can and not "guess"
game.solve()
console.log("\nSudoku Answer: ");
console.log(game.arrBoard);

console.log("\nAnswer in line: ");
console.log(game.board())
