class WebInterface {
    constructor(gameController) {
        this.gameController = gameController;
    }

    launch() {
        this.addNewPlayerEvents();
    }

    addNewPlayerEvents() {

        // Add player 1
        var formPlayerOne = document.getElementById("form-player-one");
        formPlayerOne.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {

                // Get player 1 name from form's text input
                var inputPlayerOne = document.getElementById("input-player-one");
                var playerOneName = inputPlayerOne.value;

                // Create player 1
                this.gameController.createPlayer(playerOneName);

                // Update player 1's hand label
                var handContainer = document.getElementById("hand-player-one");
                handContainer.innerHTML = playerOneName + " cards";

                // Hide player 1's form
                var formPlayerOne = document.getElementById("form-player-one");
                formPlayerOne.classList.add("hidden");

                // Show next player input form
                var formPlayerTwo = document.getElementById("form-player-two");
                formPlayerTwo.classList.remove("hidden");
            }
        })

        // Add player 2
        var formPlayerTwo = document.getElementById("form-player-two");
        formPlayerTwo.addEventListener("keypress", (event) => {

            if (event.key === "Enter") {

                // Get player 2 name from form's text input
                var inputPlayerTwo = document.getElementById("input-player-two");
                var playerTwoName = inputPlayerTwo.value;

                // Create player 2
                this.gameController.createPlayer(playerTwoName);

                // Update player 2's hand label
                var handContainer = document.getElementById("hand-player-two");
                handContainer.innerHTML = playerTwoName + " cards";

                // Hide player 2's form
                var formPlayerTwo = document.getElementById("form-player-two");
                formPlayerTwo.classList.add("hidden");

                // Show playing area
                var playingArea = document.getElementById("playing-area");
                playingArea.classList.remove("hidden");
            }
        })
    }
}