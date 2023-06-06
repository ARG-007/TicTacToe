<script>
    export let id;
    export let value;
    export let clickHandler;
    export let win=false;
</script>

<button id={id} on:click={()=>clickHandler(id)} disabled={value!==null} win={win}>
    {value===null?"":value}
</button>

<style>
    button{
        /* all:unset; */
        font-size: 3rem;
        font-weight: bold;
        color: #ff3e00;
        /* border:2px solid #888; */
        background-color: #e9e9ed;
        /* box-shadow: inset 8.11px 8.11px 6px #ADAEB1, inset -8.11px -8.11px 6px #FFFFFF; */
        box-shadow: 
        /* inset 4px 4px 3px 0px transparent,  */
        inset -5px -5px 3px 0px black
        ;
        /* text-align: center; */

        /* box-shadow: inset 3px 3px 3px 3px #aaa; */
        border: 0px;
        outline: none;
        border-radius: 1rem;
        transition: all 0.05s ease-in-out;
    }

    
    button:hover{
        transform: scale(0.975);
    }
    button:active{
        /* box-shadow: inset 2px 2px 3px 5px #aaa; */
        transform: scale(0.95);
    }
    button:disabled{
        /* background-color: #e9e9ed; */
    }
    button[win=true]{
        transform: scale(0.95);
        /* box-shadow: 
        inset 5px 5px 3px 0px black
        ,inset 5px 5px 4px 0px black
        ; */
        /* box-shadow: inset 2px 2px 7px 3px #2f2a2a; */
        /* background-color: black; */
        /* color: hsl(31, 100%, 50%); */
        color: hsl(60, 100%, 50%);
        text-shadow: 
            0px 0px 5px hsl(15, 100%, 50%),
            0px 0px 10px hsl(23, 100%, 50%),
            0px 0px 15px hsl(15, 100%, 50%),
            0px 0px 15px hsl(15, 100%, 50%),
            0px 0px 15px hsl(15, 100%, 50%)
        ;
    }
</style>
