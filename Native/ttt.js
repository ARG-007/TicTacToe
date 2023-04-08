const xoArray = [null, null, null, null, null, null, null, null, null];
const xoGrid = document.querySelectorAll("#tictactoe-grid .ttt-box");
const possibleWinMoves = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [2, 5, 8], [2, 4, 6], [1, 4, 7], [3, 4, 5], [6, 7, 8]];
const turnIndicator = document.getElementById("turn");

let turn = true;
let playNoMore = 0;


xoGrid.forEach(box => box.onclick = function () {
    played(this);
});


function reset(){
    xoArray.fill(null);
    xoGrid.forEach(x => {
        x.replaceChildren();
        x.setAttribute("rotate",false);
    });
    playNoMore = 0;
    turnIndicator.setAttribute('rotate',false);
    turn = true;
    document.querySelector("#wins").replaceChildren();
    document.querySelector("#container").className = "hidden";
}


function rotate(element) {
    element.setAttribute("rotate",element.getAttribute("rotate")==="true"?false:true);
}

function create(player) {
    let p = document.createElement("img");
    p.className = "back";
    p.src = (player === "X") ? "player/X.png" : "player/O.png";
    p.alt = player;
    return p;
}

function played(element) {
    if (playNoMore || xoArray[element.id])
        return;
    xoArray[element.id] = turn ? "X" : "O";
    element.appendChild(create(xoArray[element.id]));
    rotate(element);

    let win = isAWinOp();

    if (win.winner) {
        let winner = create(win.winner);
        winner.className = "";
        [0, 1, 2, 3, 4, 5, 6, 7, 8]
            .filter(x => !win.winnerCircle.includes(x))
            .forEach(x => rotate(xoGrid[x]));

        document.querySelector("#wins").appendChild(winner);
        document.querySelector("#container").className = "";
        playNoMore = 1;
        return;
    }
    
    if(xoArray.filter(i=>i===null).length===0){
        playNoMore = 1;
        document.querySelector("#draw").className="";
    }
    
    rotate(turnIndicator);
    turn = !turn;

}

//This function is less primate than isAWin() but this thing still stinks,
// but hey we can add moves without addingmuch code :|
function isAWinOp() {
    for (let i of possibleWinMoves) {
        let check = xoArray[i[0]];
        if (check && check === xoArray[i[1]] && check === xoArray[i[2]])
            return { winner: check, winnerCircle: i }
    }
    return 0;
}

