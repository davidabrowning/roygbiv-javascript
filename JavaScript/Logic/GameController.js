class GameController {
    constructor() {
        this.webInterface = new WebInterface();
        this.game = new Game();
    }

    createPlayer(name) {
        var p = new Player(name);
        this.game.addPlayer(p);
    }
}