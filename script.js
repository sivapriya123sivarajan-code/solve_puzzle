const puzzleContainer = document.getElementById('puzzle-container');
const shuffleButton = document.getElementById('shuffle-button');
const message = document.getElementById('message');

let pieces = [];
const gridSize = 3;

function createPuzzle() {
    pieces = [];
    puzzleContainer.innerHTML = '';
    for (let i = 1; i <= gridSize * gridSize - 1; i++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.textContent = i;
        piece.draggable = true;
        pieces.push(piece);
        puzzleContainer.appendChild(piece);
    }
    const emptyPiece = document.createElement('div');
    emptyPiece.classList.add('puzzle-piece');
    emptyPiece.style.backgroundColor = '#fff';
    pieces.push(emptyPiece);
    puzzleContainer.appendChild(emptyPiece);
}

function shuffle() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
    pieces.forEach(piece => puzzleContainer.appendChild(piece));
    message.textContent = '';
}

function checkWin() {
    for (let i = 0; i < pieces.length - 1; i++) {
        if (pieces[i].textContent != i + 1) {
            return false;
        }
    }
    return true;
}

let draggedPiece = null;

puzzleContainer.addEventListener('dragstart', (e) => {
    draggedPiece = e.target;
});

puzzleContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

puzzleContainer.addEventListener('drop', (e) => {
    if (e.target.style.backgroundColor === 'rgb(255, 255, 255)') {
        const draggedIndex = pieces.indexOf(draggedPiece);
        const targetIndex = pieces.indexOf(e.target);

        [pieces[draggedIndex], pieces[targetIndex]] = [pieces[targetIndex], pieces[draggedIndex]];

        pieces.forEach(piece => puzzleContainer.appendChild(piece));

        if (checkWin()) {
            message.textContent = 'You solved the puzzle!';
        }
    }
});

createPuzzle();
shuffleButton.addEventListener('click', shuffle);