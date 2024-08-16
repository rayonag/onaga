import { useEffect, useState } from "react";
import LeftArrow from "../../components/icons/LeftArrow";
import RightArrow from "../../components/icons/RightArrow";
import Image from "next/image";
import defaultBosses from "../../common/utils/boss";
import supabase from "../../common/supabase";
import { refreshBoss, useBoss } from "../../common/contexts";

const getDueDate = () => {
    const date = new Date();
    const day = date.getDay();
    const nextFriday = day < 5 ? 5 - day : 7 - (day - 5);
    date.setDate(date.getDate() + nextFriday);
    date.setHours(19, 0, 0, 0); //summer time 考慮するか
    return date.toISOString().slice(0, 16);
};
// setting boss component
const bossLength = defaultBosses.length;
const SettingBoss = () => {
    const [bossId, setBossId] = useState<number>(1);
    const [name, setName] = useState<string>("");
    const [maxHp, setMaxHp] = useState<number>(1000);
    const [reward, setReward] = useState<string>("");
    const [due, setDue] = useState<string>(getDueDate());
    const { boss, setBoss } = useBoss();
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

    useEffect(() => {
        if (!boss) return;
        if (!currentBoss) return;
        if (!isCurrent) {
            setName("");
            setMaxHp(1000);
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
                reward: reward,
                due: new Date(due).toISOString(),
            })
            .eq("id", bossId);
        if (error) return alert("Failed to add boss");
        else alert("Boss added successfully");
        await refreshBoss(setBoss);
    };
    const ImageUpCarosel = () => {
        return (
            <div className="flex justify-center h-10">
                {boss.map((b: any) => (
                    <div onClick={() => setBossId(b.id)} className={`relative w-10 h-10 border border-solid ${currentBoss.id == b.id ? "border-blue-500" : ""}`}>
                        <Image loading="eager" className="px-1" alt="boss image" fill sizes="(max-width: 768px) 100vw, 150px" src={b.imageup} />
                    </div>
                ))}
            </div>
        );
    };
    return (
        <div className="flex flex-col justify-between text-center">
            <div className="flex justify-center m-2 h-64 text-center items-center">
                <div className="px-5 flex items-center h-full" onClick={() => handleArrow("left")}>
                    <LeftArrow />
                </div>
                <div>
                    <div className="flex justify-center h-72">
                        <Image loading="eager" className="m-2" alt="boss image" width={150} height={150} src={currentBoss.image} />
                    </div>
                </div>
                <div className="px-5 flex items-center h-full" onClick={() => handleArrow("right")}>
                    <RightArrow />
                </div>
            </div>
            <div>
                <ImageUpCarosel />
            </div>
            <div className="flex ml-16 mb-2">
                <span className={`content-center mr-1 w-14 `}>HP:</span>
                <input value={maxHp} onChange={(e) => setMaxHp(parseInt(e.currentTarget.value))} className={`max-w-[35%] p-2 rounded-full text-center ${isCurrent ? "opacity-50" : ""}`} disabled={isCurrent} type="number" inputMode="numeric" placeholder="Max HP" />
            </div>
            <div className="flex ml-16 mb-2">
                <span className="content-center mr-1 w-14">Name:</span>
                <input value={name} onChange={(e) => setName(e.currentTarget.value)} className={`max-w-[80%] p-2 rounded-full text-center ${isCurrent ? "opacity-50" : ""}`} disabled={isCurrent} type="text" placeholder="Name" />
            </div>
            <div className="flex ml-16 mb-2">
                <span className="content-center mr-1 w-14">Reward:</span>
                <input value={reward} onChange={(e) => setReward(e.currentTarget.value)} className={`max-w-[80%] p-2 rounded-full text-center ${isCurrent ? "opacity-50" : ""}`} disabled={isCurrent} type="text" placeholder="Reward" />
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
