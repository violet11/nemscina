let farbaKontejner = document.getElementById("farba"); // treba je najprej vzeti parent id
let seznamPravilnihOdgovorov = farbaKontejner.getElementsByClassName("barve")
let seznamOdgovorov = farbaKontejner.getElementsByClassName("form-control");
let seznamIndikatorjevPravilnosti = farbaKontejner.getElementsByTagName("span");
let navodiloTekst = document.querySelector(".navodilo h4");

//color so pravilni odgovori in rešitve, hexValue barve okvirjev
let barve = [{ color: "blau", hexValue: "#1a1aff" }, { color: "gelb", hexValue: "#ffff1a" }, { color: "schwarz", hexValue: "black" }, { color: "lila", hexValue: "#ff4da6" }, { color: "braun", hexValue: "#cc6600" }, { color: "bunt", hexValue: "beige" }, { color: "grün", hexValue: "#00e600" }, { color: "hellblau", hexValue: "#4db8ff" }, { color: "orange", hexValue: "#FF8C00" }, { color: "rosa", hexValue: "#ffb3d9" }, { color: "dunkelblau", hexValue: "#000080" }, { color: "weiss", hexValue: "white" }, { color: "rot", hexValue: "red" }, { color: "türkis", hexValue: "#33ffff" }, { color: "grau", hexValue: "#808080" }, { color: "violett", hexValue: "#9400D3" }];

function preveriOdgovore() {
    let seznamUjemajocihOdgovorov = [];
    let regex = /[^\s]*\wß*/;

    for (let i = 0; i < seznamOdgovorov.length; i++) {
        let odgovor = seznamOdgovorov[i].value;
        let pravilniOdgovor = barve[i].color;

        // če so na začetku prazni presledki
        let regOdgovor = odgovor.match(regex);
        // Če odgovora ni, spucamo indikator ...
        if (!regOdgovor) {
            seznamIndikatorjevPravilnosti[i].innerHTML = "";
        }
        else if (regOdgovor.toString() === pravilniOdgovor) {
            seznamIndikatorjevPravilnosti[i].innerHTML = "Pravilno :)";
            seznamUjemajocihOdgovorov.push("pravi odgovor");
            if (seznamUjemajocihOdgovorov.length === 16) {
                navodiloTekst.innerHTML = "Čestitke :)"
            } else {
                navodiloTekst.innerHTML = "Vstavi pravilne barve :)";
            }
        } else {
            seznamIndikatorjevPravilnosti[i].innerHTML = ":(";
        }
        seznamIndikatorjevPravilnosti[i].style.display = "block";
        console.log(seznamUjemajocihOdgovorov);
    }
}

//rešitve
function prikaziSkrijResitve() {
    for (let i = 0; i < seznamPravilnihOdgovorov.length; i++) {
        // Če so rešitve prikazane, jih skrijemo, ...
        if (seznamPravilnihOdgovorov[i].style.display === "block") {
            seznamPravilnihOdgovorov[i].style.display = "none";
        }
        // ... drugače jih pokažemo.
        else {
            seznamPravilnihOdgovorov[i].style.display = "block";
        }
    }
}

function ponastaviVajo() {
    for (let i = 0; i < seznamOdgovorov.length; i++) {
        // Skrij barvni element in indikator pravilnosti.
        seznamPravilnihOdgovorov[i].style.display = "none";
        seznamIndikatorjevPravilnosti[i].style.display = "none";

        // Ponastavi odgovor;    
        seznamOdgovorov[i].value = "";
    }
}

//barva okvirje
function barvniOkvir() {
    let listOfColorDivs = farbaKontejner.getElementsByClassName("color");
    for (let i = 0; i < listOfColorDivs.length; i++) {
        listOfColorDivs[i].style.backgroundColor = barve[i].hexValue;
    }
}
barvniOkvir();