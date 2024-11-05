import React, { FC, useEffect, useRef, useState } from "react";

import "./style.css";
import LeftArrow from "../../components/icons/LeftArrow";
import toJp from "../../common/toJp";
import toEng from "../../common/toEng";
import { usePlayer, useBoss } from "../../common/contexts";
import { getColorByType } from "./battle";
import usePageStore from "@/zustand/page";

type AttackProps = {
    score: any;
};
const Attack: FC<AttackProps> = ({ score }) => {
    const { player, setPlayer } = usePlayer();
    const { boss, setBoss, currentBoss } = useBoss();
    console.log("boss", boss);
    const setPage = usePageStore((state) => state.setPage);
    if (setPlayer === null) return null;
    else if (boss == null || setBoss == null) return null;
    else if (setPage === null) return null;
    const record = boss.find((b: any) => b.id === currentBoss);
    if (!record) return null;
    console.log("record", record);
    const [currentHp, setCurrentHp] = useState(record.hp);
    const [ratio, setRatio] = useState<1 | 5 | 10>(1);
    const [isComplete, setIsComplete] = useState(false);
    // hp bar component with number of hp and max hp and the progress bar to show the hp
    // css is by tailwind
    const Hpbar = ({ hp, maxHp }: { hp: number; maxHp: number }) => {
        const hpPercent = (hp / maxHp) * 100;
        const hpColor = hpPercent > 50 ? "bg-green-500" : hpPercent > 25 ? "bg-yellow-500" : "bg-red-500";
        const hpTextColor = "text-white";
        //hpPercent > 50 ? "text-green-500" : hpPercent > 25 ? "text-yellow-500" : hpPercent > 0 ? "text-red-500" : "text-black";
        return (
            <div className={`w-full h-8 flex`}>
                <div className="w-44 h-8 bg-gray-300 rounded-3xl text-white">
                    <span className="absolute w-44 h-8 px-5 text-center flex justify-center items-center">
                        {<span className={`${hpTextColor}`}>HP:{hp}</span>}/{maxHp}
                    </span>
                    <div className={`h-full ${hpColor} rounded-l-3xl ${(hp / maxHp) * 100 > 90 && "rounded-r-3xl"}`} style={{ width: `${(hp / maxHp) * 100}%` }}></div>
                </div>
            </div>
        );
    };
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
    const AttackField = ({ score }: { score: { key: number } }) => {
        // sort the record by score, if it's 0 then goes to the end, else remains the same
        const sortedScore = Object.entries(score).sort((a, b) => {
            if (a[1] == 0 || a[1] == null) return 1;
            if (b[1] == 0 || b[1] == null) return -1;
            return 0;
        });
        console.log("sortedScore", sortedScore);
        const field = sortedScore.map((score) => {
            console.log("key", score);
            if (score[0] == "id") return <></>;
            return (
                <>
                    <Button type={toJp(score[0])} value={score[1]} />
                </>
            );
        });
        return <>{field}</>;
    };
    const Button = ({ type, value }: { type: string; value: number }) => {
        const [currentScore, setCurrentScore] = useState(value);
        value = value || 0;
        const onTap = () => {
            if (value == 0) return;
            let thisRatio = Number(ratio);
            const newScore = currentScore - thisRatio;
            if (newScore < 0) thisRatio = currentScore;
            if (currentHp - ratio < 0) thisRatio = currentHp;
            if (currentHp <= 0) return;
            const shakeImage = () => {
                const image = document.getElementById("boss-image");
                if (image) {
                    image.classList.add("shake");
                    setTimeout(() => {
                        image.classList.remove("shake");
                    }, 250);
                }
            };
            shakeImage();
            const newHp = currentHp - thisRatio;
            setCurrentScore(currentScore - thisRatio);
            setCurrentHp(newHp);
            const updatedBosses = boss.map((boss: any) => {
                if (boss.id === record.id) {
                    return { ...boss, hp: newHp };
                }
                return boss;
            });
            setBoss(updatedBosses);
            setPlayer({ ...player, [toEng(type)]: currentScore - thisRatio });
            if (newHp <= 0) {
                setIsComplete(true);
            }
        };
        let color = "";
        if (value == 0) color = "bg-gray-500";
        else color = getColorByType(type);
        console.log("key22", value);
        return (
            <div onTouchEndCapture={onTap} className={`m-1 p-4 text-sm rounded-full w-48 ${color}`}>
                {type}: ({value})
            </div>
        );
    };
    const RatioButton = () => {
        const [isOpen, setIsOpen] = useState(false);
        const handleClick = () => {
            setIsOpen(isOpen ? false : true);
        };
        return (
            <>
                <div className={`absolute top-[-15px] right-8 flex justify-center text-md items-center transform transition-all duration-200 ease-out ${!isOpen ? "translate-x-10 opacity-0" : "translate-x-0 opacity-100"}`}>
                    <div className={`m-1 px-1 flex rounded-full`}>
                        <div
                            className={`px-2 rounded-l-md ${ratio == 1 ? "bg-gray-300" : "bg-gray-500"}`}
                            onTouchEndCapture={() => {
                                setRatio(1);
                                setIsOpen(false);
                            }}
                        >
                            ×1
                        </div>
                        <div
                            className={`px-2 ${ratio == 5 ? "bg-gray-300" : "bg-gray-500"}`}
                            onTouchEndCapture={() => {
                                setRatio(5);
                                setIsOpen(false);
                            }}
                        >
                            ×5
                        </div>
                        <div
                            className={`px-1 rounded-r-md ${ratio == 10 ? "bg-gray-300" : "bg-gray-500"}`}
                            onTouchEndCapture={() => {
                                setRatio(10);
                                setIsOpen(false);
                            }}
                        >
                            ×10
                        </div>
                    </div>
                </div>
                <div onClick={handleClick} className={`absolute top-[-11px] right-0 flex justify-center bg-gray-300 rounded-lg px-1 text-md items-center`}>
                    ×{ratio}
                </div>
            </>
        );
    };
    useEffect(() => {
        if (isComplete) {
            alert("おめでとう！ボスを倒して報酬をゲットしたよ！");
            setPage("game");
        }
    }, [isComplete]);
    return (
        <>
            <section>
                <div className="absolute left-3 top-3" onClick={() => setPage("game")}>
                    <LeftArrow size={35} />
                </div>
                <div className="rounded-lg flex flex-col justify-center items-center m-1">
                    <div className="text-2xl">{record.name}</div>
                    <img className="h-[40vh] max-h-[40vh]" id="boss-image" src={record.image} alt={record.name} />
                    <div className="w-[30%]">
                        <DueDate due={record.due} />
                    </div>{" "}
                    <div>
                        <span className="italic">Reward: </span>
                        {record.reward}
                    </div>
                    <div>
                        <Hpbar hp={record.hp} maxHp={record.maxHp} />
                    </div>
                </div>
            </section>
        </>
    );
};
export default Attack;
