const toJp = (type: string) => {
    switch (type) {
        case "fire":
            return "ほのお";
        case "water":
            return "みず";
        case "grass":
            return "くさ";
        case "electric":
            return "でんき";
        case "ice":
            return "こおり";
        case "fighting":
            return "かくとう";
        case "poison":
            return "どく";
        case "ground":
            return "じめん";
        case "flying":
            return "ひこう";
        case "psychic":
            return "エスパー";
        case "bug":
            return "むし";
        case "rock":
            return "いわ";
        case "ghost":
            return "ゴースト";
        case "dragon":
            return "ドラゴン";
        case "dark":
            return "あく";
        case "steel":
            return "はがね";
        case "fairy":
            return "フェアリー";
        default:
            return "ノーマル";
    }
};
export default toJp;
