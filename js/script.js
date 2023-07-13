'use strict';

// RICHIAMO BUTTON
const InputButton = document.querySelector(".invia-dati");
const gridContainer = document.querySelector(".grid-container");

// RICHIAMA FUNCTION onBtnClick
InputButton.addEventListener("click", onBtnClick);

// DICHIARAZIONE FUNCTION onBtnClick
function onBtnClick() {
  //RICHIAMA FUNCTION createGrid
  createGrid(gridContainer);
}

// DICHIARAZIONE FUNCTION createGrid
function createGrid(gridContainer) {
  // SETTO UNA VARIABILE CHE DA L'OK ALLA GIOCABILITA' E  BLOCCA IL GIOCO IN CASO DI CLICK SU BOMB - 
  let statusGame = true;
  //RICHIAMA FUNCTION createBombs
  const arrayBombs = createBombs();
  gridContainer.innerHTML = "";
  for (let i = 1; i <= 100; i++) {
    const box = document.createElement("div");
    box.classList.add("square");
    box.innerHTML = i;
    gridContainer.append(box);
    box.dataset.numCasella = ((i).toString());//CREA IL DATASET

    //CHANGE BOX COLOR
    box.addEventListener("click", function () {
      //BLOCCHIAMO IL GIOCO SE STATUSGAME = FALSE
      if (statusGame == false) {
        return;
      }
      box.classList.add("bg-info");
      console.log(`cella selezionata: ${i}`);
      for (let j = 0; j < 16; j++) {
        if (arrayBombs[j] === i) {
          console.log('la bomba numero ' + arrayBombs[j] + ' è uguale al dataset ' + i)
          box.classList.add("bg-danger");
          // ABBIAMO CLICCATO SU BOMB QUINDI SETTO STATUSGAME SU FALSE PER BLOCCARE LA GIOCABILITA'
          statusGame = false;
        }
      }
    });
  }
}

//FUNCTION CREA BOMBE
function createBombs() {
  const totBombe = [];
  for (let i = 0; i < 16; i++) {
    const randomBomb = (Math.floor(Math.random() * 100) + 1);
    //CONTROLLA SE IL randomBomb E' GIA PRESENTE NELL'ARRAY ALTRIMENTI LO AGGIUNGE
    if (totBombe.indexOf(randomBomb) === -1) {
      totBombe.push(randomBomb);
    } else {
      i--;
    }
  }
  console.log(totBombe);
  return totBombe;
}

