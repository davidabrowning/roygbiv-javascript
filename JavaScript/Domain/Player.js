class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.hasDoneInitialSwap = false;
        this.cards = [];
    }

    dealCard(newCard) {
        this.cards.push(newCard);
    }
}