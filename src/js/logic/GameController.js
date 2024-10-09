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

        // Highlight current player's playing area
        this.webInterface.highlightPlayingArea(this.game.currentPlayerNum);

        // Add event listeners
        this.addEventListeners();
    }

    startNewGame() {
        this.webInterface = new WebInterface(this);
        this.game = new Game();

        // Reset player area (otherwise it would be duplicated)
        this.webInterface.resetPlayingArea();

        // Launch the new game
        this.launch();
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
                    card.displayValue, card.backgroundColor, card.textColor);
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
        // If game is over, take no action
        if (this.game.isGameOver()) { return; }

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
        // If game is over, take no action
        if (this.game.isGameOver()) { return; }

        // If draw pile is already revealed, take no action
        if (this.game.isDrawPileSelected) { return; }

        // Don't reveal if current player has not done initial swap yet
        if (this.game.players[this.game.currentPlayerNum].hasDoneInitialSwap == false) {
            return;
        }        

        // Unhighlight/unselect discard pile if it happens to be highlighted
        this.webInterface.unhighlightDiscardPile();
        this.game.isDiscardPileSelected = false;

        let topDrawCard = this.game.getTopDrawPileCard();
        this.webInterface.revealDrawPile(topDrawCard.displayValue, topDrawCard.backgroundColor, topDrawCard.textColor);
    }

    handleDiscardPileHover() {
        // If game is over, take no action
        if (this.game.isGameOver()) { return; }

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
        // If game is over, take no action
        if (this.game.isGameOver()) { return; }

        // Don't toggle if current player has not done initial swap yet
        if (this.game.players[this.game.currentPlayerNum].hasDoneInitialSwap == false) {
            return;
        }

        // Don't toggle if draw pile is selected
        if (this.game.isDrawPileSelected == true) { return; }

        this.game.toggleDiscardPileSelection();
    }

    handleCardHover(playerId, cardPosition) {
        // If game is over, take no action
        if (this.game.isGameOver()) { return; }

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

        // If game is over, start a new game
        if (this.game.isGameOver()) { 
            this.startNewGame();
        }

        // Don't do anything if not this player's turn
        if (this.game.currentPlayerNum != playerId) { return; }

        // If this player has not yet done their initial swap,
        // then handle an initial swap card click
        if (player.hasDoneInitialSwap == false) {
            this.handleInitialSwapCardClick(playerId, cardPosition);
            return;
        }

        // Don't do anything if draw/discare pile not selected
        if (this.game.isDrawPileSelected == false && this.game.isDiscardPileSelected == false) { return; }

        // If player has selected a card from the draw pile,
        // then unreveal the draw pile and set drawnCard
        if (this.game.isDrawPileSelected) {
            this.webInterface.unrevealDrawPile();
            drawnCard = this.game.removeTopDrawPileCard();
        }

        // If player has selected a card from the discard pile,
        // Unhighlight the discard pile and set drawnCard
        if (this.game.isDiscardPileSelected) {
            this.webInterface.unhighlightDiscardPile();
            drawnCard = this.game.removeTopDiscardPileCard();
        }

        // Discard player's current card
        let playerCurrentCard = this.game.players[playerId].cards[cardPosition];
        this.webInterface.addToDiscardPile(playerCurrentCard.displayValue, playerCurrentCard.backgroundColor, playerCurrentCard.textColor);
        this.game.discard(playerCurrentCard);

        // Add drawn card to player's hand
        this.webInterface.updateCard(playerId, cardPosition, drawnCard.displayValue, drawnCard.backgroundColor, drawnCard.textColor);
        this.webInterface.unhighlightCard(playerId, cardPosition);
        this.game.players[playerId].cards[cardPosition] = drawnCard;

        // Check for victory
        if (this.game.checkForVictory(playerId)) {   
            this.webInterface.fadeDrawPilesForVictory();         
            for (let i = 0; i < this.game.players.length; i++) {
                if (i == playerId) {
                    this.webInterface.highlightHandForVictory(i);
                } else {
                    this.webInterface.highlightHandForDefeat(i);
                }
            }
            return;
        }

        // Advance the turn
        this.advanceTurn();
    }

    handleInitialSwapCardClick(playerId, cardPosition) {
        let player = this.game.players[playerId];

        // If this player has not yet set a target to swap with,
        // then set this card as the target
        if (player.initialSwapTargetCardPosition == -1) {
            player.initialSwapTargetCardPosition = cardPosition;
            this.webInterface.highlightCard(playerId, cardPosition);
            return;
        }

        // If this player is clicking on the already selected card,
        // then unselect it
        if (player.initialSwapTargetCardPosition == cardPosition) {
            player.removeSwapTarget();
            this.webInterface.unhighlightCard(playerId, cardPosition);
            return;
        }

        // Otherwise process the swap and update the interface
        let swapCardAPosition = cardPosition;
        let swapCardBPosition = player.initialSwapTargetCardPosition;
        player.swapCards(swapCardAPosition, swapCardBPosition);
        this.webInterface.unhighlightCard(playerId, swapCardAPosition);
        this.webInterface.unhighlightCard(playerId, swapCardBPosition);
        this.webInterface.updateCard(playerId, swapCardAPosition, 
            player.cards[swapCardAPosition].displayValue,
            player.cards[swapCardAPosition].backgroundColor,
            player.cards[swapCardAPosition].textColor);
        this.webInterface.updateCard(playerId, swapCardBPosition, 
            player.cards[swapCardBPosition].displayValue,
            player.cards[swapCardBPosition].backgroundColor,
            player.cards[swapCardBPosition].textColor);

        this.advanceTurn();
    }

    advanceTurn() {
        // Unhighlight this player's hand
        this.webInterface.unhighlightPlayingArea(this.game.currentPlayerNum);
        
        // Advance turn
        this.game.advanceTurn();

        // Highlight next player's hand
        this.webInterface.highlightPlayingArea(this.game.currentPlayerNum);
    }
}