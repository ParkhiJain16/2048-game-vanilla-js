let board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

function printBoard(){
    console.log(board);
}
function addRandomTile(){
    let emptyCell = [];

    for(let i=0;i<4;i++){
        for(let j = 0;j<4;j++){
            if(board[i][j]===0){
                emptyCell.push({i,j});
            }
        }
    }
    if(emptyCell.length===0) return;
    let randomCell = emptyCell[Math.floor(Math.random()*emptyCell.length)];
    board[randomCell.i][randomCell.j] = Math.random()<0.9?2:4;

}
function moveLeftRow(row){
    let newRow = row.filter((num)=>num !== 0); //remove zeros

    for(let i =0;i<newRow.length-1;i++){ //merge two equals
        if(newRow[i]===newRow[i+1]){
            newRow[i]*=2;
            score += newRow[i];
            newRow[i+1] =0;
        }
    }
    newRow = newRow.filter((num)=>num !== 0);

    while(newRow.length < 4){
        newRow.push(0);
    }

    return newRow;
}
function moveLeft(){
    for(let i =0;i<4;i++){
        board[i] = moveLeftRow(board[i]);
    }
}
function moveRight(){
    for(let i =0;i<4;i++){
        board[i].reverse();
        board[i]=moveLeftRow(board[i]);
        board[i].reverse();

    }
}
function Transpose(matrix){
    let newMatrix = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            newMatrix[j][i] = matrix[i][j];
        }
    }
    return newMatrix;
}
function moveUp(){
    board = Transpose(board);
    moveLeft();
    board = Transpose(board);
}
function moveDown(){
    board = Transpose(board);
    moveRight();
    board = Transpose(board);
}
function handleMove(direction) {
    if(direction === "left") {
        moveLeft();
    }
    else if(direction === "right") {
        moveRight();
    }
    else if(direction === "up") {
        moveUp();
    }
    else if(direction === "down") {
        moveDown();
    }
    addRandomTile();
    addRandomTile();
    renderBoard();
    if(isGameOver()){
        alert("Game Over!");
    }
}
function getTileColor(value){
    const colors = {
        2: "#eee4da",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#f59563",
        32: "#f67c5f",
        64: "#f65e3b",
        128: "#edcf72",
        256: "#edcc61",
        512: "#edc850",
        1024: "#edc53f",
        2048: "#edc22e"
    };

    return colors[value] || "#3c3a32";
}
function isGameOver(){
    for(let i=0;i<4;i++){
        for(let j = 0;j<4;j++){
            if(board[i][j]===0) return false;
        }
    }
    for(let i=0;i<4;i++){
        for(let j=0;j<3;j++){
            if(board[i][j]=== board[i][j+1]) return false;
        }
    }
    for(let j=0;j<4;j++){
        for(let i =0;i<3;i++){
            if(board[i][j]===board[i+1][j]) return false;
        }
    }
    return true;
}
document.addEventListener("keydown",function(e){
    if(e.key === "ArrowLeft"){
        handleMove("left");
    }
    else if(e.key === "ArrowUp"){
        handleMove("up");
    }
    else if(e.key === "ArrowDown"){
        handleMove("down");
    }
    else if(e.key === "ArrowRight"){
        handleMove("right");
    }
});

function renderBoard(){
    let boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";
    
    document.getElementById("score").textContent = score;
    for(let i =0;i<4;i++){
        for(let j =0;j<4;j++){
            let tile = document.createElement("div");
            tile.classList.add("tile");
            
            let value = board[i][j];
            if(value !==0){
                tile.textContent = value;
                tile.style.backgroundColor = getTileColor(value);
                tile.style.color = value>4? "white":"black";
            }else{
                tile.style.backgroundColor = "#cdc1b4";
            }
            boardDiv.appendChild(tile);

        }
    }
}
let score = 0;

function restartGame(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ] 
    score = 0;
    addRandomTile();
    addRandomTile();
    renderBoard();
}
addRandomTile();
addRandomTile();
renderBoard();