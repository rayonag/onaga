const toEng = (type: string) => {
    switch (type) {
        case "ほのお":
            return "fire";
        case "みず":
            return "water";
        case "くさ":
            return "grass";
        case "でんき":
            return "electric";
        case "こおり":
            return "ice";
        case "かくとう":
            return "fighting";
        case "どく":
            return "poison";
        case "じめん":
            return "ground";
        case "ひこう":
            return "flying";
        case "エスパー":
            return "psychic";
        case "むし":
            return "bug";
        case "いわ":
            return "rock";
        case "ゴースト":
            return "ghost";
        case "ドラゴン":
            return "dragon";
        case "あく":
            return "dark";
        case "はがね":
            return "steel";
        case "フェアリー":
            return "fairy";
        default:
            return "normal";
    }
};
export default toEng;
