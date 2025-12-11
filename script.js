var baseSolution = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
];

var solutions = [];
var currentSolution = null;

function transformerNombre(n, type) {
  if (type === 0) {
    return n;
  } else if (type === 1) {
    if (n === 1) return 2;
    if (n === 2) return 1;
    return n;
  } else if (type === 2) {
    if (n === 1) return 2;
    if (n === 2) return 3;
    if (n === 3) return 1;
    return n;
  } else if (type === 3) {
    if (n === 4) return 9;
    if (n === 9) return 4;
    return n;
  }
  return n;
}

function creerSolutions() {
  var type, i, j;
  for (type = 0; type < 4; type++) {
    var sol = [];
    for (i = 0; i < 9; i++) {
      sol[i] = [];
      for (j = 0; j < 9; j++) {
        sol[i][j] = transformerNombre(baseSolution[i][j], type);
      }
    }
    solutions[type] = sol;
  }
}

function recupererGrilleJoueur() {
  var cellules = document.querySelectorAll('.cellule');
  var grille = [];
  var i;
  for (i = 0; i < 9; i++) {
    grille[i] = [0,0,0,0,0,0,0,0,0];
  }
  for (i = 0; i < cellules.length; i++) {
    var cellule = cellules[i];
    var ligne = parseInt(cellule.dataset.row, 10);
    var col = parseInt(cellule.dataset.col, 10);
    var valeur = parseInt(cellule.textContent, 10);
    if (isNaN(valeur)) valeur = 0;
    grille[ligne][col] = valeur;
  }
  return grille;
}

function contientChiffres1a9SansDoublon(tab) {
  if (tab.length !== 9) return false;
  var i;
  for (i = 0; i < 9; i++) {
    if (tab[i] < 1 || tab[i] > 9) return false;
  }
  var ensemble = new Set(tab);
  return ensemble.size === 9;
}

function verifierLigne(grille, indexLigne) {
  return contientChiffres1a9SansDoublon(grille[indexLigne]);
}

function verifierColonne(grille, indexColonne) {
  var col = [];
  var i;
  for (i = 0; i < 9; i++) {
    col.push(grille[i][indexColonne]);
  }
  return contientChiffres1a9SansDoublon(col);
}

function verifierRegion(grille, startLigne, startColonne) {
  var valeurs = [];
  var l, c;
  for (l = 0; l < 3; l++) {
    for (c = 0; c < 3; c++) {
      valeurs.push(grille[startLigne + l][startColonne + c]);
    }
  }
  return contientChiffres1a9SansDoublon(valeurs);
}

function resetColors() {
  var cellules = document.querySelectorAll('.cellule');
  var i;
  for (i = 0; i < cellules.length; i++) {
    cellules[i].style.backgroundColor = '';
    cellules[i].style.color = '';
  }
}

function surlignerErreurs() {
  resetColors();
  var cellules = document.querySelectorAll('.cellule');
  var i, j;
  for (i = 0; i < cellules.length; i++) {
    var cellule = cellules[i];
    var valeur = cellule.textContent.trim();
    if (!/^[1-9]$/.test(valeur)) continue;
    var row = parseInt(cellule.dataset.row, 10);
    var col = parseInt(cellule.dataset.col, 10);
    var erreur = false;
    for (j = 0; j < cellules.length; j++) {
      var autre = cellules[j];
      if (autre === cellule) continue;
      var v2 = autre.textContent.trim();
      if (v2 !== valeur) continue;
      var r2 = parseInt(autre.dataset.row, 10);
      var c2 = parseInt(autre.dataset.col, 10);
      var memeLigne = row === r2;
      var memeCol = col === c2;
      var memeRegion =
        Math.floor(row / 3) === Math.floor(r2 / 3) &&
        Math.floor(col / 3) === Math.floor(c2 / 3);
      if (memeLigne || memeCol || memeRegion) {
        erreur = true;
        autre.style.backgroundColor = '#b7d4e4';
      }
    }
    if (erreur) {
      cellule.style.backgroundColor = '#f7c5c5';
      cellule.style.color = '#c00000';
    }
  }
}

function initialiserSaisieCellules() {
  var cellules = document.querySelectorAll('.cellule');
  var i;
  for (i = 0; i < cellules.length; i++) {
    var cellule = cellules[i];
    if (!cellule.classList.contains('fixe')) {
      cellule.contentEditable = 'true';
      cellule.addEventListener('input', function () {
        var txt = this.textContent.replace(/\s/g, '');
        if (txt.length > 1) txt = txt.charAt(0);
        if (!/^[1-9]$/.test(txt)) txt = '';
        this.textContent = txt;
        surlignerErreurs();
      });
    }
  }
}

function genererIndicesAleatoires() {
  var fixe = [];
  var i, j;
  for (i = 0; i < 9; i++) {
    fixe[i] = [];
    for (j = 0; j < 9; j++) {
      fixe[i][j] = false;
    }
  }

  var blocLigne, blocCol, cells, k, nb, tmp, r, c;
  for (blocLigne = 0; blocLigne < 3; blocLigne++) {
    for (blocCol = 0; blocCol < 3; blocCol++) {
      cells = [];
      for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
          r = blocLigne * 3 + i;
          c = blocCol * 3 + j;
          cells.push({ ligne: r, col: c });
        }
      }
      for (i = cells.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = cells[i];
        cells[i] = cells[j];
        cells[j] = tmp;
      }
      nb = Math.floor(Math.random() * 3);
      for (k = 0; k < nb; k++) {
        fixe[cells[k].ligne][cells[k].col] = true;
      }
    }
  }

  return fixe;
}

function afficherSolution() {
  if (!currentSolution) return;
  var cellules = document.querySelectorAll('.cellule');
  var i;
  for (i = 0; i < cellules.length; i++) {
    var cellule = cellules[i];
    var row = parseInt(cellule.dataset.row, 10);
    var col = parseInt(cellule.dataset.col, 10);
    cellule.textContent = String(currentSolution[row][col]);
    cellule.classList.add('fixe');
    cellule.contentEditable = 'false';
  }
  resetColors();
}

document.addEventListener('DOMContentLoaded', function () {
  creerSolutions();

  var grilleSudoku = document.getElementById('grille-sudoku');
  var i, j;

  var indexSolution = Math.floor(Math.random() * 4);
  currentSolution = solutions[indexSolution];

  var fixe = genererIndicesAleatoires();

  for (i = 0; i < 9; i++) {
    var bloc3x3 = document.createElement('div');
    bloc3x3.classList.add('grille-3x3');

    for (j = 0; j < 9; j++) {
      var cellule = document.createElement('div');
      cellule.classList.add('cellule');

      var blocLigne = Math.floor(i / 3);
      var blocCol = i % 3;
      var cellLigne = Math.floor(j / 3);
      var cellCol = j % 3;
      var ligne = blocLigne * 3 + cellLigne;
      var col = blocCol * 3 + cellCol;

      cellule.dataset.row = ligne;
      cellule.dataset.col = col;

      if (fixe[ligne][col]) {
        cellule.textContent = String(currentSolution[ligne][col]);
        cellule.classList.add('fixe');
      }

      bloc3x3.appendChild(cellule);
    }

    grilleSudoku.appendChild(bloc3x3);
  }

  initialiserSaisieCellules();
  surlignerErreurs();
});

document.addEventListener('keydown', function (e) {
  var active = document.activeElement;
  if (!active || !active.classList.contains('cellule')) return;

  var row = parseInt(active.dataset.row, 10);
  var col = parseInt(active.dataset.col, 10);

  if (e.key === 'ArrowRight') {
    col = (col + 1) % 9;
  } else if (e.key === 'ArrowLeft') {
    col = (col - 1 + 9) % 9;
  } else if (e.key === 'ArrowUp') {
    row = (row - 1 + 9) % 9;
  } else if (e.key === 'ArrowDown') {
    row = (row + 1) % 9;
  } else {
    return;
  }

  e.preventDefault();
  var suivante = document.querySelector('.cellule[data-row="' + row + '"][data-col="' + col + '"]');
  if (suivante) suivante.focus();
  function refreshGrille() {
    var grilleSudoku = document.getElementById('grille-sudoku');
    grilleSudoku.innerHTML = "";

    creerSolutions();

    var indexSolution = Math.floor(Math.random() * 4);
    currentSolution = solutions[indexSolution];

    var fixe = genererIndicesAleatoires();
    var i, j;

    for (i = 0; i < 9; i++) {
        var bloc3x3 = document.createElement('div');
        bloc3x3.classList.add('grille-3x3');

        for (j = 0; j < 9; j++) {
            var cellule = document.createElement('div');
            cellule.classList.add('cellule');

            var blocLigne = Math.floor(i / 3);
            var blocCol = i % 3;
            var cellLigne = Math.floor(j / 3);
            var cellCol = j % 3;
            var ligne = blocLigne * 3 + cellLigne;
            var col = blocCol * 3 + cellCol;

            cellule.dataset.row = ligne;
            cellule.dataset.col = col;

            if (fixe[ligne][col]) {
                cellule.textContent = String(currentSolution[ligne][col]);
                cellule.classList.add('fixe');
            }

            bloc3x3.appendChild(cellule);
        }

        grilleSudoku.appendChild(bloc3x3);
    }

    initialiserSaisieCellules();
    resetColors();
}

});
