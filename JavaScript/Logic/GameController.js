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
        this.webInterface.addDiscardPileListeners();
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
        if (this.game.isDrawPileSelected) { return; }

        this.webInterface.unhighlightDrawPile();
    }

    handleDrawPileClick() {
        // If draw pile is already revealed, take no action
        if (this.game.isDrawPileSelected) { return; }

        let topDrawCard = this.game.getTopDrawPileCard();
        this.webInterface.revealDrawPile(topDrawCard.value);
    }

    handleDiscardPileHover() {
        if (this.game.discardPileHasCards()) {
            this.webInterface.highlightDiscardPile();
        }
    }

    handleDiscardPileMouseout() {
        // If discard pile is selected, take no action
        if (this.game.isDiscardPileSelected == true) { return; }

        this.webInterface.unhighlightDiscardPile();
    }

    handleDiscardPileClick() {
        this.game.toggleDiscardPileSelection();
    }

    handleCardHover(playerId, cardPosition) {
        this.webInterface.highlightCard(playerId, cardPosition);
    }

    handleCardMouseout(playerId, cardPosition) {
        this.webInterface.unhighlightCard(playerId, cardPosition);
    }

    handleCardClick(playerId, cardPosition) {
        // If player has selected a card from the draw pile
        if (this.game.isDrawPileSelected) {

            let drawnCard = this.game.removeTopDrawPileCard();

            // Unreveal the draw pile
            this.webInterface.unrevealDrawPile();

            // Discard player's current card
            let playerCurrentCard = this.game.players[playerId].cards[cardPosition];
            this.webInterface.addToDiscardPile(playerCurrentCard.value);
            this.game.discardPile.push(playerCurrentCard);

            // Add drawn card to player's hand
            this.webInterface.updateCard(playerId, cardPosition, drawnCard.value);
        }

        // If player has selected a card from the discard pile
        if (this.game.isDiscardPileSelected) {

            let drawnCard = this.game.removeTopDiscardPileCard();

            // Unhighlight the discard pile
            this.webInterface.unhighlightDiscardPile();

            // Discard player's current card
            let playerCurrentCard = this.game.players[playerId].cards[cardPosition];
            this.webInterface.addToDiscardPile(playerCurrentCard.value);
            this.game.discardPile.push(playerCurrentCard);
            
            // Add drawn card to player's hand
            this.webInterface.updateCard(playerId, cardPosition, drawnCard.value);
        }
    }
}