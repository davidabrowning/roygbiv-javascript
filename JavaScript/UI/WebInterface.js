class WebInterface {
    constructor(gameController) {
        this.gameController = gameController;
    }

    addDrawAndDiscardPiles() {
        // Create container
        let pileContainer = document.createElement("div");
        pileContainer.setAttribute("id", "container-draw-discard-piles");
        pileContainer.classList.add("hand");
        document.querySelector("#playing-area").appendChild(pileContainer);

        // Create empty draw pile
        let drawPile = document.createElement("div");
        drawPile.setAttribute("id", "draw-pile");
        drawPile.classList.add("card");
        drawPile.innerText = "Draw";
        document.querySelector("#container-draw-discard-piles").appendChild(drawPile);

        // Create empty discard pile
        let discardPile = document.createElement("div");
        discardPile.setAttribute("id", "discard-pile");
        discardPile.classList.add("card");
        discardPile.innerText = "Discard";
        document.querySelector("#container-draw-discard-piles").appendChild(discardPile);
    }

    /**
     * Creates the playing area for one of the players
     * including name label and placeholder cards
     */
    addPlayer(playerId, playerName) {
        // Create container
        let playerContainer = document.createElement("div");
        playerContainer.setAttribute("id", "container-player-" + playerId);
        document.querySelector("#playing-area").appendChild(playerContainer);

        // Create name label
        let nameLabel = document.createElement("h1");
        nameLabel.setAttribute("id", "name-label-player-" + playerId);
        nameLabel.classList.add("player-name-label");
        nameLabel.innerText = playerName + " (" + playerId + ")";
        document.querySelector("#container-player-" + playerId).appendChild(nameLabel);

        // Create hand container
        let handContainer = document.createElement("div");
        handContainer.setAttribute("id", "container-hand-" + playerId);
        handContainer.classList.add("hand");
        document.querySelector("#container-player-" + playerId).appendChild(handContainer);

        // Create empty hand
        for (let i = 0; i < 10; i++) {
            let card = document.createElement("div");
            card.setAttribute("id", "player-" + playerId + "-card-" + i);
            card.classList.add("card");
            card.innerText = i;
            document.querySelector("#container-hand-" + playerId).appendChild(card);
        }
    }

    updateCard(playerId, cardPosition, cardValue) {
        //alert("Updating card: " + playerId + cardPosition + cardValue);
        let card = document.querySelector("#player-" + playerId + "-card-" + cardPosition);
        card.innerText = cardValue;
    }

    addDrawPileListeners() {
        let drawPile = document.querySelector("#draw-pile");
        drawPile.addEventListener("mouseover", (event) => {
            this.gameController.handleDrawPileHover();
        });
        drawPile.addEventListener("mouseout", (event) => {
            this.gameController.handleDrawPileMouseout();
        });
        drawPile.addEventListener("click", (event) => {
            this.gameController.handleDrawPileClick();
        });
    }

    highlightDrawPile() {
        let drawPile = document.querySelector("#draw-pile");
        drawPile.classList.add("selected-card");
    }

    unhighlightDrawPile() {
        let drawPile = document.querySelector("#draw-pile");
        drawPile.classList.remove("selected-card");
    }

    addCardListeners(playerId, cardPosition) {
        let card = document.querySelector("#player-" + playerId + "-card-" + cardPosition);
        card.addEventListener("mouseover", (event) => {
            this.gameController.handleCardHover(playerId, cardPosition);
        });
        card.addEventListener("mouseout", (event) => {
            this.gameController.handleCardMouseout(playerId, cardPosition);
        });
        card.addEventListener("click", (event) => {
            this.gameController.handleCardClick(playerId, cardPosition);
        });
    }

    highlightCard(playerId, cardPosition) {
        let card = document.querySelector("#player-" + playerId + "-card-" + cardPosition);
        card.classList.add("selected-card");
    }

    unhighlightCard(playerId, cardPosition) {
        let card = document.querySelector("#player-" + playerId + "-card-" + cardPosition);
        card.classList.remove("selected-card");
    }

    revealDrawPile(cardValue) {
        let drawPileCard = document.querySelector("#draw-pile");
        drawPileCard.innerText = cardValue;
        drawPileCard.classList.add("selected-card");
    }
}