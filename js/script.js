'use strict';

// RICHIAMO BUTTO, GRID-CONTAINER E SELECT
const InputButton = document.querySelector(".invia-dati");
const gridContainer = document.querySelector(".grid-container");
const difficultInputElement = document.querySelector(".form-select");
// RICHIAMA FUNCTION onBtnClick
InputButton.addEventListener("click", onBtnClick);

// DICHIARAZIONE FUNCTION onBtnClick
function onBtnClick() {
  //LEGGE IL VALORE DELLA SELECT DIFFICULT
  const myDifficult = difficultInputElement.value;

  //RICHIAMA FUNCTION createGrid
  createGrid(gridContainer, myDifficult);
}

// DICHIARAZIONE FUNCTION createGrid
function createGrid(gridContainer, difficult) {
  // SETTO UNA VARIABILE CHE DA L'OK ALLA GIOCABILITA' E  BLOCCA IL GIOCO IN CASO DI CLICK SU BOMB - 
  let statusGame = true;
  //RICHIAMA FUNCTION createBombs
  const arrayBombs = createBombs();
  gridContainer.innerHTML = "";
  for (let i = 1; i <= difficult; i++) {
    const box = document.createElement("div");
    box.classList.add("square");
    box.innerHTML = i;

    //RICHIAMO LA FUNZIONE CHE CALCOLA IL FATTORE DI DIVISIONE DEL FLEXBASIS IN BASE ALLA QUANTITA' DI BOX PRESENTI (49,81,100)
    let myDivFact = divFactorCalc(difficult);
    box.style.flexBasis = `calc(100% / ${myDivFact})`;

    box.dataset.numCasella = i.toString();//CREA IL DATASET
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
    gridContainer.appendChild(box);
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

/**riceve un valore numerico dalla select e ritorna il fattore di divisione 
 * che verra' utilizzato per il calcolo della disposizione dei box
 * 
 * @param {num}  gameLevel
 * @returns {num} 
 */
function divFactorCalc(gameLevel) {
  let dividingFactor;
  switch (gameLevel) {
    case '49':
      dividingFactor = '7';
      break;
    case '81':
      dividingFactor = '9';
      break;
    case '100':
      dividingFactor = '10';
      break;
  }
  return (dividingFactor);
  console.log(dividingFactor);
}