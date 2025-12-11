function recupererGrilleJoueur() {
  const cellules = document.querySelectorAll('.cellule');
  const grille = [];
  for (let i = 0; i < 9; i++) {
    grille[i] = new Array(9).fill(0);
  }
  cellules.forEach((cellule, index) => {
    const i = Math.floor(index / 9);
    const j = index % 9;
    const valeur = parseInt(cellule.textContent);
    grille[i][j] = isNaN(valeur) ? 0 : valeur;
  });
  return grille;
}

function contientChiffres1a9SansDoublon(tab) {
  if (tab.length !== 9) return false;
  if (tab.some(n => n < 1 || n > 9)) return false;
  return new Set(tab).size === 9;
}

function verifierLigne(grille, indexLigne) {
  return contientChiffres1a9SansDoublon(grille[indexLigne]);
}

function verifierColonne(grille, indexColonne) {
  const col = [];
  for (let i = 0; i < 9; i++) {
    col.push(grille[i][indexColonne]);
  }
  return contientChiffres1a9SansDoublon(col);
}

function verifierRegion(grille, startLigne, startColonne) {
  const valeurs = [];
  for (let l = 0; l < 3; l++) {
    for (let c = 0; c < 3; c++) {
      valeurs.push(grille[startLigne + l][startColonne + c]);
    }
  }
  return contientChiffres1a9SansDoublon(valeurs);
}

function verifierGrilleComplete() {
  const g = recupererGrilleJoueur();

  for (let i = 0; i < 9; i++) {
    if (!verifierLigne(g, i)) return false;
    if (!verifierColonne(g, i)) return false;
  }

  for (let l = 0; l < 9; l += 3) {
    for (let c = 0; c < 9; c += 3) {
      if (!verifierRegion(g, l, c)) return false;
    }
  }

  return true;
}

function initialiserSaisieCellules() {
  const cellules = document.querySelectorAll('.cellule');
  cellules.forEach(cellule => {
    cellule.addEventListener('input', () => {
      let t = cellule.textContent.replace(/\s/g, '');
      if (t.length > 1) t = t[0];
      if (!/^[1-9]$/.test(t)) t = '';
      cellule.textContent = t;
    });
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
  const grilleSudoku = document.getElementById('grille-sudoku');

  for (let i = 0; i < 9; i++) {
    const bloc3x3 = document.createElement('div');
    bloc3x3.classList.add('grille-3x3');

    for (let j = 0; j < 9; j++) {
      const cellule = document.createElement('div');
      cellule.classList.add('cellule');
      cellule.contentEditable = 'true';

      if (i === 0 && j === 0) {
        cellule.textContent = '1';
      } else if (i === 0 && j === 2) {
        cellule.textContent = '3';
      }

      bloc3x3.appendChild(cellule);
    }

    grilleSudoku.appendChild(bloc3x3);
  }

  initialiserSaisieCellules();
  console.log('Grille Sudoku générée avec succès !');
});

function verifierSudoku() {
  const valide = verifierGrilleComplete();
  alert(valide ? 'Sudoku correct !' : 'Sudoku incorrect');
}
