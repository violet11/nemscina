let mojDas = document.querySelector("#mojInputDas");
let mojDie = document.querySelector("#mojInputDie");
let mojDer = document.querySelector("#mojInputDer");
let seznamDiv = document.querySelector("#seznamDiv");
let vpisiGumb = document.querySelector("#vpisiGumb");
let arrayDas = [];
let arrayDie = [];
let arrayDer = [];

function dodajNaSeznam(clen, arrayClen) {
    clearSeznam();
    if (clen.value) {
    let clenValue = clen.value[0].toUpperCase() + clen.value.slice(1); 
    arrayClen.push(clenValue); 
    }
    izpisiSeznam();
    clen.value = "";
}

function izpisiSeznam() {
    let seznamDas = document.createElement("p");
    seznamDas.innerHTML = "DAS: " + " " + JSON.stringify(arrayDas);

    seznamDiv.appendChild(seznamDas);

    let seznamDie = document.createElement("p");
    seznamDie.textContent = "DIE: " + " " + JSON.stringify(arrayDie);
    seznamDiv.appendChild(seznamDie);

    let seznamDer = document.createElement("p");
    seznamDer.textContent = "DER: " + " " + JSON.stringify(arrayDer);
    seznamDiv.appendChild(seznamDer);
}

function clearSeznam() {
    while (seznamDiv.firstChild) {
        seznamDiv.removeChild(seznamDiv.firstChild);
    }
}

function eventClen(mojClen, mojArray) {
    vpisiGumb.addEventListener("click", function() {dodajNaSeznam(mojClen, mojArray)}, false);
    mojClen.addEventListener("keyup", function(event) {
        if (event.keycode === 13) {
        event.preventDefault();
        vpisiGumb.click();
        vpisiGumb.addEventListener("click", function() {dodajNaSeznam(mojClen, mojArray)}, false);
        }
    });
}

eventClen(mojDas, arrayDas);
eventClen(mojDie, arrayDie);
eventClen(mojDer, arrayDer);