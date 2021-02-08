import {prikaziImg, animationFruit, fruitArray} from "./animacijaSadje.js";

let seznamBesed = [
    {
        clen: "das", 
        besede : ["Mädchen", "System", "Bankett", "Fräulein", "Thema", "Dokument", "Ergebnis", "Auto", 
                    "Schicksal", "Eigentum", "Universum", "Bett", "T-Shirt", "Schulzimmer", "Fenster", 
                    "Bild", "Buch", "Heft", "Lineal", "Zimmer", "Kind", "Licht", "Amt", "Haus",
                     "Wort", "Taxi", "Kino", "Rad", "Boot", "Handy", "Wörterbuch","Bügeleisen","Fahrrad",
                     "Telefon","Klavier","Blatt","Geld", "Bier","Museum","Foto","Restaurant","Glas", "Spiel", "Tier",
                      "Flugzeug"]
    },
    {
        clen: "die",
        besede : ["Schokolade", "Realität", "Intelligenz", "Bäckerei", "Gesundheit", "Phantasie", "Grammatik", 
                    "Studentin", "Maschine", "Version", "Alternative", "Fähigkeit", "Freundschaft", "Dosis", 
                    "Bibliothek", "Auskunft", "Leitung", "Kultur", "Lampe", "Jacke", "Tafel","Tür",
                    "Tasche","Stadt","Kuh","Nacht","Brille","Schere","Kaffemaschine","Kreide","Oma",
                    "CD","Wurst","DVD","Idee","Glühbirne","Milch","Tante","Frau","Köchin", "Universität", 
                    "Blume", "Farbe", "Tasse"]
    },
    {
        clen: "der",
        besede : ["Kontrast", "Millionär", "Kontinent", "Friseur", "Optimismus", "Liebling", "Psychologe", "Rentner", "Philosoph", "Direktor", "Tisch",  
                    "Pullover","Schrank","Stuhl","Bleistift","Buntstift","Farbstift","Füller","Kuli",
                    "Radiergummi","Spitzer","Montag","Bürger","Fehler","Garten","Apfel","Bus","Onkel",
                    "Cousin","Film","Hund","Saft","Ball","Student","Junge","Löwe","Computer","Fernseher","Staubsauger",
                    "Kühlschrank", "Kaffe","Kuchen","Salat"]
    }
];

// če dodamo besede na zgornji seznam
function isciPodvojitveVseznamu() {
    for (var index of seznamBesed) {
        for (var beseda of index.besede) {
            var podvojitev = index.besede.includes(beseda, index.besede.indexOf(beseda) + 1);
        }
    }     
    if (podvojitev) {
        alert("besede se ujemajo: " + index.clen + " " + beseda + " - popravi seznam");
    }
}
isciPodvojitveVseznamu(); 

const pridobiPravilneBesedeStorage = function() {
    if (localStorage.length > 2) {
        return localStorage.getItem("pravilneBesede").split(",");
    }
    else {
        return [];
    }
}

const pridobiRandomBesedeStorage = function() {
    if (localStorage.length > 0) {
        return localStorage.getItem("randomBesede").split(",");
    }
    else {
        return [];
    }
}

let arrayBesedSkupna = seznamBesed[0].besede.concat(seznamBesed[1].besede, seznamBesed[2].besede); // združimo vse tri arraye besede iz seznamBesed
let prvotnaDolzinaSeznama = arrayBesedSkupna.length; // se ne spreminja
let randomBesedeZgornjiBox = document.querySelector("#dolCleniBesede");
let naslov = document.querySelector("randBesedeBox, h4");
let inputProstorSeznam = document.querySelectorAll("input");
let spodnjiBoxSeznam = document.getElementsByClassName("spodnjiBox");
let sadje = document.querySelectorAll("#animaFruit img"); // v animacijaSadje.js ustvarimo img elemente
let inputBtnSeznam = document.querySelectorAll(".inputPoravnava button");

// predno p elementu dodamo besedilo, preverimo, če je ta beseda že na spodnjem seznamu kot pravilna 
// (lahko se ponovijo, če se stran reloada)
const izbrisiPravilneBesedeRandom = function() {
    for (let i = 0; i < pridobiPravilneBesedeStorage().length; i++) {
        if (arrayBesedSkupna.includes(pridobiPravilneBesedeStorage()[i])) {
            arrayBesedSkupna.splice(arrayBesedSkupna.indexOf(pridobiPravilneBesedeStorage()[i]), 1);
        }
    }
}

// vrne naključno izbrano besedo iz seznama
const randomBeseda = function () {
    if (localStorage.length > 2) {
        izbrisiPravilneBesedeRandom();
    }
    return arrayBesedSkupna[Math.floor(Math.random() * arrayBesedSkupna.length)];
}

// ustvari nov p element in ga priključi div parentu
let ustvariElementP = function(text, parent) {
    let p = document.createElement("p");
        p.textContent = text;
        parent.appendChild(p);
}

const ustvariRandomBesedo = function(beseda) {
    if (beseda !== undefined) {
        ustvariElementP(beseda, randomBesedeZgornjiBox);
        arrayBesedSkupna.splice(arrayBesedSkupna.indexOf(beseda), 1);
    }
}

/* const stetjeKlikov = function() {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount) + 1;
        } else {
        localStorage.clickcount = 1;
        }
    } else {
        alert("Sorry, your browser does not support web storage...");
    }
} */

// generira 12 random besed iz seznama
const prikaziSeznamRandomBesed = function() {
    let i = 0;
    let randomArray = [];
    while(i < 12) {
        let rBeseda = randomBeseda();
        ustvariRandomBesedo(rBeseda);
        randomArray.push(rBeseda);
        i++;
    };
    localStorage.setItem("randomBesede", randomArray); // shranimo v local storage
}

const zacetek = function() {
    if (localStorage.length < 3) {
        prikaziSeznamRandomBesed();
    }
}
zacetek();

const steviloBesed = function() {
    return $("#steviloBesed").text(prvotnaDolzinaSeznama - pridobiPravilneBesedeStorage().length);
}
steviloBesed();

function clearList() {
    while (randomBesedeZgornjiBox.firstChild) {
        randomBesedeZgornjiBox.removeChild(randomBesedeZgornjiBox.firstChild);
    }
}

const regexClen = function(inputBeseda) {
    let regClen = /[^\s]*\w/;
    let reg = inputBeseda.match(regClen).toString();
    if (inputBeseda != "" && reg != null) {
        return reg;
    } else {
        return undefined
    }
}

const ujemanjeInputInSpodnjiBox = function(element) {
    for (let beseda of pridobiPravilneBesedeStorage()) {
        if (regexClen(element.value) === beseda) {
            return true;
        }
    }
}

// ustvari element p z besedilom input.value
const ustvariBesedoVspodnjemBoxu = function(index) {
    ustvariElementP(regexClen(inputProstorSeznam[index].value), spodnjiBoxSeznam[index]);
}

// ker se ves čas spreminja, mora biti v funkciji
const seznamBesedSpodnjiBoxDom = function() {
    return document.querySelectorAll(".inputContainer p");
}

const precrtajPravilnoBesedo = function(element) {
    for (let item of randomBesedeZgornjiBox.children) {
        if (regexClen(element.value) === item.innerHTML) {
            item.className = "randomLineP";
        }
    }
}

const shraniBesedeSpodnjiBoxVstorage = function() {
    let pravilneBesedeArray = [];
    for (let pravilnaBeseda of seznamBesedSpodnjiBoxDom()) {
        pravilneBesedeArray.push(pravilnaBeseda.innerHTML);
    }
        localStorage.setItem("pravilneBesede", pravilneBesedeArray);
}

// dodaj classe za animiranje ob določenih pogojih
const animateFruit = function() {
    let z = 0;
    if (localStorage.getItem("z") > 0) {
        z = localStorage.getItem("z");
    }
    if ((seznamBesedSpodnjiBoxDom().length === (Math.floor(prvotnaDolzinaSeznama/13))*z + 1) && // ker je 14 sadežev, 
    // vendar prvega ne upoštevamo, ker pade ob prvi pravilni besedi
        (z < fruitArray.length - 1)) { // ker hočemo, da zadnji sadež vedno pade, ko vpišemo zadnjo pravilno besedo
            animationFruit(sadje[z]);
            z++;
    } else if (seznamBesedSpodnjiBoxDom().length === prvotnaDolzinaSeznama) {
        animationFruit(sadje[fruitArray.length - 1]); // zadnji sadež
    }
    localStorage.setItem("z", z);
}

const ustvariGumbVadiZnova = function() {
    let gumb = $("<button type='button' id='gumbVadiZnova'> </button>").text("Poskusi znova");
    $(".randBesedeBox").append(gumb);
    gumb.click(function() {
        localStorage.clear();
        location.reload();
    });
}

const cestitaj = function() {
        $(naslov).text("ČESTITKE, ZBRALI STE VSE SADEŽE :)");
        $(naslov).addClass("naslovTransform");
        $("#steviloBesed").hide();
        $(randomBesedeZgornjiBox).hide();
        ustvariGumbVadiZnova();
}
            
// preveri pravilnost besede v inputu, jo prečrtaj v zgornjem boxu in jo izpiši v spodnjem boxu -- animacija sadja
const preveriClen = function(index) {
    let clenOdgovor = inputProstorSeznam[index];
    if (clenOdgovor.value === "") {
        alert("Vpiši pravilno besedo");
    } else if (seznamBesed[index].besede.indexOf(regexClen(clenOdgovor.value)) === -1) {
        alert("Poskusi ponovno, pazi na velike začetnice :(")
        clenOdgovor.value = "";
    } else {
        if (ujemanjeInputInSpodnjiBox(clenOdgovor) === true) {
            alert("Ta beseda že obstaja");
            clenOdgovor.value = "";
        } else {
            if (pridobiRandomBesedeStorage().includes(regexClen(clenOdgovor.value))) {
                precrtajPravilnoBesedo(clenOdgovor);
                ustvariBesedoVspodnjemBoxu(index);
                shraniBesedeSpodnjiBoxVstorage();
                animateFruit();
                steviloBesed();
                clenOdgovor.value = "";
                let precrtaneBesedeClass = document.querySelectorAll(".randomLineP");
                if (precrtaneBesedeClass.length === randomBesedeZgornjiBox.children.length && 
                    pridobiPravilneBesedeStorage().length < prvotnaDolzinaSeznama) {
                    clearList(); 
                    prikaziSeznamRandomBesed();
                }
                else if (pridobiPravilneBesedeStorage().length === prvotnaDolzinaSeznama) {
                    cestitaj();
                }
            } else {
                clenOdgovor.value = "";
            }
        }
    }
}

// gumb ali enter
function eventPreveriClen(index) {
    inputBtnSeznam[index].addEventListener("click", function() {preveriClen(index)}, false);
    inputProstorSeznam[index].addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
        event.preventDefault();
        preveriClen(index);
        }
    }, false);
}
eventPreveriClen(0);
eventPreveriClen(1);
eventPreveriClen(2);

const prikaziFruit = function() {
    let a = 1; 
    for (let i = 0; i < fruitArray.length - 1; i++) {
        if (pridobiPravilneBesedeStorage().length >= a) {
            prikaziImg(sadje[i]);
            a += Math.floor(prvotnaDolzinaSeznama/13);
        } 
    }
    if (pridobiPravilneBesedeStorage().length === prvotnaDolzinaSeznama) {
        prikaziImg(sadje[fruitArray.length - 1]);
    }
}
prikaziFruit();

const pocistiInputObReloadu = function() {
    for (let item of inputProstorSeznam) {
        item.value = "";
    }
}
pocistiInputObReloadu();

const prikaziStorage = function() {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.length > 2) {
            if (pridobiPravilneBesedeStorage().length < prvotnaDolzinaSeznama) {
                for (let randBesedaStor of pridobiRandomBesedeStorage()) {
                    ustvariElementP(randBesedaStor, randomBesedeZgornjiBox);
                }
                for (let i = 0; i < randomBesedeZgornjiBox.childElementCount; i++) {
                    randomBesedeZgornjiBox.childNodes.forEach(element => {
                        for (let i = 0; i < pridobiPravilneBesedeStorage().length; i++) {
                            if (element.innerHTML === pridobiPravilneBesedeStorage()[i]) {
                                element.className = "randomLineP";
                            }
                        }
                    });
                }
            } else {
                cestitaj();
            }
            if (localStorage.length > 2) {
                for (let pravilnaBesedaStorage of pridobiPravilneBesedeStorage()) {
                    function prilepiElementStorage(index) {
                        if (seznamBesed[index].besede.indexOf(pravilnaBesedaStorage) != -1) {
                            ustvariElementP(pravilnaBesedaStorage, spodnjiBoxSeznam[index]);
                    } else;
                }
                    prilepiElementStorage(0);
                    prilepiElementStorage(1);
                    prilepiElementStorage(2);
                }
            } 
        }
    } else {
        alert("no web storage");
    }
}
prikaziStorage();