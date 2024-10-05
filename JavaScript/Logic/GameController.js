class GameController {
    constructor() {
        this.webInterface = new WebInterface();
        this.game = new Game();
    }

    launch() {
        // Create game board: add draw pile, discard pile
        this.webInterface.addDrawAndDiscardPiles();

        // Create game board: add players
        this.game.players.forEach(player => {
            this.webInterface.addPlayer(player.id, player.name);
        });

        // Deal cards
        this.game.dealCards();
        
        // Display cards
        this.game.players.forEach(player => {
            player.cards.forEach(card => {
                let cardPosition = player.cards.indexOf(card);
                this.webInterface.updateCard(player.id, cardPosition, card.value);
            })
        });

        // Add event listeners
    }
}