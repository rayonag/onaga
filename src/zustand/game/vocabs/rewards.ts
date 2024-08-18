import supabase from "@/supabase";
import { create } from "zustand";

interface rewardState {
    rewards: { reward: string; id: number }[];
    getRewards: () => any;
    deleteReward: (id: number) => any;
    addReward: (reward: string) => any;
}

const useRewardStore = create<rewardState>((set, get) => ({
    rewards: [],
    getRewards: async () => {
        const { data, error } = await supabase.from("rewards").select("*");
        if (error || !data) return alert("Something went wrong");
        set({ rewards: data.map((d: any) => ({ id: d.id, reward: d.reward })) });
    },
    deleteReward: async (id: number) => {
        const { data, error } = await supabase.from("rewards").delete().eq("id", id);
        if (error) return alert("Something went wrong");
        await get().getRewards();
    },
    addReward: async (reward: string) => {
        const { data, error } = await supabase.from("rewards").insert({ reward });
        if (error) return alert("Something went wrong");
        await get().getRewards();
    },
}));

export default useRewardStore;
