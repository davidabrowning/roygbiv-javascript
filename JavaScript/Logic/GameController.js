class GameController {
    constructor() {
        this.webInterface = new WebInterface();
        this.game = new Game();
    }

    launch() {
        // Create game board
        this.game.players.forEach(player => {
            this.webInterface.addPlayer(player.id, player.name);
        });

        // Deal cards
        // Add event listeners
    }
}