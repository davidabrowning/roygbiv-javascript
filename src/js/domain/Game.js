class Game {
    constructor() {
        this.currentTurn = 0;
        this.currentPlayerNum = 0;
        this.players = [new Player(0, "Player 1"), new Player(1, "Player 2")];
        this.drawPile = this.createDeck(new Card(0).numCardsInDeck);
        this.discardPile = [];
        this.isDrawPileSelected = false;
        this.isDiscardPileSelected = false;
    }

    /**
     * @param {integer} numCards the number of Cards in the array
     * @returns the array of Cards
     */
    createDeck(numCards) {
        let deck = [];
        for (let i = 0; i < numCards; i++) {
            deck.push(new Card(i));
        }
        return deck;
    }

    dealCards() {
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

    drawPileHasCards() {
        if (this.drawPile.length > 0) {
            return true;
        }
        return false;
    }

    refillDrawPile() {
        let topDiscardCard = this.removeTopDiscardPileCard();
        this.drawPile = this.discardPile;
        this.shuffle(this.drawPile);
        this.discardPile = [topDiscardCard];
    }

    getTopDiscardPileCard() {
        let maxIndex = this.discardPile.length;
        return this.discardPile[maxIndex - 1];
    }

    removeTopDiscardPileCard() {
        this.isDiscardPileSelected = false;
        return this.discardPile.pop();
    }

    discard(card) {
        this.discardPile.push(card);
        if (this.drawPileHasCards() == false) {
            this.refillDrawPile();
        }
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

    /**
     * Increases turn counter and toggles active Player
     */
    advanceTurn() {
        this.currentTurn++;
        this.currentPlayerNum = this.currentTurn % this.players.length;
    }

    /**
     * 
     * @param {Card[]} cardArray the Cards to be shuffled
     * @returns the shuffled Card array
     */
    shuffle(cardArray) {
        let tempArray = [];
        cardArray.forEach(card => {
            tempArray.push(card);
        });
        for (let i = 0; i < cardArray.length; i++) {
            let rand = Math.random();
            let tempCardDouble = rand * tempArray.length;
            let tempCardNum = parseInt(tempCardDouble);
            cardArray[i] = tempArray[tempCardNum];
            tempArray.splice(tempCardNum, 1);
        }
        return cardArray;
    }

    /**
     * 
     * @param {int} playerId ID of Player to check for victory conditions
     * @returns boolean true if victorious, false otherwise
     */
    checkForVictory(playerId) {
        let cards = this.players[playerId].cards;
        let allCardsInOrder = true;
        for (let i = 0; i < cards.length; i++) {

            // Don't check the very first item
            if (i == 0) { continue; }

            if (cards[i-1].value > cards[i].value) {
                allCardsInOrder = false;
            }
        }
        return allCardsInOrder;
    }

    isGameOver() {
        for (let i = 0; i < this.players.length; i++) {
            if (this.checkForVictory(i) == true) {
                return true;
            }
        }
        return false;
    }
}