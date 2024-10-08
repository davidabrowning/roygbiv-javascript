class Card {
    constructor(value) {
        this.value = value;
        this.backgroundColor = this.calculateBackgroundColor();
        this.textColor = "black";
    }

    calculateBackgroundColor() {
        if (this.value == 0) {
            return "rgb(231, 76, 60)";
        }

        if (this.value < 5) {
            let red = 231 + (211 - 231) * (this.value - 0) / 5;
            let green = 76 + (84 - 76) * (this.value - 0) / 5;
            let blue = 60 + (0 - 60) * (this.value - 0) / 5;
            return ("rgb(" + red + ", " + green + ", " + blue + ")");
        }

        if (this.value == 5) {
            return "rgb(211, 84, 0)";
        }

        if (this.value < 10) {
            let red = 211 + (230 - 211) * (this.value - 5) / 5;
            let green = 84 + (126 - 84) * (this.value - 5) / 5;
            let blue = 0 + (34 - 0) * (this.value - 5) / 5;
            return ("rgb(" + red + ", " + green + ", " + blue + ")");
        }           

        if (this.value == 10) {
            return "rgb(230, 126, 34)";
        }

        if (this.value < 15) {
            let red = 230 + (243 - 230) * (this.value - 10) / 5;
            let green = 126 + (156 - 126) * (this.value - 10) / 5;
            let blue = 34 + (18 - 34) * (this.value - 10) / 5;
            return ("rgb(" + red + ", " + green + ", " + blue + ")");
        }           

        if (this.value == 15) {
            return "rgb(243, 156, 18)";
        }

        if (this.value < 20) {
            let red = 243 + (241 - 243) * (this.value - 15) / 5;
            let green = 156 + (196 - 156) * (this.value - 15) / 5;
            let blue = 18 + (15 - 18) * (this.value - 15) / 5;
            return ("rgb(" + red + ", " + green + ", " + blue + ")");
        }           

        if (this.value == 20) {
            return "rgb(241, 196, 15)";
        }

        if (this.value < 25) {
            let red = 241 + (46 - 241) * (this.value - 20) / 5;
            let green = 196 + (204 - 196) * (this.value - 20) / 5;
            let blue = 15 + (113 - 15) * (this.value - 20) / 5;
            return ("rgb(" + red + ", " + green + ", " + blue + ")");
        }           

        if (this.value == 25) {
            return "rgb(46, 204, 113)";
        }

        if (this.value < 30) {
            let red = 46 + (39 - 46) * (this.value - 25) / 5;
            let green = 204 + (174 - 204) * (this.value - 25) / 5;
            let blue = 113 + (96 - 113) * (this.value - 25) / 5;
            return ("rgb(" + red + ", " + green + ", " + blue + ")");
        }           

        if (this.value == 30) {
            return "rgb(39, 174, 96)";
        }

        if (this.value < 35) {
            let red = 39 + (22 - 39) * (this.value - 30) / 5;
            let green = 174 + (160 - 174) * (this.value - 30) / 5;
            let blue = 96 + (133 - 96) * (this.value - 30) / 5;
            return ("rgb(" + red + ", " + green + ", " + blue + ")");
        }           

        if (this.value == 35) {
            return "rgb(22, 160, 133)";
        }

        if (this.value < 40) {
            let red = 22 + (26 - 22) * (this.value - 35) / 5;
            let green = 160 + (188 - 160) * (this.value - 35) / 5;
            let blue = 133 + (156 - 133) * (this.value - 35) / 5;
            return ("rgb(" + red + ", " + green + ", " + blue + ")");
        }           

        if (this.value == 40) {
            return "rgb(26, 188, 156)";
        }

        if (this.value < 45) {
            let red = 26 + (52 - 26) * (this.value - 40) / 5;
            let green = 188 + (152 - 188) * (this.value - 40) / 5;
            let blue = 156 + (219 - 156) * (this.value - 40) / 5;
            return ("rgb(" + red + ", " + green + ", " + blue + ")");
        }           

        if (this.value == 45) {
            return "rgb(52, 152, 219)";
        }

        if (this.value < 50) {
            let red = 52 + (41 - 52) * (this.value - 45) / 5;
            let green = 152 + (128 - 152) * (this.value - 45) / 5;
            let blue = 219 + (185 - 219) * (this.value - 45) / 5;
            return ("rgb(" + red + ", " + green + ", " + blue + ")");
        }           

        if (this.value == 50) {
            return "rgb(41, 128, 185)";
        }

        if (this.value < 55) {
            let red = 41 + (142 - 41) * (this.value - 50) /5 ;
            let green = 128 + (68 - 128) * (this.value - 50) / 5;
            let blue = 185 + (173 - 185) * (this.value - 50) / 5;
            return ("rgb(" + red + ", " + green + ", " + blue + ")");
        }         

        if (this.value == 55) {
            return "rgb(142, 68, 173)";
        }

        if (this.value < 60) {
            let red = 142 + (155 - 142) * (this.value - 55) / 5;
            let green = 68 + (89 - 68) * (this.value - 55) / 5;
            let blue = 173 + (182 - 173) * (this.value - 55) / 5;
            return ("rgb(" + red + ", " + green + ", " + blue + ")");
        }        

        if (this.value == 60) {
            return "rgb(155, 89, 182)";
        }
    }
}