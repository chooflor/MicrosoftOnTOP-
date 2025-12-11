document.addEventListener('DOMContentLoaded', (event) => {
    // 1. Récupérer le conteneur principal par son ID
    const grilleSudoku = document.getElementById('grille-sudoku');

    // 2. Boucle pour créer les 9 sous-blocs (grille-3x3)
    for (let i = 0; i < 9; i++) {
        // Créer l'élément div pour le bloc 3x3
        const bloc3x3 = document.createElement('div');
        bloc3x3.classList.add('grille-3x3');

        // 3. Boucle pour créer les 9 cellules dans CHAQUE sous-bloc
        for (let j = 0; j < 9; j++) {
            // Créer l'élément div pour la cellule
            const cellule = document.createElement('div');
            cellule.classList.add('cellule');

            // OPTIONNEL : Si vous voulez pré-remplir les premiers chiffres
            if (i === 0 && j === 0) {
                cellule.textContent = '1';
            } else if (i === 0 && j === 2) {
                cellule.textContent = '3';
            }

            // Ajouter la cellule au bloc 3x3
            bloc3x3.appendChild(cellule);
        }

        // Ajouter le bloc 3x3 à la grille principale
        grilleSudoku.appendChild(bloc3x3);
    }

    console.log('Grille Sudoku générée avec succès !');
});