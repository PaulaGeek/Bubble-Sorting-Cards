import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

let cantidadDeCartas = "perro";
let aOrdenar = [];

const element = document.getElementById("robarboton");
element.addEventListener("click", tantasCartitas);

function tantasCartitas() {
  let inputValue = document.getElementById("robarinput").value;
  if (inputValue === "") {
    alert("No elegiste número tiramos random, mequetrefe");
    cantidadDeCartas = Math.ceil(Math.random() * 6 + 1);
  } else if (inputValue < 2) {
    alert(
      "Para ordenar cosas tienen que ser al menos 2, tiramos random, mequetrefe"
    );
    cantidadDeCartas = Math.ceil(Math.random() * 6 + 1);
  } else if (inputValue > 52) {
    alert("Un mazo tiene solo 52 cartas, mequetrefe");
    cantidadDeCartas = 52;
  } else {
    cantidadDeCartas = inputValue;
  }

  document.getElementById("contieneCartas").innerHTML = ``;
  ramdomCard();
}

function ramdomCard() {
  const palos = ["♦", "♥", "♠", "♣"];
  const numeros = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];
  const valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  // vaciamos aOrdenar para que no vaya acumulando cartas de otros mundos
  aOrdenar = [];
  for (let i = 1; i <= cantidadDeCartas; i++) {
    let indexPalo = Math.floor(Math.random() * palos.length);
    let indexNumero = Math.floor(Math.random() * numeros.length);

    // definimos la carta con toda su mística aleatoria
    let data = [
      [palos[indexPalo]],
      [numeros[indexNumero]],
      [valores[indexNumero]]
    ];

    console.log("data: " + data);
    console.log("aOrdenar: " + aOrdenar);
    console.log("aOrdenar.indexOf(data) " + aOrdenar.indexOf(data));
    if (aOrdenar.indexOf(data) >= 0) {
      i = i - 1;
    } else {
      // metemos la carta en la mano
      aOrdenar.push(data);
      // metemos la carta dentro de la pantalla
      let top = document.getElementById("top");
      let number = document.getElementById("number");
      let bottom = document.getElementById("bottom");
      if (indexPalo === 0 || indexPalo === 1) {
        document.getElementById(
          "contieneCartas"
        ).innerHTML += `<div class="card m-2" style="width: 5rem; heigth:8rem">
          <ul class="list-group list-group-flush">
            <li class="list-group-item text-danger border-0 p-0" id="top">${palos[indexPalo]}</li>
            <li class="list-group-item text-danger border-0 p-0 display-6 text-center" id="number">${numeros[indexNumero]}</li>
            <li class="list-group-item text-danger border-0 p-0" style="transform: rotate(180deg)" id="bottom">${palos[indexPalo]}</li>
          </ul>
        </div>`;
      } else {
        document.getElementById(
          "contieneCartas"
        ).innerHTML += `<div class="card m-2" style="width: 5rem; heigth:8rem">
      <ul class="list-group list-group-flush">
        <li class="list-group-item border-0 p-0" id="top">${palos[indexPalo]}</li>
        <li class="list-group-item border-0 p-0 display-6 text-center" id="number">${numeros[indexNumero]}</li>
        <li class="list-group-item border-0 p-0" style="transform: rotate(180deg)" id="bottom">${palos[indexPalo]}</li>
      </ul>
    </div>`;
      }
    }
  }
  return aOrdenar;
}
// aca se debe retornar el array que contiene los valores de las caryas generadas, que es el declararon arriba: aOrdenar

const elementv2 = document.getElementById("ordenarboton");
// elementv2.addEventListener("click", ordenarCartitas);
elementv2.addEventListener("click", function() {
  ordenarCartitas([aOrdenar]);
});

function ordenarCartitas(aOrdenar) {
  aOrdenar = aOrdenar[0];
  let wall = aOrdenar.length - 1; //we start the wall at the end of the aOrdenaray
  document.getElementById("contieneCartas").innerHTML = ``;
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      // extraemos los valores a comparar
      let cosa1 = aOrdenar[index];
      let cosa2 = aOrdenar[index + 1];

      // acá es donde las burbujitas suben
      if (parseInt(cosa1[2]) > parseInt(cosa2[2])) {
        let aux = aOrdenar[index];
        aOrdenar[index] = aOrdenar[index + 1];
        aOrdenar[index + 1] = aux;
      }
      index++;
    }
    wall--; //decrease the wall
  }
  while (aOrdenar.length > 0) {
    // Nos chupamos la primer carta
    let unaCarta = aOrdenar[0];
    aOrdenar.shift();
    // Ahora metemos las cartitas en la pantalla
    let top = document.getElementById("top");
    let number = document.getElementById("number");
    let bottom = document.getElementById("bottom");
    let paloCarta = unaCarta[0];
    if (paloCarta[0] === "♦" || paloCarta[0] === "♥") {
      document.getElementById(
        "contieneCartas"
      ).innerHTML += `<div class="card m-2" style="width: 5rem;">
          <ul class="list-group list-group-flush">
            <li class="list-group-item text-danger border-0 p-0" id="top">${unaCarta[0]}</li>
            <li class="list-group-item text-danger border-0 p-0 display-6 text-center" id="number">${unaCarta[1]}</li>
            <li class="list-group-item text-danger border-0 p-0" style="transform: rotate(180deg)" id="bottom">${unaCarta[0]}</li>
          </ul>
        </div>`;
    } else {
      document.getElementById(
        "contieneCartas"
      ).innerHTML += `<div class="card m-2" style="width: 5rem;">
      <ul class="list-group list-group-flush">
        <li class="list-group-item border-0 p-0" id="top">${unaCarta[0]}</li>
        <li class="list-group-item border-0 p-0 display-6 text-center" id="number">${unaCarta[1]}</li>
        <li class="list-group-item border-0 p-0" style="transform: rotate(180deg)" id="bottom">${unaCarta[0]}</li>
      </ul>
    </div>`;
    }
  }
}
