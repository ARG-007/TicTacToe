import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit{
  squares: any[] = [];
  xIsNext: boolean =true;
  winner: string = "N";

  constructor(){

  }

  ngOnInit(): void {
      this.newGame();
  }

  newGame(){
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = "N";
  }

  get player(){
    return this.xIsNext?"X":"O";
  }

  makeMove(id: number){
    if(!this.squares[id]){
      this.squares.splice(id,1,this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner() {
    const possibleWinMoves = [
      [0, 1, 2], 
      [0, 3, 6], 
      [0, 4, 8], 
      [1, 4, 7], 
      [2, 5, 8], 
      [2, 4, 6], 
      [3, 4, 5], 
      [6, 7, 8],
    ];

    for(let i of possibleWinMoves){
      if(
        this.squares[i[0]] &&
        this.squares[i[0]] === this.squares[i[1]] &&
        this.squares[i[0]] === this.squares[i[2]]
      ){
        return this.squares[i[0]];
      }

    }
    return "N";
  }


}

