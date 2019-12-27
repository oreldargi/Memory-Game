const rowNum = 3;
const colNum = 4;
images = [];

function getRandomizedImagesList() {
    let indicesList = [];
    for (let i = 1; i<=6 ; i++) {
       indicesList.push(i);
       indicesList.push(i);
    }
    console.log(indicesList);

    for (let i = indicesList.length - 1; i > 0; i--) {
        let newIndex = Math.floor(Math.random() * (i + 1));
        let temp = indicesList[i];
        indicesList[i] = indicesList[newIndex];
        indicesList[newIndex] = temp;
    }
    console.log(indicesList);

    return indicesList
}

function generateCardByID(cardId) {
        let card = document.createElement("img");
        card.classList.add(`card-${cardId}`);
        card.style.width = `${Math.min(screen.width,screen.height)*0.8 / Math.max(rowNum,colNum)}px`;
        card.style.height = `${Math.min(screen.width,screen.height)*0.8 / Math.max(rowNum,colNum)}px`;
        card.style.background = "url(./images/backcard.jpg)";
        card.style.backgroundSize = "cover";
        return card
}

function generateGameBoard() {
        let gameBoard  = document.createElement("table");
        gameBoard.classList.add(`game-board`);
        for (let rowId = 0; rowId < rowNum; rowId++){
                let row = document.createElement("tr");
                for (let cellId = 0; cellId < colNum; cellId ++) {
                    let cell = document.createElement("td");
                    let card = generateCardByID(rowId * colNum + cellId);
                    cell.appendChild(card);
                    row.appendChild(cell);
                }
                gameBoard.appendChild(row)
        }
        return gameBoard
}

function cardOnClickHandler(card){
    console.log(card.target.style.backgroundImage);
    if(card.target.style.backgroundImage == 'url("./images/backcard.jpg")') {
        const target = card.target.className;
        const split = target.split("-");
        const index = parseInt(split[1]);
        card.target.style.backgroundImage = `url("./images/ca${images[index]}.jpg")`;
    } else{
        card.target.style.backgroundImage = "url(./images/backcard.jpg)";
    }
}

function startNewGame() {
    let oldBoard = document.querySelector(`.game-board`);
    if (oldBoard != null) {
        oldBoard.parentElement.removeChild(oldBoard)
    }

    images = getRandomizedImagesList();
    let gameBoard = generateGameBoard();
    document.querySelector("#cards").appendChild(gameBoard);

    for (let index = 0; index < rowNum * colNum; index++) {
        document.querySelector(`.card-${index}`).addEventListener("click", cardOnClickHandler);
    }
}

document.querySelector(`#new-game`).addEventListener("click", startNewGame);
