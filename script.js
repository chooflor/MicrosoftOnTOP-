document.addEventListener('DOMContentLoaded', (event) => {

    const grilleSudoku = document.getElementById('grille-sudoku');

    for (let i = 0; i < 9; i++) {

        const bloc3x3 = document.createElement('div');
        bloc3x3.classList.add('grille-3x3');

        for (let j = 0; j < 9; j++) {

            const cellule = document.createElement('div');
            cellule.classList.add('cellule');

            const input = document.createElement('input');
            input.type = "text";
            input.classList.add("cell");

            const blocLigne = Math.floor(i / 3);
            const blocCol = i % 3;

            const cellLigne = Math.floor(j / 3);
            const cellCol = j % 3;

            const ligne = blocLigne * 3 + cellLigne;
            const col = blocCol * 3 + cellCol;

            input.dataset.row = ligne;
            input.dataset.col = col;

            if (i === 0 && j === 0) {
                input.value = '1';
                input.disabled = true;
            }
            if (i === 0 && j === 2) {
                input.value = '3';
                input.disabled = true;
            }

            cellule.appendChild(input);
            bloc3x3.appendChild(cellule);
        }

        grilleSudoku.appendChild(bloc3x3);
    }

    console.log('Grille Sudoku générée avec succès !');
});
