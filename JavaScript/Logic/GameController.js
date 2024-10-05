class GameController {
    constructor() {
        this.webInterface = new WebInterface(this);
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
        this.webInterface.addDrawPileListeners();
        this.game.players.forEach(player => {
            player.cards.forEach(card => {
                let cardPosition = player.cards.indexOf(card);
                this.webInterface.addCardListeners(player.id, cardPosition);
            })
        })
    }

    handleDrawPileHover() {
        this.webInterface.highlightDrawPile();
    }

    handleDrawPileMouseout() {
        // If draw pile is already revealed, do not unhighlight
        if (this.game.isDrawPileRevealed) { return; }

        this.webInterface.unhighlightDrawPile();
    }

    handleDrawPileClick() {
        // If draw pile is already revealed, take no action
        if (this.game.isDrawPileRevealed) { return; }

        let topDrawCard = this.game.getTopDrawPileCard();
        this.webInterface.revealDrawPile(topDrawCard.value);
    }

    handleCardHover(playerId, cardPosition) {
        this.webInterface.highlightCard(playerId, cardPosition);
    }

    handleCardMouseout(playerId, cardPosition) {
        this.webInterface.unhighlightCard(playerId, cardPosition);
    }

    handleCardClick(playerId, cardPosition) {
        let drawnCard = this.game.getTopDrawPileCard();

        // Discard player's current card
        let playerCurrentCard = this.game.players[playerId].cards[cardPosition];
        this.webInterface.addToDiscardPile(playerCurrentCard.value);

        // Remove drawn card from draw pile
        this.webInterface.unrevealDrawPile();
        this.game.removeTopDrawPileCard();

        // Add drawn card to player's hand
        this.webInterface.updateCard(playerId, cardPosition, drawnCard.value);

        
    }
}