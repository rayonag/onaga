import useRewardStore from "@/zustand/game/vocabs/rewards";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions, Type } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import TrashIcon from "../../components/icons/TrashIcon";
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
    useEffect(() => {
        getRewards();
    }, [getRewards]);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedReward(null);
        setTreasureReveal(false);
        setTreasureOpen(false);
    };
    const trailingActions = (id: number) => (
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={() => {
                    deleteReward(id);
                }}
            >
                <div className="flex flex-col justify-center items-center bg-theme2 w-20 h-full text-white ">
                    <TrashIcon color="red" size={36} />
                    <span className="text-2xl z-10 mb-6">Delete</span>
                </div>
            </SwipeAction>
        </TrailingActions>
    );
    const leadingActions = (id: number) => (
        <LeadingActions>
            <SwipeAction destructive={true} onClick={() => openReward(id)}>
                <div className="flex flex-col justify-center items-center bg-theme3 w-20 h-full text-white ">
                    <Image className="mt-3" src={`/vocabs/treasure/treasure_open.png`} alt={"Open"} width={100} height={100} />
                    <span className="text-2xl z-10">Open</span>
                </div>
            </SwipeAction>
        </LeadingActions>
    );
    const openReward = (id: number) => {
        console.log("open reward", id);
        setSelectedReward(id);
        setIsModalOpen(true);
        console.log("treasureOpen", treasureOpen);
        setTimeout(() => {
            setTreasureOpen(true);
            setTimeout(() => {
                setTreasureReveal(true);
            }, 1500);
        }, 2000);
    };
    const [treasureOpen, setTreasureOpen] = useState(false);
    const [treasureReveal, setTreasureReveal] = useState(false);
    return (
        <>
            <div className="flex flex-col h-screen justify-center text-center items-center">
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Item</th>
                            <th className="px-4 py-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">Ramen</td>
                            <td className="border px-4 py-2">30NIS</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Cafe Coffee</td>
                            <td className="border px-4 py-2">20NIS</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Movie Night</td>
                            <td className="border px-4 py-2">70NIS</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Shop;
