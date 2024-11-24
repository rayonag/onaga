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
    useEffect(() => {
        getRewards();
    }, [getRewards]);

    const handleSubmit = async () => {
        const eventData = {
            source: {
                userId: 2000877546,
            },
        };
        const res = await fetch("/api/LINE_END");
        console.log("res", res);
    };

    return (
        <>
            <div style={{ backgroundPosition: "center", backgroundSize: "cover", backgroundImage: `url('/vocabs/bg/bg-shop.png')` }} className="overflow-hidden flex flex-col h-screen justify-center text-center items-center text-white">
                <div className="flex justify-center items-center m-2 bg-theme2 rounded-lg text-white h-1/8 w-48">
                    <span className="text-2xl z-10">TOTAL: {gold} Gold</span>
                </div>
                <div>
                    <SendMessage />
                </div>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Item</th>
                            <th className="px-4 py-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr onClick={() => setSelectedReward(0)}>
                            <td className="border px-4 py-2">Ramen</td>
                            <td className="border px-4 py-2">30 Gold</td>
                        </tr>
                        <tr onClick={() => setSelectedReward(1)}>
                            <td className="border px-4 py-2">Cafe Coffee</td>
                            <td className="border px-4 py-2">20 Gold</td>
                        </tr>
                        <tr onClick={() => setSelectedReward(2)}>
                            <td className="border px-4 py-2">Movie Night</td>
                            <td className="border px-4 py-2">70 Gold</td>
                        </tr>
                        <tr onClick={() => setSelectedReward(3)}>
                            <td className="border px-4 py-2">50 Shekels</td>
                            <td className="border px-4 py-2">100 Gold</td>
                        </tr>
                    </tbody>
                </table>
                <button className="flex justify-center items-center font-bold m-2 bg-theme2 !bg-opacity-70 rounded-full text-white h-16 w-48" onClick={() => handleSubmit()}>
                    <span className="text-2xl z-10">旦那に申請する</span>
                </button>
            </div>
        </>
    );
};

export default Shop;
