import React from "react";
import { useBetaRecords, usePage } from "../../page";

const Game = () => {
    const { betaRecords, setBetaRecords } = useBetaRecords();
    const { setPage } = usePage();
    if (setBetaRecords === null) return null;
    else if (setPage === null) return null;
    console.log("betaRecords", betaRecords);

    const Hpbar = ({ hp, maxHp }: { hp: number; maxHp: number }) => {
        const hpPercent = (hp / maxHp) * 100;
        const hpColor = hpPercent > 50 ? "bg-green-500" : hpPercent > 25 ? "bg-yellow-500" : "bg-red-500";
        const hpTextColor = hpPercent > 50 ? "text-green-500" : hpPercent > 25 ? "text-yellow-500" : hpPercent > 0 ? "text-red-500" : "text-black";
        return (
            <div className={`w-full h-8`}>
                <div>
                    HP: {<span className={`${hpTextColor}`}>{hp}</span>}/{maxHp}
                </div>
                <div className="w-44 h-8 bg-gray-300 rounded-3xl">
                    <div className={`h-full ${hpColor} rounded-l-3xl`} style={{ width: `${(hp / maxHp) * 100}%` }}></div>
                </div>
            </div>
        );
    };
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
    return (
        <div>
            {betaRecords.boss.map((record: any) => {
                return (
                    <div
                        key={record.id}
                        onClick={() => {
                            if (record.hp <= 0) return;
                            setPage("battle");
                            setBetaRecords({ ...betaRecords, bossId: record.id });
                        }}
                    >
                        <div>
                            {record.hp <= 0 && <div className="w-full h-40 absolute bg-black bg-opacity-40 text-5xl flex justify-center items-center text-center italic text-white">COMPLETE</div>}
                            <div className="p-5 border h-40 border-b-gray-400 flex items-center">
                                <div className="w-[70%]">
                                    <div className="text-2xl">{record.name}</div>
                                    <div>
                                        <span className="italic">Reward: </span>
                                        {record.reward}
                                    </div>
                                    <div>
                                        <Hpbar hp={record.hp} maxHp={record.maxHp} />
                                    </div>
                                </div>
                                <div className="w-[30%]">
                                    <div className="border border-neutral-600 rounded-lg flex justify-center items-center">
                                        <img className="h-24 w-24" src={`/vocabs/${record.imageup}`} alt={record.name} />
                                    </div>
                                    <DueDate due={record.due} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default Game;
