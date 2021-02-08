let geslo = document.getElementById("password");
let ponovnoGeslo = document.querySelector("#confirmPassword");
let imeInput = document.getElementById("name");

// prikaže opozorilo kot flag ob inputu
const ujemanjeGesla = function() {
    if (geslo.value != ponovnoGeslo.value) {
        ponovnoGeslo.setCustomValidity("Gesla se ne ujemata. Poskusi ponovno.");
    } else {
        ponovnoGeslo.setCustomValidity("");
    }
};

const ujemGeselInputEvent = function() {
        ponovnoGeslo.addEventListener("input", ujemanjeGesla, false);
};
ujemGeselInputEvent();

const iskanjePrazniProstor = function(text) {
    let prazniProstorRegex = /[^\s]{1,}/;
    return String(text).search(prazniProstorRegex) != -1;
}

const prazniProstorValidacija = function() {
    if(!iskanjePrazniProstor(imeInput.value)) {
        imeInput.setCustomValidity("Polje ne sme biti prazno");
        imeInput.className ="praznoPolje";
        return false;
    } else {
        imeInput.setCustomValidity("");
        imeInput.className ="okPolje";
        return true;
    }

}
const  prazniProstorEvent = function() {
    imeInput.addEventListener("input", prazniProstorValidacija, false);
}
prazniProstorEvent();