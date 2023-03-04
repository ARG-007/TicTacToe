const xoArray = [null, null, null, null, null, null, null, null, null];
const xoGrid = document.querySelectorAll("#tictactoe-grid .ttt-box");
const possibleWinMoves = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [2, 5, 8], [2, 4, 6], [1, 4, 7], [3, 4, 5], [6, 7, 8]];
const turnIndicator = document.getElementById("turn");

let turn = 1;
let playNoMore = 0;


xoGrid.forEach(box => box.onclick = function () {
    played(this);
});


function rotate(element) {
    element.classList.contains("rotate")
        ? element.classList.remove("rotate")
        : element.classList.add("rotate");
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

//This function is less primate than isAWin() but this thing still stinks, but hey we can add moves without
//much code :|
function isAWinOp() {
    for (let i of possibleWinMoves) {
        let check = xoArray[i[0]];
        if (check && check === xoArray[i[1]] && check === xoArray[i[2]])
            return { winner: check, winnerCircle: i }
    }
    return 0;
}



//Dont Use this Function, the most primitive method
/* function isAWin() {
    for (let i = 0; i < 3; i++) {      
        for(let j=0; j < 3;j++){
            let winner = 0;
            let winnerCircle = [];
            let curr=xoArray[(i*3)+j];

            if(curr === null)
                continue;
            //traverse right to get a winner
            if(i==0 && j==0){
                //traverse right from 0 0
                (winner) || (curr === xoArray[1] && curr === xoArray[2] && (winner = curr,winnerCircle=[0,1,2]));
                //traverse down from 0 0
                (winner) || (curr === xoArray[3] && curr === xoArray[6] && (winner = curr,winnerCircle=[0,3,6]));
                //traverse diagnal from 0 0
                (winner) || (curr === xoArray[4] && curr === xoArray[8] && (winner = curr,winnerCircle=[0,4,8]));

                //if(winner) return winner;
            }

            if(i==0 && j==2){
                //traverse down from 0 3
                (winner) || (curr === xoArray[5] && curr === xoArray[8] && (winner = curr,winnerCircle=[2,5,8]));
                //traverse diagnal from 0 3
                (winner) || (curr === xoArray[4] && curr === xoArray[6] && (winner = curr,winnerCircle=[2,4,6]));

                //if(winner) return winner;
            }

            //traverse down from 0 2
            (winner) || ((i==0 && j==1) && curr === xoArray[4] && curr === xoArray[7] && (winner = curr,winnerCircle=[1,4,7]));
            //traverse right from 1 0
            (winner) || ((i==1 && j==0) && curr === xoArray[4] && curr === xoArray[5] && (winner = curr,winnerCircle=[3,4,5]));
            //traverse right from 2 0
            (winner) || ((i==2 && j==0) && curr === xoArray[7] && curr === xoArray[8] && (winner = curr,winnerCircle=[6,7,8]));

            console.log(winner);
            if(winner) return {winner,winnerCircle};
            
        }
    }
    return 0;
} */

