const board = document.getElementById("board");
const size = 9;

function createBoard() {

    for (let row = 0; row < size; row++) {

        const rowDiv = document.createElement("div");
        rowDiv.className = "row";

        for (let col = 0; col < size; col++) {

            const cell = document.createElement("div");
            cell.className = "cell";

            // מיקום התחלתי של השחקנים
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

createBoard();




