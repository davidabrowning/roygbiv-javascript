// if (typeof module === 'object') {
//     module.exports = class Card;
// }

class Card {
    MAX_NUM_CARDS = 60;
    constructor(value) {
        this.value = value;
        this.backgroundColor = this.calculateBackgroundColor();
        this.textColor = "black";
    }

    calculateBackgroundColor() {

        // Holds a rainbow color range for the Cards
        let rgb = [
                [231, 76, 60],
                [211, 84, 0],
                [230, 126, 34],
                [243, 156, 18],
                [241, 196, 15],
                [46, 204, 113],
                // [39, 174, 96],
                [22, 160, 133],
                [26, 188, 156],
                // [52, 152, 219],
                [41, 128, 185],
                [142, 68, 173],
                [155, 89, 182]
        ];
        
        // Track Card(52) in max 60
        let denominator = this.MAX_NUM_CARDS / (rgb.length - 1);    // 20
        let remainder = this.value % denominator;                   // 12

        let baselineColorNum = (this.value - remainder) / denominator; // 2
        let nextUpColorNum = baselineColorNum + 1;                     // 3

        let colorMultiplier = remainder / denominator;  // 0

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