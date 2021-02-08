function load_moon_phases(obj){
    var gets=[]
    for (var i in obj){
        gets.push(i+"="+encodeURIComponent(obj[i]))
    }	
    /* var xmlhttp = new XMLHttpRequest()
    var url = "https://www.icalendar37.net/lunar/api/?"+gets.join("&");
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var moon  = JSON.parse(xmlhttp.responseText)
            document.getElementById("ex1").innerHTML = moon.nextFullMoon;
            console.log(moon);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send(); */

    // fetch API namesto XMLHttpRequest
    let getResponse = async() => {
        let response = await fetch("https://www.icalendar37.net/lunar/api/?"+gets.join("&"));
        let moon = await response.json();
        document.getElementById("ex1").innerHTML = moon.nextFullMoon;
        console.log(moon);
        console.log(response.url);
    }
    getResponse();
}

document.addEventListener("DOMContentLoaded", function() { 
    var configMoon = {
        lang  		:'en', // 'ca' 'de' 'en' 'es' 'fr' 'it' 'pl' 'pt' 'ru' 'zh' (*)
        month 		:new Date().getMonth() + 1, // 1  - 12
        year  		:new Date().getFullYear(),
        size		:50, //pixels
        lightColor	:"#FFFF88", //CSS color
        shadeColor	:"#111111", //CSS color
        sizeQuarter	:20, //pixels
        texturize	:false //true - false
    }
    configMoon.LDZ=new Date(configMoon.year,configMoon.month-1,1)/1000
    load_moon_phases(configMoon)
})

