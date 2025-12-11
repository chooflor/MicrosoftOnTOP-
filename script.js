function recupererGrilleJoueur() {
  var cellules = document.querySelectorAll('.cellule');
  var grille = [];
  var i, j;

  for (i = 0; i < 9; i++) {
    grille[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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

document.addEventListener('DOMContentLoaded', function () {
  var grilleSudoku = document.getElementById('grille-sudoku');
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

      if (i === 0 && j === 0) {
        cellule.textContent = '1';
        cellule.classList.add('fixe');
      } else if (i === 0 && j === 2) {
        cellule.textContent = '3';
        cellule.classList.add('fixe');
      }

      bloc3x3.appendChild(cellule);
    }

    grilleSudoku.appendChild(bloc3x3);
  }

  initialiserSaisieCellules();
  surlignerErreurs();
});
