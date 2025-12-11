document.addEventListener('DOMContentLoaded', (event) => {
  
    const grilleSudoku = document.getElementById('grille-sudoku');

   
    for (let i = 0; i < 9; i++) {
     
        const bloc3x3 = document.createElement('div');
        bloc3x3.classList.add('grille-3x3');

      
        for (let j = 0; j < 9; j++) {
          
            const cellule = document.createElement('div');
            cellule.classList.add('cellule');

           
            if (i === 0 && j === 0) {
                cellule.textContent = '1';
            } else if (i === 0 && j === 2) {
                cellule.textContent = '3';
            }

          
            bloc3x3.appendChild(cellule);
        }

       
        grilleSudoku.appendChild(bloc3x3);
    }

    console.log('Grille Sudoku générée avec succès !');
});