class GameController {
    constructor() {
        this.webInterface = new WebInterface(this);
        this.game = new Game();
    }

    launch() {
        // Display instruction menu
        this.webInterface.populateInstructionMenu();

        // Display draw pile, discard pile
        this.webInterface.addDrawAndDiscardPiles();

        // Display players' hand areas
        this.game.players.forEach(player => {
            this.webInterface.addPlayer(player.id, player.name);
        });

        // Shuffle cards
        this.game.drawPile = this.game.shuffle(this.game.drawPile);

        // Deal cards
        this.game.dealCards();
        
        // Display cards
        this.displayDealtCards();

        // Add event listeners
        this.addEventListeners();
    }

    /**
     * Updates the web interface to show each current Card dealt to each
     * Player
     */
    displayDealtCards() {
        this.game.players.forEach(player => {
            player.cards.forEach(card => {
                let cardPosition = player.cards.indexOf(card);
                this.webInterface.updateCard(player.id, cardPosition, 
                    card.value, card.backgroundColor, card.textColor);
            })
        });
    }

    /**
     * Adds event listeners to web interface
     */
    addEventListeners() {
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
        // Don't hover if current player has not done initial swap yet
        if (this.game.players[this.game.currentPlayerNum].hasDoneInitialSwap == false) {
            return;
        }

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
        // Don't hover if current player has not done initial swap yet
        if (this.game.players[this.game.currentPlayerNum].hasDoneInitialSwap == false) {
            return;
        }

        // Don't hover if draw pile is selected
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
        // Don't toggle if current player has not done initial swap yet
        if (this.game.players[this.game.currentPlayerNum].hasDoneInitialSwap == false) {
            return;
        }

        // Don't toggle if draw pile is selected
        if (this.game.isDrawPileSelected == true) { return; }

        this.game.toggleDiscardPileSelection();
    }

    handleCardHover(playerId, cardPosition) {
        // Don't hover if not this player's turn
        if (this.game.currentPlayerNum != playerId) { return; }

        // Don't hover if draw/discard not selected
        // and player has already done initial swap
        if (this.game.isDrawPileSelected == false 
            && this.game.isDiscardPileSelected == false
            && this.game.players[playerId].hasDoneInitialSwap == true) { return; }

        this.webInterface.highlightCard(playerId, cardPosition);
    }

    handleCardMouseout(playerId, cardPosition) {
        // Don't unhighlight if this is the player's targeted swap card
        if (cardPosition == this.game.players[playerId].initialSwapTargetCardPosition) {
            return;
        }

        this.webInterface.unhighlightCard(playerId, cardPosition);
    }

    handleCardClick(playerId, cardPosition) {
        let drawnCard = null;                       // Stores the card the player draws
        let player = this.game.players[playerId];   // Stores the player who clicked

        // Don't do anything if not this player's turn
        if (this.game.currentPlayerNum != playerId) { return; }

        // If this player has not yet done their initial swap
        if (player.hasDoneInitialSwap == false) {

            // If this player has not yet set a target to swap with
            if (player.initialSwapTargetCardPosition == -1) {
                player.initialSwapTargetCardPosition = cardPosition;
                this.webInterface.highlightCard(playerId, cardPosition);
                return;
            }

            // Otherwise process the swap and update the interface
            let swapCardAPosition = cardPosition;
            let swapCardBPosition = player.initialSwapTargetCardPosition;
            player.swapCards(swapCardAPosition, swapCardBPosition);
            this.game.advanceTurn();
            this.webInterface.unhighlightCard(playerId, swapCardAPosition);
            this.webInterface.unhighlightCard(playerId, swapCardBPosition);
            this.webInterface.updateCard(playerId, swapCardAPosition, 
                player.cards[swapCardAPosition].value,
                player.cards[swapCardAPosition].backgroundColor,
                player.cards[swapCardAPosition].textColor);
            this.webInterface.updateCard(playerId, swapCardBPosition, 
                player.cards[swapCardBPosition].value,
                player.cards[swapCardBPosition].backgroundColor,
                player.cards[swapCardBPosition].textColor);
        }

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
        this.game.discard(playerCurrentCard);

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