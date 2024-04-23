import { useState } from "react";
import { defaultBoss } from "../../beta/records";
import LeftArrow from "../../components/icons/LeftArrow";
import RightArrow from "../../components/icons/RightArrow";
import Image from "next/image";

const Add = () => {
    const [boss, setBoss] = useState<number>(0);
    const currentBoss = defaultBoss[boss];
    const handleArrow = (direction: "left" | "right") => {
        if (direction === "left") {
            setBoss((boss) => (boss - 1 + defaultBoss.length) % defaultBoss.length);
        } else {
            setBoss((boss) => (boss + 1) % defaultBoss.length);
        }
    };
    const [name, setName] = useState<string>("");
    const [reward, setReward] = useState<string>("");
    const [due, setDue] = useState<string>("");
    const date = new Date();
    const day = date.getDay();
    const nextSaturday = 6 - (day - 1);
    date.setDate(date.getDate() + nextSaturday);
    date.setHours(19, 0, 0, 0); //summer time 考慮するか
    return (
        <div className="flex flex-col justify-center text-center">
            <div className="flex justify-center m-2 text-center items-center">
                <div onClick={() => handleArrow("left")}>
                    <LeftArrow />
                </div>
                <div>
                    <Image className="m-2" alt="boss image" width={200} height={200} src={`/vocabs/${defaultBoss[boss].image}`} />
                    <div className="flex justify-center items-center p-2 rounded-full bg-green-300">
                        <>HP:{currentBoss.maxHp}</>
                    </div>
                </div>
                <div onClick={() => handleArrow("right")}>
                    <RightArrow />
                </div>
            </div>
            <div className="flex justify-center mb-2">
                <input value={name} onChange={(e) => setName(e.currentTarget.value)} className="max-w-[80%] p-2 rounded-full" type="text" placeholder="Name" />
            </div>
            <div className="flex justify-center mb-2">
                <input value={reward} onChange={(e) => setReward(e.currentTarget.value)} className="max-w-[80%] p-2 rounded-full" type="text" placeholder="Reward" />
            </div>
            <div className="flex justify-center mb-2">
                <input value={due} onChange={(e) => setDue(e.currentTarget.value)} className="max-w-[80%] p-2 rounded-full" type="datetime-local" defaultValue={date.toISOString().slice(0, 16)} />
            </div>
            <div className="btn-theme">Add New Boss</div>
        </div>
    );
};
export default Add;
