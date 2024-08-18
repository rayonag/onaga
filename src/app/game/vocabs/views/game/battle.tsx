import React, { useEffect, useMemo, useRef, useState } from "react";

import "./style.css";
import LeftArrow from "../../components/icons/LeftArrow";
import toJp from "../../common/toJp";
import toEng from "../../common/toEng";
import { usePlayer, useBoss, refreshBoss } from "../../common/contexts";
import SettingQuiz from "../settings/settingQuiz";
import supabase from "../../../../../supabase";
import useSound from "use-sound";
import Image from "next/image";
import useAutoFocus from "../../hooks/useAutoFocus";
import HpBar from "../../components/HpBar";
import usePage from "@/zustand/page";
import useRewardStore from "@/zustand/game/vocabs/rewards";

export const getColorByType = (type: string) => {
    let color = "";
    switch (type) {
        case "ほのお":
            color = "bg-red-500";
            break;
        case "みず":
            color = "bg-blue-500";
            break;
        case "くさ":
            color = "bg-green-500";
            break;
        case "でんき":
            color = "bg-yellow-500";
            break;
        case "こおり":
            color = "bg-blue-300";
            break;
        case "かくとう":
            color = "bg-red-300";
            break;
        case "どく":
            color = "bg-purple-500";
            break;
        case "じめん":
            color = "bg-yellow-300";
            break;
        case "ひこう":
            color = "bg-blue-500";
            break;
        case "エスパー":
            color = "bg-purple-300";
            break;
        case "むし":
            color = "bg-green-300";
            break;
        case "いわ":
            color = "bg-gray-500";
            break;
        case "ゴースト":
            color = "bg-purple-500";
            break;
        case "ドラゴン":
            color = "bg-red-500";
            break;
        default:
            color = "bg-gray-500";
    }
    return color;
};

const Battle = () => {
    const { player, setPlayer } = usePlayer();
    const { boss, setBoss, currentBoss } = useBoss();
    console.log("boss", boss);
    const setPage = usePage((state) => state.setPage);
    if (setPlayer === null) return null;
    else if (boss == null || setBoss == null) return null;
    const record = boss.find((b: any) => b.id === currentBoss);
    if (!record) return null;
    console.log("record", record);
    const [currentHp, setCurrentHp] = useState(record.hp);
    const [ratio, setRatio] = useState<1 | 5 | 10>(1);
    const [isComplete, setIsComplete] = useState(false);
    // hp bar component with number of hp and max hp and the progress bar to show the hp
    // css is by tailwind
    const addReward = useRewardStore((state) => state.addReward);
    useEffect(() => {
        setCurrentHp(record.hp);
    }, [record]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log("runnign");
        console.log("inputRef.current", inputRef.current);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    // return due date number of days and hours if it is not null and not negative with 'Remaining: ' prefix
    const DueDate = ({ due }: { due: string }) => {
        const dueDate = new Date(due);
        const currentDate = new Date();
        const diff = dueDate.getTime() - currentDate.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let dues = "";
        if (days < 0) {
            dues = "";
        } else {
            if (days == 1) {
                dues = `${days} day `;
            } else if (days > 1) {
                dues = `${days} days `;
            }
            if (hours > 0) {
                dues += `${hours} hours`;
            }
        }
        return <div className="text-xs text-red-500">{dues}</div>;
    };
    // const AttackField = ({ score }: { score: { key: number } }) => {
    //     // sort the record by score, if it's 0 then goes to the end, else remains the same
    //     const sortedScore = Object.entries(score).sort((a, b) => {
    //         if (a[1] == 0 || a[1] == null) return 1;
    //         if (b[1] == 0 || b[1] == null) return -1;
    //         return 0;
    //     });
    //     console.log("sortedScore", sortedScore);
    //     const field = sortedScore.map((score) => {
    //         console.log("key", score);
    //         if (score[0] == "id") return <></>;
    //         return (
    //             <>
    //                 <Button type={toJp(score[0])} value={score[1]} />
    //             </>
    //         );
    //     });
    //     return <>{field}</>;
    // };
    // const Button = ({ type, value }: { type: string; value: number }) => {
    //     const [currentScore, setCurrentScore] = useState(value);
    //     value = value || 0;
    //     const onTap = () => {
    //         if (value == 0) return;
    //         let thisRatio = Number(ratio);
    //         const newScore = currentScore - thisRatio;
    //         if (newScore < 0) thisRatio = currentScore;
    //         if (currentHp - ratio < 0) thisRatio = currentHp;
    //         if (currentHp <= 0) return;
    //         const shakeImage = () => {
    //             const image = document.getElementById("boss-image");
    //             if (image) {
    //                 image.classList.add("shake");
    //                 setTimeout(() => {
    //                     image.classList.remove("shake");
    //                 }, 250);
    //             }
    //         };
    //         shakeImage();
    //         const newHp = currentHp - thisRatio;
    //         setCurrentScore(currentScore - thisRatio);
    //         setCurrentHp(newHp);
    //         const updatedBosses = boss.map((boss: any) => {
    //             if (boss.id === record.id) {
    //                 return { ...boss, hp: newHp };
    //             }
    //             return boss;
    //         });
    //         setBoss(updatedBosses);
    //         setPlayer({ ...player, [toEng(type)]: currentScore - thisRatio });
    //         if (newHp <= 0) {
    //             setIsComplete(true);
    //         }
    //     };
    //     let color = "";
    //     if (value == 0) color = "bg-gray-500";
    //     else color = getColorByType(type);
    //     console.log("key22", value);
    //     return (
    //         <div onTouchEndCapture={onTap} className={`m-1 p-4 text-sm rounded-full w-2/5 ${color}`}>
    //             {type}: ({value})
    //         </div>
    //     );
    // };
    // const RatioButton = () => {
    //     const [isOpen, setIsOpen] = useState(false);
    //     const handleClick = () => {
    //         setIsOpen(isOpen ? false : true);
    //     };
    //     return (
    //         <>
    //             <div className={`absolute top-[-15px] right-8 flex justify-center text-md items-center transform transition-all duration-200 ease-out ${!isOpen ? "translate-x-10 opacity-0" : "translate-x-0 opacity-100"}`}>
    //                 <div className={`m-1 px-1 flex rounded-full`}>
    //                     <div
    //                         className={`px-2 rounded-l-md ${ratio == 1 ? "bg-gray-300" : "bg-gray-500"}`}
    //                         onTouchEndCapture={() => {
    //                             setRatio(1);
    //                             setIsOpen(false);
    //                         }}
    //                     >
    //                         ×1
    //                     </div>
    //                     <div
    //                         className={`px-2 ${ratio == 5 ? "bg-gray-300" : "bg-gray-500"}`}
    //                         onTouchEndCapture={() => {
    //                             setRatio(5);
    //                             setIsOpen(false);
    //                         }}
    //                     >
    //                         ×5
    //                     </div>
    //                     <div
    //                         className={`px-1 rounded-r-md ${ratio == 10 ? "bg-gray-300" : "bg-gray-500"}`}
    //                         onTouchEndCapture={() => {
    //                             setRatio(10);
    //                             setIsOpen(false);
    //                         }}
    //                     >
    //                         ×10
    //                     </div>
    //                 </div>
    //             </div>
    //             <div onClick={handleClick} className={`absolute top-[-11px] right-0 flex justify-center bg-gray-300 rounded-lg px-1 text-md items-center`}>
    //                 ×{ratio}
    //             </div>
    //         </>
    //     );
    // };
    useEffect(() => {
        if (isComplete) {
            alert("おめでとう！ボスを倒して報酬をゲットしたよ！");
            setPage("game");
        }
    }, [isComplete]);

    //const [isAttacking, setIsAttacking] = useState(false);

    const AddQuiz = () => {
        //const [section, setSection] = useState(0);
        // const [level, setLevel] = useState<string>("");
        const [score, setScore] = useState<number | null>(null);
        // const ratio = (() => {
        //     if (level === "א") return 1;
        //     if (level === "ב") return 1.1;
        //     if (level === "ג") return 1.2;
        //     return 1;
        // })();
        // const handleSection = (section: number, level: string) => {
        //     setSection(section), setLevel(level);
        // };
        const handleAdd = async () => {
            if (!score) return;
            if (score < 0 || score > 100) return alert("Invalid score");
            //if (!window.confirm("Save Quiz Result?")) return;
            const { data: error } = await supabase.from("quiz").insert([{ name: record.name, score: score }]);
            if (error) return alert("Failed to add quiz result");
            await attack(score);
            setScore(null);
            // setLevel("");
            //setCurrentHp(newHp);
        };

        return (
            <>
                {/* {section === 0 && (
                    <div className="flex flex-col justify-center items-center">
                        <div className="btn-theme" onClick={() => handleSection(1, "א")}>
                            א
                        </div>
                        <div className="btn-theme" onClick={() => handleSection(1, "ב")}>
                            ב
                        </div>
                        <div className="btn-theme" onClick={() => handleSection(1, "ג")}>
                            ג
                        </div>
                    </div>
                )} */}
                {/* {section === 0 && ( */}
                <div className="flex justify-center items-center">
                    {/* <div onClick={() => setSection(0)} className="absolute left-20 content-center h-full w-10">
                            <LeftArrow />
                        </div> */}
                    <div>
                        {/* <div>{level}</div> */}
                        <div className="overflow-hidden">
                            <input
                                autoFocus
                                value={score || ""}
                                onChange={(e) => {
                                    if (parseInt(e.currentTarget.value) > 100) return;
                                    setScore(parseInt(e.currentTarget.value));
                                }}
                                className="w-40 max-w-[80%] m-2 p-2 rounded-full text-xl text-center"
                                type="number"
                                inputMode="numeric"
                                placeholder="Enter Score"
                                //ref={inputRef}
                            />
                            {/* <span className="absolute h-5 w-8">×{ratio.toFixed(1)}</span> */}
                        </div>
                        <div>
                            <button className="btn-theme" onClick={handleAdd}>
                                Attack
                            </button>
                        </div>
                    </div>
                </div>
                {/* )} */}
                {/* {section === 2 && <div className="flex flex-col justify-center items-center"></div>} */}
            </>
        );
    };
    const attack = async (score: number) => {
        const isCrit = Math.random() < 0.1;
        const playAttackAudio = getAudio(isCrit); // Directly reference the file path
        const shakeImage = async () => {
            const image = document.getElementById("boss-image");
            if (image) {
                image.classList.add("shake");
                if (isCrit) image.parentElement?.classList.add("crit");
                playAttackAudio(); // Play the attack sound
                await new Promise((resolve) =>
                    setTimeout(() => {
                        image.classList.remove("shake");
                        if (isCrit) image.parentElement?.classList.remove("crit");
                        resolve("");
                    }, 500)
                );
                //setIsAttacking(false);
                //setPage("game");
            }
        };
        const newHp = Math.floor(currentHp - (isCrit ? score * 2 : score) * ratio);
        const { data: error2 } = await supabase.from("boss").update({ hp: newHp }).eq("id", record.id);
        refreshBoss(setBoss);
        await shakeImage();
        console.log("error2", error2);
        if (error2) return alert("Failed to update boss");
        if (newHp <= 0) {
            await addReward(record.reward);
            setIsComplete(true);
        }
    };

    const [playEffect1] = useSound("/effects/sound/打撃1.mp3");
    const [playEffect2] = useSound("/effects/sound/打撃2.mp3");
    const [playEffect3] = useSound("/effects/sound/打撃3.mp3");
    const [playEffect4] = useSound("/effects/sound/打撃4.mp3");
    const [playEffect5] = useSound("/effects/sound/打撃5.mp3");
    // const [playEffect6] = useSound("/effects/sound/会心の一撃1.mp3");
    // const [playEffect7] = useSound("/effects/sound/会心の一撃2.mp3");
    // const [playEffect8] = useSound("/effects/sound/会心の一撃3.mp3");
    const [playEffect9] = useSound("/effects/sound/火炎魔法1.mp3");
    const getAudio = (isCrit: boolean) => {
        if (isCrit) return playEffect9;
        const random = Math.floor(Math.random() * 5) + 1;
        if (random === 1) return playEffect1;
        if (random === 2) return playEffect2;
        if (random === 3) return playEffect3;
        if (random === 4) return playEffect4;
        if (random === 5) return playEffect5;
        // if (random === 6) return playEffect6;
        // if (random === 7) return playEffect7;
        // if (random === 8) return playEffect8;
        return playEffect1;
    };

    return (
        <>
            <section>
                <div className="absolute left-3 top-3 z-10" onClick={() => setPage("game")}>
                    <LeftArrow size={35} />
                </div>
                <div className="relative rounded-lg flex flex-col justify-center items-center m-1">
                    <div className="text-2xl">{record.name}</div>
                    <img className="h-[40vh] max-h-[40vh]" id="boss-image" src={record.image} alt={record.name} />
                    <div className="w-[30%]">
                        <DueDate due={record.due} />
                    </div>
                    <div>
                        <span className="italic">Reward: </span>
                        {record.reward}
                    </div>
                    <div>
                        <HpBar hp={record.hp} maxHp={record.maxHp} />
                    </div>
                </div>
            </section>
            <section>
                <div className="max-h-[40vh] overflow-auto p-2 bg-stone-200">
                    {player && (
                        <div className="relative py-4 border-8 border-dotted border-blue-200 flex flex-wrap w-full justify-evenly text-center">
                            {/* <SettingQuiz /> */}
                            {/* <RatioButton />
                            <AttackField score={player} /> */}
                            <AddQuiz />
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};
export default Battle;
