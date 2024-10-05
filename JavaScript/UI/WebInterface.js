class WebInterface {
    constructor() {
    }

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
            card.innerText = i;
            card.classList.add("card");
            document.querySelector("#container-hand-" + playerId).appendChild(card);
        }

    }
}