<script>
  import TTTButton from "./TTTButton.svelte";

  export let moves;
  export let clickHandler;
  export let winMove;
  export let winner;


</script>

<div id="board">
  {#each moves as value, id}
    <TTTButton {id} {value} {clickHandler} win={winMove.includes(id)}/>
  {/each}
</div>


<style>
    #board{
        position: absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%,-50%);


        aspect-ratio: 1;

        display: grid;
        grid-template-columns: repeat(3,1fr);
        grid-template-rows: repeat(3,1fr);

        gap:5px;
        background-color: black;
        padding: 10px;
        border-radius: 1em;
        box-sizing: border-box;
    }

    @media (orientation: landscape){
        #board{
            height: 80%;
        }
    }

    @media (orientation: portrait){
        #board{
            width: 80%;
        }
    }
</style>