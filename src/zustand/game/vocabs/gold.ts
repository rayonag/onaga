import supabase from "@/supabase";
import { create } from "zustand";

interface goldState {
    gold: string | null;
    getGold: () => any;
    plusGold: (num: number) => any;
    minusGold: (num: number) => any;
}

const useGoldStore = create<goldState>((set, get) => ({
    gold: null,
    getGold: async () => {
        const { data, error } = await supabase.from("player").select("*");
        if (error || !data) return alert("Something went wrong");
        set({ gold: data[0].gold });
    },
    plusGold: async (num: number) => {
        const { data, error } = await supabase.from("player").select("*");
        if (error || !data) return alert("Something went wrong");
        const newGold = parseInt(data[0].gold) + num;
        console.log("newGold", newGold);
        const { data: data2, error: error2 } = await supabase.from("player").update({ gold: newGold }).eq("id", 1);
        console.log("data", data2);
    },
    minusGold: async (num: number) => {
        const { data, error } = await supabase.from("player").select("*");
        if (error || !data) return alert("Something went wrong");
        const newGold = parseInt(data[0].gold) - num;
        const { data: data2, error: error2 } = await supabase.from("player").update({ gold: newGold }).eq("id", 1);
    },
}));

export default useGoldStore;
