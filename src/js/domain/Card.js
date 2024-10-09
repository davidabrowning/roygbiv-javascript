// if (typeof module === 'object') {
//     module.exports = class Card;
// }

class Card {
    constructor(value) {
        this.value = value;
        this.displayValue = this.value + 1;     // Value to display on the user interface
        this.numCardsInDeck = 60;
        this.backgroundColor = this.calculateBackgroundColor(this.numCardsInDeck);
        this.textColor = "black";
    }

    calculateBackgroundColor(deckSize) {

        // Holds a rainbow color range for the Cards
        let rgb = [
                [192, 57, 43],          // red
                [211, 84, 0],           // orange
                // [230, 126, 34],
                // [243, 156, 18],
                [241, 196, 15],         // yellow
                [46, 204, 113],
                [39, 174, 96],          // green1
                // [20, 90, 50],        // green2
                // [22, 160, 133],
                // [26, 188, 156],
                [52, 152, 219],         // light blue
                [41, 128, 185],         // blue
                [142, 68, 173],         // purple
                // [155, 89, 182]
        ];
        
        let denominator = deckSize / (rgb.length - 1);
        let remainder = this.value % denominator;

        let baselineColorNum = (this.value - remainder) / denominator;
        let nextUpColorNum = baselineColorNum + 1;

        let colorMultiplier = remainder / denominator;

        let redBaselineColor = rgb[baselineColorNum][0];
        let redNextUpColor = rgb[nextUpColorNum][0];
        let redColorValue = Math.round(redBaselineColor 
            + (redNextUpColor-redBaselineColor) * colorMultiplier);

        let greenBaselineColor = rgb[baselineColorNum][1];
        let greenNextUpColor = rgb[nextUpColorNum][1];
        let greenColorValue = Math.round(greenBaselineColor 
            + (greenNextUpColor-greenBaselineColor) * colorMultiplier);

        let blueBaselineColor = rgb[baselineColorNum][2];
        let blueNextUpColor = rgb[nextUpColorNum][2];
        let blueColorValue = Math.round(blueBaselineColor 
            + (blueNextUpColor-blueBaselineColor) * colorMultiplier);       

        return "rgb("+redColorValue+","+greenColorValue+","+blueColorValue+")";
    }
}