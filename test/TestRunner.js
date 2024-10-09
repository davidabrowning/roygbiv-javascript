class TestRunner {
    constructor() {
        this.testCard = new Card(5);
        this.testCounter = 1;
        this.testGame = new Game();
    }

    assertEquals(testName, expectation, result) {
        let body = document.querySelector("#body");
        let testResults = document.createElement("p");
        if (expectation == result) {
            testResults.innerText = this.testCounter + ". " 
                + "Success: " + testName;
        } else {
            testResults.innerText = this.testCounter + ". " 
                + "Fail: " + testName + " (expected: " 
                + expectation + ", actual: " + result + ")";
        }
        body.appendChild(testResults);
        this.testCounter++;
    }

    assertNotEquals(testName, expectation, result) {
        let body = document.querySelector("#body");
        let testResults = document.createElement("p");
        if (expectation != result) {
            testResults.innerText = this.testCounter + ". " 
                + "Success: " + testName;
        } else {
            testResults.innerText = this.testCounter + ". " 
                + "Fail: " + testName + " (comparison: " 
                + expectation + ", actual: " + result + ")";
        }
        body.appendChild(testResults);
        this.testCounter++;        
    }

    runTests() {
        this.assertEquals("Card value return", 5, new Card(5).value);
        this.assertEquals("Strings", "hello", "hello");
        this.assertEquals("Same cards same bg colors", new Card(20).backgroundColor, new Card(20).backgroundColor)
        this.assertNotEquals("Diff cards diff bg colors", new Card(1).backgroundColor, new Card(2).backgroundColor);

        this.assertEquals("", 1, 1);
        this.testGame = new Game();
        this.testGame.drawPile = this.testGame.createDeck(20);
        for (let i = 0; i < 25; i++) {
            let card = this.testGame.removeTopDrawPileCard();
            this.testGame.discard(card);
        }
        this.assertNotEquals("Draw pile refills", 0, this.testGame.drawPile.length);
      
        

    }
}