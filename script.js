//--------------------------------------------------
// 4 SOLUTIONS DE SUDOKU VALIDES
//--------------------------------------------------

var solutions = [
  [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
  ],
  [
    [8,2,7,1,5,4,3,9,6],
    [9,6,5,3,2,7,1,4,8],
    [3,4,1,6,8,9,7,5,2],
    [5,9,3,4,6,8,2,7,1],
    [4,7,2,5,1,3,6,8,9],
    [6,1,8,9,7,2,4,3,5],
    [7,8,6,2,3,5,9,1,4],
    [1,5,4,7,9,6,8,2,3],
    [2,3,9,8,4,1,5,6,7]
  ],
  [
    [2,9,6,3,1,8,5,7,4],
    [5,8,4,7,2,9,1,3,6],
    [7,1,3,6,5,4,8,9,2],
    [6,2,5,8,9,1,3,4,7],
    [9,3,1,4,7,5,6,2,8],
    [8,4,7,2,6,3,9,1,5],
    [1,6,2,5,8,7,4,3,9],
    [4,7,9,1,3,2,5,8,6],
    [3,5,8,9,4,6,7,2,1]
  ],
  [
    [4,1,7,3,6,9,8,2,5],
    [6,3,2,1,5,8,9,4,7],
    [9,5,8,7,2,4,3,1,6],
    [8,6,1,4,9,3,5,7,2],
    [7,2,4,5,8,1,6,3,9],
    [3,9,5,2,7,6,1,8,4],
    [5,8,9,6,1,2,4,7,3],
    [1,4,3,8,3,5,2,6,9],
    [2,7,6,9,4,1,8,5,1]
  ]
];

var currentSolution = null;
var fixeMask = null;

//--------------------------------------------------
// GÉNÉRATION DES INDICES (MAX 2 PAR BLOC 3×3)
//--------------------------------------------------

function genererIndicesAleatoires() {
  var fixe = [];
  for (let i = 0; i < 9; i++) {
    fixe[i] = [];
    for (let j = 0; j < 9; j++) fixe[i][j] = false;
  }

  for (let blocLigne = 0; blocLigne < 3; blocLigne++) {
    for (let blocCol = 0; blocCol < 3; blocCol++) {
      
      let cells = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          cells.push({
            ligne: blocLigne * 3 + i,
            col: blocCol * 3 + j
          });
        }
      }

      cells.sort(() => Math.random() - 0.5);

      let nb = Math.floor(Math.random() * 3); // 0 à 2 chiffres

      for (let k = 0; k < nb; k++) {
        fixe[cells[k].ligne][cells[k].col] = true;
      }
    }
  }

  return fixe;
}

//--------------------------------------------------
// AFFICHAGE DE LA GRILLE
//--------------------------------------------------

function construireGrille() {
  var grille = document.getElementById("grille-sudoku");
  grille.innerHTML = "";

  for (let bloc = 0; bloc < 9; bloc++) {
    let blocDiv = document.createElement("div");
    blocDiv.classList.add("grille-3x3");

    for (let cell = 0; cell < 9; cell++) {
      
      let cellule = document.createElement("div");
      cellule.classList.add("cellule");

      let blocLigne = Math.floor(bloc / 3);
      let blocCol = bloc % 3;
      let cellLigne = Math.floor(cell / 3);
      let cellCol = cell % 3;

      let row = blocLigne * 3 + cellLigne;
      let col = blocCol * 3 + cellCol;

      cellule.dataset.row = row;
      cellule.dataset.col = col;
      cellule.style.position = "relative";
      cellule.style.zIndex = "2";


if (fixeMask[row][col]) {
    console.log("INDICE", row, col);
    cellule.textContent = String(currentSolution[row][col]);
    cellule.contentEditable = "false";
    cellule.style.backgroundColor = "#d9d9d9";
    cellule.style.fontWeight = "bold";
} else {
    cellule.contentEditable = "true";
}


      cellule.addEventListener("input", function () {
        let val = this.textContent.replace(/\s/g, "");
        if (!/^[1-9]$/.test(val)) val = "";
        this.textContent = val;
        surlignerErreurs();
      });

      blocDiv.appendChild(cellule);
    }

    grille.appendChild(blocDiv);
  }

  surlignerErreurs();

  
}

//--------------------------------------------------
// ERREURS : COLORATION
//--------------------------------------------------

function resetColors() {
  document.querySelectorAll(".cellule").forEach(c => {
    if (c.contentEditable === "false") {
      c.style.backgroundColor = "#d9d9d9";
      c.style.fontWeight = "bold";
      c.style.color = "";
    } else {
      c.style.backgroundColor = "";
      c.style.color = "";
      c.style.fontWeight = "";
    }
  });
}


function surlignerErreurs() {
  resetColors();

  let cells = document.querySelectorAll(".cellule");

  cells.forEach(cell => {

    let val = cell.textContent.trim();
    if (!/^[1-9]$/.test(val)) return;

    let row = parseInt(cell.dataset.row);
    let col = parseInt(cell.dataset.col);

    let error = false;

    cells.forEach(other => {
      if (other === cell) return;

      let v2 = other.textContent.trim();
      if (v2 !== val) return;

      let r2 = parseInt(other.dataset.row);
      let c2 = parseInt(other.dataset.col);

      if (
        row === r2 ||
        col === c2 ||
        (Math.floor(row / 3) === Math.floor(r2 / 3) &&
         Math.floor(col / 3) === Math.floor(c2 / 3))
      ) {
        error = true;
        other.style.backgroundColor = "#b7d4e4";
      }
    });

    if (error) {
      cell.style.backgroundColor = "#f7c5c5";
      cell.style.color = "#900";
    }
  });
}


function afficherSolution() {
  let cells = document.querySelectorAll(".cellule");

  cells.forEach(cell => {
    let r = cell.dataset.row;
    let c = cell.dataset.col;
    cell.textContent = currentSolution[r][c];
    cell.classList.add("fixe");
    cell.contentEditable = "false";
  });

  resetColors();
}



function refreshGrille() {
  nouvelleGrille();
}



var videoLancee = false;

var videoChargee = false;
var videoEnLecture = false;

function envoyerCommandeYT(command) {
  var iframe = document.getElementById("background-video");
  if (!iframe || !iframe.contentWindow) return;

  iframe.contentWindow.postMessage(JSON.stringify({
    event: "command",
    func: command,
    args: []
  }), "*");
}

function lancerGif() {
  var iframe = document.getElementById("background-video");
  if (!iframe) return;

  if (!videoChargee) {
    iframe.src = "https://www.youtube.com/embed/KWw-rtnDVNE?enablejsapi=1&autoplay=1&mute=1&controls=0&loop=1&playlist=KWw-rtnDVNE&rel=0&modestbranding=1&end=43";
    videoChargee = true;
    videoEnLecture = true;
    return;
  }

  if (videoEnLecture) {
    envoyerCommandeYT("pauseVideo");
    videoEnLecture = false;
  } else {
    envoyerCommandeYT("playVideo");
    videoEnLecture = true;
  }
}


//--------------------------------------------------
// MUSIC YOUTUBE (PLAY / PAUSE)
//--------------------------------------------------

var musicChargee = false;
var musicEnLecture = false;

function envoyerCommandeMusic(cmd) {
  var iframe = document.getElementById("audio-music");
  if (!iframe || !iframe.contentWindow) return;

  iframe.contentWindow.postMessage(JSON.stringify({
    event: "command",
    func: cmd,
    args: []
  }), "*");
}

function lancerMusique() {
  var iframe = document.getElementById("audio-music");
  if (!iframe) return;

  // 1er clic → charger + play
  if (!musicChargee) {
    iframe.src =
      "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&autoplay=1&controls=0";
    musicChargee = true;
    musicEnLecture = true;
    return;
  }

  // Play / Pause
  if (musicEnLecture) {
    envoyerCommandeMusic("pauseVideo");
    musicEnLecture = false;
  } else {
    envoyerCommandeMusic("playVideo");
    musicEnLecture = true;
  }
}



document.addEventListener("keydown", function (e) {
  let active = document.activeElement;
  if (!active.classList.contains("cellule")) return;

  let row = parseInt(active.dataset.row);
  let col = parseInt(active.dataset.col);

  if (e.key === "ArrowRight") col = (col + 1) % 9;
  else if (e.key === "ArrowLeft") col = (col - 1 + 9) % 9;
  else if (e.key === "ArrowUp") row = (row - 1 + 9) % 9;
  else if (e.key === "ArrowDown") row = (row + 1) % 9;
  else return;

  e.preventDefault();

  let next = document.querySelector(`.cellule[data-row="${row}"][data-col="${col}"]`);
  if (next) next.focus();
});



function nouvelleGrille() {
  currentSolution = solutions[Math.floor(Math.random() * 4)];
  fixeMask = genererIndicesAleatoires();
  construireGrille();
}

document.addEventListener("DOMContentLoaded", function () {


  nouvelleGrille();


  document.getElementById("btn-solution").addEventListener("click", afficherSolution);
  document.getElementById("btn-refresh").addEventListener("click", refreshGrille);
  document.getElementById("btn-gif").addEventListener("click", lancerGif);
  document.getElementById("btn-sound").addEventListener("click", lancerMusique);
});
