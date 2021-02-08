export {prikaziImg, animationFruit, fruitArray};

let fruitContainer = document.getElementById("animaFruit");
let fruitArray = [
    "https://img.icons8.com/doodle/48/000000/apple.png",
    "https://img.icons8.com/doodle/48/000000/pear--v1.png",
    "https://img.icons8.com/doodle/100/000000/cherry.png",
    "https://img.icons8.com/doodle/100/000000/orange.png",
    "https://img.icons8.com/doodle/48/000000/watermelon--v1.png",
    "https://img.icons8.com/doodle/100/000000/grape.png",
    "https://img.icons8.com/doodle/48/000000/raspberry--v1.png",
    "https://img.icons8.com/doodle/48/000000/citrus.png",
    "https://img.icons8.com/doodle/48/000000/paprika--v1.png",
    "https://img.icons8.com/doodle/100/000000/pineapple.png",
    "https://img.icons8.com/doodle/100/000000/strawberry.png",
    "https://img.icons8.com/doodle/48/000000/sweet-banana--v1.png",
    "https://img.icons8.com/doodle/48/000000/tomato--v1.png",
    "https://img.icons8.com/doodle/48/000000/kiwi--v1.png"];

// ustvari nov element img 
const createImg = function(imgUrl, levo) {
    let img = document.createElement("IMG");
    img.src = imgUrl;
    img.setAttribute("src", imgUrl);
    img.setAttribute("height", "35");
    img.setAttribute("alt", "fruit");
    img.style.position = "absolute";
    img.style.display = "none";
    img.style.left = 40 + levo + "px";
    fruitContainer.appendChild(img);
}

const prikaziImg = function(item) {
    item.style.display = "block";
}

const animationFruit = function(item) {
    let container = document.getElementById("dolocnClenContainer");
    let to = container.clientHeight - item.clientHeight - 705;
    prikaziImg(item);
    animate({
        duration: 2000,
        timing: makeEaseOut(bounce),
        draw(progress) {
        item.style.top = to * progress + 'px';
        }
    });
}

const ustvariSadjeImage = function() {
    let x = 0;
    for (let icon of fruitArray) {
        createImg(icon, x);
        x += 80; // v levo
    }
    let z = 0; 
}
ustvariSadjeImage();

function makeEaseOut(timing) {
    return function(timeFraction) {
      return 1 - timing(1 - timeFraction);
    }
}

function bounce(timeFraction) {
    for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
        return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
    }
}

function animate(options) {
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
        
        // timeFraction от 0 до 1
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;

        // текущее состояние анимации
        var progress = options.timing(timeFraction)
        
        options.draw(progress);

        if (timeFraction < 1) {
        requestAnimationFrame(animate);
        }
    });
}