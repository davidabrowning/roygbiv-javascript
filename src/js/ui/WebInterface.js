class WebInterface {
    constructor(gameController) {
        this.gameController = gameController;
    }

    /**
     * Creates the "How to play" instructions display
     */
    populateInstructionMenu() {
        let winningHand = [ 2, 6, 15, 22, 30, 35, 42, 47, 52, 57 ];
        let progressHand = [ 1, 38, 55, 8, 50, 17, 11, 53, 12, 44 ];
        let winningHandDiv = document.querySelector("#example-winning-hand");
        let progressHandDiv = document.querySelector("#example-progress-hand");
        winningHand.forEach(cardValue => {
            let card = new Card(cardValue);
            let cardDiv = document.createElement("div");
            cardDiv.classList.add("card");
            cardDiv.innerText = card.value;
            cardDiv.style.backgroundColor = card.backgroundColor;
            cardDiv.style.color = card.textColor;
            cardDiv.style.width = "10%";
            cardDiv.style.height = "5rem";
            winningHandDiv.appendChild(cardDiv);       
        });
        progressHand.forEach(cardValue => {
            let card = new Card(cardValue);
            let cardDiv = document.createElement("div");
            cardDiv.classList.add("card");
            cardDiv.innerText = card.value;
            cardDiv.style.backgroundColor = card.backgroundColor;
            cardDiv.style.color = card.textColor;
            cardDiv.style.width = "10%";
            cardDiv.style.height = "5rem";
            progressHandDiv.appendChild(cardDiv);       
        });
    }

    addMenuListeners() {
        let infoButton = document.querySelector("#btn-info");
        infoButton.addEventListener("click", (event) => {
            this.toggleInfoDisplay();
        })
        let infoCloseButton = document.querySelector("#btn-close");
        infoCloseButton.addEventListener("click", (event) => {
            this.toggleInfoDisplay();
        })
    }

    /**
     * Toggles the webpage between a display showing "how to play" instructions
     * and the card game being played
     */
    toggleInfoDisplay() {
        let infoDiv = document.querySelector("#instructions-container");
        let playingAreaDiv = document.querySelector("#playing-area");
        if (infoDiv.classList.contains("hidden")) {
            infoDiv.classList.remove("hidden");
            playingAreaDiv.classList.add("hidden");
        } else {
            infoDiv.classList.add("hidden");
            playingAreaDiv.classList.remove("hidden");
        }
        
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
        nameLabel.innerText = playerName;
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

    updateCard(playerId, cardPosition, cardDisplayValue, cardBackgroundColor, cardTextColor) {
        let card = document.querySelector("#player-" + playerId + "-card-" + cardPosition);
        card.innerText = cardDisplayValue;
        card.style.backgroundColor = cardBackgroundColor;
        card.style.color = cardTextColor;
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

    addDiscardPileListeners() {
        let discardPile = document.querySelector("#discard-pile");
        discardPile.addEventListener("mouseover", (event) => {
            this.gameController.handleDiscardPileHover();
        });
        discardPile.addEventListener("mouseout", (event) => {
            this.gameController.handleDiscardPileMouseout();
        });
        discardPile.addEventListener("click", (event) => {
            this.gameController.handleDiscardPileClick();
        });
    }

    highlightDiscardPile() {
        let discardPile = document.querySelector("#discard-pile");
        discardPile.classList.add("selected-card");
    }

    unhighlightDiscardPile() {
        let discardPile = document.querySelector("#discard-pile");
        discardPile.classList.remove("selected-card");
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

    revealDrawPile(cardDisplayValue, cardBackgroundColor, cardTextColor) {
        let drawPileCard = document.querySelector("#draw-pile");
        drawPileCard.innerText = cardDisplayValue;
        drawPileCard.style.backgroundColor = cardBackgroundColor;
        drawPileCard.style.color = cardTextColor;
        drawPileCard.classList.add("selected-card");
    }

    unrevealDrawPile() {
        let drawPileCard = document.querySelector("#draw-pile");
        drawPileCard.innerText = "Draw";
        drawPileCard.style.removeProperty("background-color");
        drawPileCard.style.removeProperty("color");
        drawPileCard.classList.remove("selected-card");
    }

    addToDiscardPile(cardDisplayValue, cardBackgroundColor, cardTextColor) {
        let discardPileCard = document.querySelector("#discard-pile");
        discardPileCard.innerText = cardDisplayValue;
        discardPileCard.style.backgroundColor = cardBackgroundColor;
        discardPileCard.style.color = cardTextColor;
    }

    highlightPlayingArea(playerId) {
        let playingArea = document.querySelector("#container-hand-" + playerId);
        playingArea.classList.add("hand-active");
    }

    unhighlightPlayingArea(playerId) {
        let playingArea = document.querySelector("#container-hand-" + playerId);
        playingArea.classList.remove("hand-active");
    }    

    fadeDrawPilesForVictory() {
        let drawDiscardPileContainer = document.querySelector("#container-draw-discard-piles");
        drawDiscardPileContainer.style.opacity = 0.5;
    }

    highlightHandForVictory(playerId) {
        let victoriousCards = document.querySelectorAll("#container-hand-" + playerId + " .card");
        victoriousCards.forEach(cardDiv => {
            cardDiv.style.border = "5px solid yellow";
        });
    }

    highlightHandForDefeat(playerId) {
        let defeatedCards = document.querySelectorAll("#container-hand-" + playerId + " .card");
        defeatedCards.forEach(cardDiv => {
            cardDiv.style.opacity = 0.5;
        });
    }    

    resetPlayingArea() {
        document.querySelector("#playing-area").innerHTML = "";
    }
}