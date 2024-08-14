const getEffects = (type: string) => {
    switch (type) {
        case "fire":
            return {
                image: "/effects/tktk_Fire_1-ezgif.com-gif-maker.gif",
                audio: "/effects/火炎魔法1.mp3",
            };
    }
};
export default getEffects;
