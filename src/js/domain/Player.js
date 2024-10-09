class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.hasDoneInitialSwap = false;
        this.initialSwapTargetCardPosition = -1;    // -1 if no Card targeted
        this.cards = [];
    }

    dealCard(newCard) {
        this.cards.push(newCard);
    }

    swapCards(positionA, positionB) {
        // Swap cards
        let newCardA = this.cards[positionB];
        let newCardB = this.cards[positionA];
        this.cards[positionA] = newCardA;
        this.cards[positionB] = newCardB;

        // Update trackers
        this.hasDoneInitialSwap = true;
        this.initialSwapTargetCardPosition = -1;
    }

    removeSwapTarget() {
        this.initialSwapTargetCardPosition = -1;
    }
}