class TestRunner {
    constructor() {
        this.testCard = new Card(5);
        this.testCounter = 1;
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

    runTests() {
        this.assertEquals("Card value return", 5, this.testCard.value);
        this.assertEquals("Strings", "hello", "hello");
    }
}