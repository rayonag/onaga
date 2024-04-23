const getWeak = (type: string) => {
    switch (type) {
        case "ほのお":
            return ["みず", "じめん", "いわ"];
        case "みず":
            return ["くさ", "でんき"];
        case "くさ":
            return ["ほのお", "ひこう", "いわ", "こおり", "どく", "むし"];
        case "でんき":
            return ["じめん"];
        case "こおり":
            return ["ほのお", "かくとう", "いわ", "はがね"];
        case "かくとう":
            return ["エスパー", "フェアリー"];
        case "どく":
            return ["じめん", "エスパー"];
        case "じめん":
            return ["みず", "くさ", "こおり"];
        case "ひこう":
            return ["でんき", "こおり", "いわ"];
        case "エスパー":
            return ["むし", "ゴースト", "あく"];
        case "むし":
            return ["ほのお", "ひこう", "いわ"];
        case "いわ":
            return ["みず", "くさ", "かくとう", "じめん", "はがね"];
        case "ゴースト":
            return ["ゴースト", "あく"];
        case "ドラゴン":
            return ["こおり", "ドラゴン", "フェアリー"];
        case "あく":
            return ["かくとう", "むし", "フェアリー"];
        case "はがね":
            return ["ほのお", "かくとう", "じめん"];
        case "フェアリー":
            return ["どく", "はがね"];
    }
};
export default getWeak;
