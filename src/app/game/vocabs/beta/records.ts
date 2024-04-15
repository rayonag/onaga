export const records = [
    {
        id: 1,
        name: "page",
        description: "A page component that contains a header, main content, and footer",
        code: `import React from 'react'`,
    },
];

// store boss information with name, hp, reward, and description
export const boss = [
    {
        id: 1,
        name: "Rama Aleph",
        maxHp: 1000,
        hp: 350,
        reward: "映画みる",
        type: "ほのお",
        image: "boss1.jpg",
        imageup: "boss1up.jpg",
        due: "2024-04-15",
    },
    {
        id: 2,
        name: "Rama Gimel",
        maxHp: 1000,
        hp: 750,
        reward: "バラガンラーメン",
        type: "みず",
        image: "boss2.jpg",
        imageup: "boss2up.jpg",
        due: "2024-04-15",
    },
    {
        id: 3,
        name: "Rama Bet",
        maxHp: 1000,
        hp: 0,
        reward: "バラガンラーメン",
        type: "くさ",
        image: "boss1.jpg",
        due: "2024-03-15",
    },
];

export const player = {
    score: {
        ほのお: 50,
        みず: 100,
        くさ: 0,
        でんき: 0,
        こおり: 100,
        かくとう: 0,
        どく: 200,
        じめん: 0,
        ひこう: 0,
        エスパー: 0,
        むし: 0,
        いわ: 0,
        ゴースト: 0,
        ドラゴン: 0,
        あく: 0,
        はがね: 0,
        フェアリー: 0,
        ノーマル: 0,
    },
};
