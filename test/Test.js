class Game {
    constructor() {
        this.clicks = 0;
    }
    addClick() {
        this.clicks++;
    }
    getClicks() {
        return this.clicks;
    }
}

const game = new Game();
var element = document.getElementById("myBtn");
element.addEventListener("click", myFunction1);
element.addEventListener("click", myFunction2);

function myFunction1() {
    alert("Clicked the p from David's file!");
}

function myFunction2() {
    game.addClick();
    var clicks = game.getClicks();
    alert("F2: " + clicks + "!");
}