<script>
  import GameBoard from "$lib/GameBoard.svelte";
  const winMoves = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [2, 5, 8], [2, 4, 6], [1, 4, 7], [3, 4, 5], [6, 7, 8]];

  let move = 0;
  const moveHistory=[{on:null,moves:Array(9).fill(null)}];
  let moves = moveHistory[move].moves;

  let winner = null, winMove = [];

  function clickHandler(on){
    if(winner) return;
    moves[on] = move%2 === 0?"X":"O";
    move = move+1;

    moveHistory.push({on,moves});
  }

  $: {
    console.log(move); // Dont remove this, reactive statements only work when the value they depend on changes
    //And so logging it was the workaround to create a dependency
    [winner,winMove] = calculateWin();
  };

  function calculateWin(){
    for(let move of winMoves){
        let check = moves[move[0]];
        if(check && check === moves[move[1]] && check === moves[move[2]])
            return [check,move];
    }
    return [null,[]]
  }
</script>
<span id="Player Info"></span>

<GameBoard {moves} {clickHandler} {winMove}/>

<style>
    body{
        background-color: #9ea4ae;
    }
</style>