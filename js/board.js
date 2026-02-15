const board = document.getElementById("board");
const size = 9;

let currentPlayer = 1;
let wallsRemaining = {
    1: 10,
    2: 10
};

function createBoard() {

    for (let row = 0; row < size; row++) {

        const rowDiv = document.createElement("div");
        rowDiv.className = "row";

        for (let col = 0; col < size; col++) {

            const cell = document.createElement("div");
            cell.className = "cell";

            if (row === 0 && col === 4) {
                cell.classList.add("player", "player2");
            }

            if (row === 8 && col === 4) {
                cell.classList.add("player", "player1");
            }

            rowDiv.appendChild(cell);

            if (col < size - 1) {
                const vWall = document.createElement("div");
                vWall.className = "v-wall";
                addWallLogic(vWall);
                rowDiv.appendChild(vWall);
            }
        }

        board.appendChild(rowDiv);

        if (row < size - 1) {
            const hRow = document.createElement("div");
            hRow.className = "h-wall-row";

            for (let col = 0; col < size; col++) {
                const hWall = document.createElement("div");
                hWall.className = "h-wall";
                addWallLogic(hWall);
                hRow.appendChild(hWall);

                if (col < size - 1) {
                    const gap = document.createElement("div");
                    gap.className = "wall-gap";
                    hRow.appendChild(gap);
                }
            }

            board.appendChild(hRow);
        }
    }
}

function addWallLogic(wallElement) {
    wallElement.addEventListener("click", () => {

        if (wallElement.classList.contains("placed")) return;
        if (wallsRemaining[currentPlayer] <= 0) return;

        wallElement.classList.add("placed", `player${currentPlayer}-wall`);

        wallsRemaining[currentPlayer]--;
        switchTurn();
    });
}

function switchTurn() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

createBoard();