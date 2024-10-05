class Game {
    constructor() {
        this.players = [new Player(0, "John"), new Player(1, "Jane")];
        this.drawPile = [];
        this.discardPile = [];
    }

    dealCards() {
        // Add cards to draw pile
        for (let i = 0; i < 60; i++) {
            this.drawPile.push(new Card(i));
        }

        // Deal cards to players
        this.players.forEach(player => {
            for (let i = 0; i < 10; i++) {
                let card = this.drawPile.pop();
                player.dealCard(card);
            }            
        });
    }
}