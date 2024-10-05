class Game {
    constructor() {
        this.currentTurn = 0;
        this.currentPlayerNum = 0;
        this.players = [new Player(0, "John"), new Player(1, "Jane")];
        this.drawPile = [];
        this.discardPile = [];
        this.isDrawPileSelected = false;
        this.isDiscardPileSelected = false;
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

    getTopDrawPileCard() {
        this.isDrawPileSelected = true;
        return this.drawPile[0];
    }

    removeTopDrawPileCard() {
        this.isDrawPileSelected = false;
        return this.drawPile.shift();
    }

    getTopDiscardPileCard() {
        return this.discardPile[0];
    }

    removeTopDiscardPileCard() {
        this.isDiscardPileSelected = false;
        return this.discardPile.shift();
    }

    discardPileHasCards() {
        if (this.discardPile.length > 0) {
            return true;
        }
        return false;
    }

    toggleDiscardPileSelection() {
        if (this.isDiscardPileSelected == true) {
            this.isDiscardPileSelected = false;
        } else {
            this.isDiscardPileSelected = true;
        }
    }

    advanceTurn() {
        this.currentTurn++;
        this.currentPlayerNum = this.currentTurn % this.players.length;
    }
}