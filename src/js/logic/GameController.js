class GameController {
    constructor() {
        this.webInterface = new WebInterface(this);
        this.game = new Game();
    }

    launch() {
        // Populate instruction menu
        this.webInterface.populateInstructionMenu();

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
                this.webInterface.updateCard(player.id, cardPosition, card.value, card.backgroundColor, card.textColor);
            })
        });

        // Add event listeners
        this.webInterface.addMenuListeners();
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

        // Unhighlight/unselect discard pile if it happens to be highlighted
        this.webInterface.unhighlightDiscardPile();
        this.game.isDiscardPileSelected = false;

        let topDrawCard = this.game.getTopDrawPileCard();
        this.webInterface.revealDrawPile(topDrawCard.value, topDrawCard.backgroundColor, topDrawCard.textColor);
    }

    handleDiscardPileHover() {
        // If draw pile is selected, take no action
        if (this.game.isDrawPileSelected == true) { return; }

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
        // If draw pile is selected, take no action
        if (this.game.isDrawPileSelected == true) { return; }

        this.game.toggleDiscardPileSelection();
    }

    handleCardHover(playerId, cardPosition) {
        // Don't hover if not this player's turn
        if (this.game.currentPlayerNum != playerId) { return; }

        // Don't hover if draw/discard not selected
        if (this.game.isDrawPileSelected == false && this.game.isDiscardPileSelected == false) { return; }

        this.webInterface.highlightCard(playerId, cardPosition);
    }

    handleCardMouseout(playerId, cardPosition) {
        this.webInterface.unhighlightCard(playerId, cardPosition);
    }

    handleCardClick(playerId, cardPosition) {
        let drawnCard = null;   // Stores the card the player draws

        // Don't do anything if not this player's turn
        if (this.game.currentPlayerNum != playerId) { return; }

        // Don't do anything if draw/discare pile not selected
        if (this.game.isDrawPileSelected == false && this.game.isDiscardPileSelected == false) { return; }

        // If player has selected a card from the draw pile
        if (this.game.isDrawPileSelected) {

            // Unreveal the draw pile and set drawnCard
            this.webInterface.unrevealDrawPile();
            drawnCard = this.game.removeTopDrawPileCard();
        }

        // If player has selected a card from the discard pile
        if (this.game.isDiscardPileSelected) {

            // Unhighlight the discard pile and set drawnCard
            this.webInterface.unhighlightDiscardPile();
            drawnCard = this.game.removeTopDiscardPileCard();
        }

        // Discard player's current card
        let playerCurrentCard = this.game.players[playerId].cards[cardPosition];
        this.webInterface.addToDiscardPile(playerCurrentCard.value, playerCurrentCard.backgroundColor, playerCurrentCard.textColor);
        this.game.discardPile.push(playerCurrentCard);

        // Add drawn card to player's hand
        this.webInterface.updateCard(playerId, cardPosition, drawnCard.value, drawnCard.backgroundColor, drawnCard.textColor);
        this.game.players[playerId].cards[cardPosition] = drawnCard;

        // Unhighlight current card
        this.webInterface.unhighlightCard(playerId, cardPosition);

        // Check for victory
        if (this.game.checkForVictory(playerId)) {
            this.webInterface.highlightHandForVictory(playerId);
        }
        
        // Advance turn
        this.game.advanceTurn();
    }
}