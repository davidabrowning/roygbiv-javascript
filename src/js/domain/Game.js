class Game {
    constructor() {
        this.currentTurn = 0;
        this.currentPlayerNum = 0;
        this.players = [new Player(0, "Player 1"), new Player(1, "Player 2")];
        this.drawPile = [];
        this.discardPile = [];
        this.isDrawPileSelected = false;
        this.isDiscardPileSelected = false;
    }

    dealCards() {
        // Add cards to discard pile
        for (let i = 0; i < 60; i++) {
            this.drawPile.push(new Card(i));
        }
        this.drawPile = this.shuffle(this.drawPile);

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
        let maxIndex = this.discardPile.length;
        return this.discardPile[maxIndex - 1];
    }

    removeTopDiscardPileCard() {
        this.isDiscardPileSelected = false;
        return this.discardPile.pop();
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
}