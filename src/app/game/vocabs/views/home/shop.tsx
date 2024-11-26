import useRewardStore from "@/zustand/game/vocabs/rewards";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions, Type } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import TrashIcon from "../../components/icons/TrashIcon";
import SendMessage from "./test";
import useGoldStore from "@/zustand/game/vocabs/gold";
interface Reward {
    id: number;
    reward: string;
}

interface Props {
    rewards: Reward[];
}
const Rewards = [
    { name: "Ramen", price: 30 },
    { name: "Cafe Coffee", price: 20 },
    { name: "Movie Night", price: 70 },
    { name: "50 Shekels", price: 100 },
];
const Shop = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReward, setSelectedReward] = useState<number | null>(null);
    const { rewards, getRewards, deleteReward, addReward } = useRewardStore(
        useShallow((state) => ({
            rewards: state.rewards,
            getRewards: state.getRewards,
            deleteReward: state.deleteReward,
            addReward: state.addReward,
        }))
    );
    const gold = useGoldStore((state) => state.gold);
    const minusGold = useGoldStore((state) => state.minusGold);
    const getGold = useGoldStore((state) => state.getGold);
    useEffect(() => {
        getRewards();
        getGold();
    }, [getRewards]);

    const handleSubmit = async () => {
        if (selectedReward === null) return;
        if (!gold) return;
        if (parseInt(gold) < Rewards[selectedReward].price) return alert("ゴールドが足りないよ");

        const payload = {
            prise: Rewards[selectedReward].name,
        };

        try {
            const res = await fetch("/api/LINE", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            console.log("Response from API:", data);
            if (data.message) {
                const res2 = minusGold(Rewards[selectedReward].price);
            }
            updateAll();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    const updateAll = () => {
        getRewards();
        getGold();
    };

    return (
        <div>
            <div style={{ backgroundPosition: "center", backgroundSize: "cover", backgroundImage: `url('/vocabs/bg/bg-shop.png')` }} className="overflow-hidden flex flex-col h-screen justify-center text-center items-center text-white">
                <div className="flex justify-center items-center m-2 bg-theme6 rounded-lg text-white h-1/8 w-48">
                    <span className="text-2xl z-10">TOTAL: {gold} Gold</span>
                </div>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Item</th>
                            <th className="px-4 py-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Rewards.map((reward, index) => (
                            <tr key={index} className={`${selectedReward == index ? "bg-theme3" : ""}`} onClick={() => setSelectedReward(index)}>
                                <td className="border px-4 py-2">{reward.name}</td>
                                <td className="border px-4 py-2">{reward.price} Gold</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="flex justify-center items-center font-bold m-2 bg-theme2 !bg-opacity-70 rounded-full mt-8 text-white h-12 w-48" onClick={() => handleSubmit()}>
                    <span className="text-xl z-10">旦那に申請する</span>
                </button>
            </div>
        </div>
    );
};

export default Shop;
