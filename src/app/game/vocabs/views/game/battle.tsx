import React, { useEffect, useMemo, useRef, useState } from "react";

import "./style.css";
import LeftArrow from "../../components/icons/LeftArrow";
import { usePlayer, useBoss, refreshBoss } from "../../common/contexts";
import supabase from "../../../../../supabase";
import useSound from "use-sound";
import HpBar from "../../components/HpBar";
import usePage from "@/zustand/page";
import useRewardStore from "@/zustand/game/vocabs/rewards";
import useStreakStore from "@/zustand/game/vocabs/streak";
import { DateTime } from "luxon";

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
    const { handleStreak } = useStreakStore();
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
    useEffect(() => {
        if (isComplete) {
            alert("おめでとう！ボスを倒して報酬をゲットしたよ！");
            setPage("game");
        }
    }, [isComplete]);

    const AddQuiz = () => {
        const [score, setScore] = useState<number | null>(null);
        const handleAdd = async () => {
            if (!score) return;
            if (score < 0 || score > 100) return alert("Invalid score");
            //if (!window.confirm("Save Quiz Result?")) return;
            const { data: error } = await supabase.from("quiz").insert([{ name: record.name, score: score }]);
            if (error) return alert("Failed to add quiz result");
            await attack(score);
            await handleStreak();
            setScore(null);
            // setLevel("");
            //setCurrentHp(newHp);
        };

        return (
            <>
                <div className="flex justify-center items-center">
                    <div>
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
                            />
                        </div>
                        <div>
                            <button className="btn-theme" onClick={handleAdd}>
                                Attack
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    };
    const attack = async (score: number) => {
        const isCrit = Math.random() < 0.05;
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
                    }, 250)
                );
                //setIsAttacking(false);
                //setPage("game");
            }
        };
        const today = DateTime.now().weekdayShort;
        const damage = Math.floor((isCrit ? score * 2 : score) * ratio);
        const newHp = currentHp - damage >= 0 ? currentHp - damage : 0;
        const { data: error2 } = await supabase.from("boss").update({ hp: newHp }).eq("id", record.id);
        // reset when in new week
        const promiseArray: any = [];
        const { data: quiz, error } = await supabase.from("quiz").select("*");
        console.log("currentBoss.due", currentBoss.due);
        if (new Date(quiz?.find((q: any) => q.id == 1).due) < new Date()) {
            Array.from(Array(18).keys()).forEach((index) =>
                promiseArray.push(
                    supabase
                        .from("quiz")
                        .update({ Sat: null, Sun: null, Mon: null, Tue: null, Wed: null, Thu: null, Fri: null })
                        .eq("id", index + 1)
                )
            );
            // update due to the current week
            promiseArray.push(supabase.from("quiz").update({ due: record.due }).eq("id", 1));
            await Promise.all(promiseArray);
        }
        // update quiz, store current hp each day
        const { data: error4 } = await supabase
            .from("quiz")
            .update({ [today]: newHp })
            .eq("id", record.id);
        refreshBoss(setBoss);
        await shakeImage();
        console.log("error2", error2);
        if (error2) return alert("Failed to update boss");
        if (newHp == 0) {
            await addReward(record.reward);
            setIsComplete(true);
        }
    };

    const [playEffect1] = useSound("/effects/sound/打撃1.mp3");
    const [playEffect2] = useSound("/effects/sound/打撃2.mp3");
    const [playEffect3] = useSound("/effects/sound/打撃3.mp3");
    const [playEffect4] = useSound("/effects/sound/打撃4.mp3");
    const [playEffect5] = useSound("/effects/sound/打撃5.mp3");
    const [playEffect6] = useSound("/effects/sound/会心の一撃1.mp3");
    const [playEffect7] = useSound("/effects/sound/会心の一撃2.mp3");
    const [playEffect8] = useSound("/effects/sound/会心の一撃3.mp3");
    const [playEffect9] = useSound("/effects/sound/火炎魔法1.mp3");
    const getAudio = (isCrit: boolean) => {
        if (isCrit) return playEffect9;
        const random = Math.floor(Math.random() * 8) + 1;
        if (random === 1) return playEffect1;
        if (random === 2) return playEffect2;
        if (random === 3) return playEffect3;
        if (random === 4) return playEffect4;
        if (random === 5) return playEffect5;
        if (random === 6) return playEffect6;
        if (random === 7) return playEffect7;
        if (random === 8) return playEffect8;
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
                        {record.reward} Gold
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
