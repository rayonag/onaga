import { useState, useMemo, useEffect } from "react";

const HpBar = ({ hp, maxHp }: { hp: number; maxHp: number }) => {
    const [displayedHP, setDisplayedHP] = useState(hp);

    const hpPercent = useMemo(() => (displayedHP / maxHp) * 100, [displayedHP, maxHp]);
    const hpColor = useMemo(() => {
        if (hpPercent > 50) return "bg-green-500";
        if (hpPercent > 25) return "bg-yellow-500";
        return "bg-red-500";
    }, [hpPercent]);

    const animateHPChange = (newHP: number) => {
        const hpChange = Math.abs(displayedHP - newHP);
        const totalDuration = hpChange > 20 ? 1500 : 750; // Total duration in ms
        const steps = hpChange; // Number of steps based on HP change
        const intervalTime = totalDuration / steps; // Interval time per step

        const interval = setInterval(() => {
            setDisplayedHP((prevHP) => {
                if (prevHP < newHP) {
                    return Math.min(prevHP + 1, newHP);
                } else if (prevHP > newHP) {
                    return Math.max(prevHP - 1, newHP);
                } else {
                    clearInterval(interval);
                    return prevHP;
                }
            });
        }, intervalTime); // Dynamic interval time for ease-in effect
    };

    useEffect(() => {
        animateHPChange(hp);
    }, [hp]);

    return (
        <div className={`w-full h-8 flex`}>
            <div className="w-44 h-8 bg-gray-300 rounded-3xl text-white relative">
                <span className="absolute w-44 h-8 px-5 text-center flex justify-center items-center">
                    <span className="text-white">HP: {displayedHP}</span>/{maxHp}
                </span>
                <div className={`h-full ${hpColor} rounded-l-3xl ${hpPercent > 90 && "rounded-r-3xl"}`} style={{ width: `${hpPercent}%` }}></div>
            </div>
        </div>
    );
};

export default HpBar;
