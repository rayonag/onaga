import { useEffect, useState } from "react";
import LeftArrow from "../../components/icons/LeftArrow";
import RightArrow from "../../components/icons/RightArrow";
import Image from "next/image";
import supabase from "../../../../../supabase";
import { refreshBoss, useBoss } from "../../common/contexts";
import { DateTime } from "luxon";

const getDueDate = () => {
    // do the same below with luxon. set local time as 16:00 then convert to UTC
    const date = DateTime.now();
    const day = date.weekday;
    const nextFriday = day < 5 ? 5 - day : 7 - (day - 5);
    date.plus({ days: nextFriday });
    date.set({ hour: 16, minute: 0, second: 0, millisecond: 0 });
    return date.toISO();
};
// setting boss component
const SettingBoss = () => {
    const [bossId, setBossId] = useState<number>(1);
    const [name, setName] = useState<string>("");
    const [maxHp, setMaxHp] = useState<number>(1000);
    const [reward, setReward] = useState<string>("");
    const [due, setDue] = useState<string>(getDueDate());
    const { boss, setBoss } = useBoss();
    const bossLength = boss.length;
    // boss
    const currentBoss = boss.find((b: any) => b.id === bossId);
    const isCurrent = new Date(currentBoss.due) > new Date();
    const handleArrow = (direction: "left" | "right") => {
        if (direction === "left") {
            setBossId((bossId) => ((bossId - 1 + bossLength - 1) % bossLength) + 1);
        } else {
            setBossId((bossId) => ((bossId - 1 + 1) % bossLength) + 1);
        }
    };

    //window.prompt("hi");
    useEffect(() => {
        if (!boss) return;
        if (!currentBoss) return;
        if (!isCurrent) {
            setName("");
            setMaxHp(currentBoss.maxHp);
            setReward("");
            setDue(getDueDate());
        } else {
            setName(currentBoss.name);
            setMaxHp(currentBoss.maxHp);
            setReward(currentBoss.reward);
            setDue(new Date(currentBoss.due).toISOString().slice(0, 16));
        }
    }, [bossId]);

    const addBoss = async () => {
        const { error } = await supabase
            .from("boss")
            .update({
                name: name,
                maxHp: maxHp,
                hp: maxHp,
                // reward: reward,
                due: new Date(due).toISOString(),
            })
            .eq("id", bossId);
        if (error) return alert("Failed to add boss");
        else alert("Boss added successfully");
        await refreshBoss(setBoss);
    };
    const ImageUpCarosel = () => {
        return (
            <div className="flex flex-wrap justify-center h-24 w-[90%]">
                {boss.map((b: any, index: number) => (
                    <div className="w-[10%] px-1">
                        <div onClick={() => setBossId(b.id)} className={`relative w-11 h-11 border border-solid ${currentBoss.id == b.id ? "border-blue-500" : ""}`}>
                            <Image loading="eager" className="px-1" alt="boss image" fill sizes="(max-width: 768px) 100vw, 200px" src={b.imageup} />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col justify-between text-center pb-20">
            <div className="flex justify-center m-2 h-64 text-center items-center">
                <div className="px-5 flex items-center h-full" onClick={() => handleArrow("left")}>
                    <LeftArrow />
                </div>
                <div>
                    <div className="flex justify-center h-72">
                        <Image loading="eager" className="m-2" alt="boss image" width={300} height={300} src={currentBoss.image} />
                    </div>
                </div>
                <div className="px-5 flex items-center h-full" onClick={() => handleArrow("right")}>
                    <RightArrow />
                </div>
            </div>
            <div className="flex justify-center">
                <ImageUpCarosel />
            </div>
            <div className="flex ml-16 mb-2">
                <span className={`content-center mr-1 w-14 `}>HP:</span>
                <div className={`max-w-[35%] p-2 rounded-full text-2xl font-mono font-bold text-center ${isCurrent ? "opacity-50" : ""}`}>{currentBoss.maxHp}</div>
            </div>
            <div className="flex ml-16 mb-2">
                <span className="content-center mr-1 w-14">Name:</span>
                <input value={name} onChange={(e) => setName(e.currentTarget.value)} className={`max-w-[80%] p-2 rounded-full text-center ${isCurrent ? "opacity-50" : ""}`} disabled={isCurrent} type="text" placeholder="Name" />
            </div>
            <div className="flex ml-16 mb-2">
                <span className="content-center mr-1 w-14">Reward:</span>
                <div className={`max-w-[35%] p-2 rounded-full text-2xl font-mono font-bold text-center ${isCurrent ? "opacity-50" : ""}`}>
                    {currentBoss.reward} <span className="font-normal">Gold</span>
                </div>
            </div>
            <div className="flex ml-16 mb-2">
                <span className="content-center mr-1 w-14">Due:</span>
                <input value={due} onChange={(e) => setDue(e.currentTarget.value)} className={`max-w-[80%] p-2 rounded-full text-center ${isCurrent ? "opacity-50" : ""}`} disabled={isCurrent} type="datetime-local" />
            </div>
            <button className={`btn-theme ${isCurrent ? "opacity-50" : ""}`} disabled={isCurrent} onClick={addBoss}>
                Add New Boss
            </button>
        </div>
    );
};
export default SettingBoss;
