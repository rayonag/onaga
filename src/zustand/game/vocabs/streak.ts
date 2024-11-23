import supabase from "@/supabase";
import { DateTime } from "luxon";
import { create } from "zustand";

interface streakState {
    streak: number | null;
    getStreak: () => any;
    handleStreak: () => any;
}

const useStreakStore = create<streakState>((set, get) => ({
    streak: null,
    getStreak: async () => {
        const { data, error } = await supabase.from("player").select("*");
        if (error || !data) return alert("Something went wrong");
        set({ streak: data[0].streak });
    },
    handleStreak: async () => {
        const { data, error } = await supabase.from("player").select("*");
        if (error || !data) return alert("Something went wrong");
        const today = DateTime.now();
        const lastStreakDateISO = data[0].lastStreakDateISO;
        if (DateTime.fromISO(lastStreakDateISO).hasSame(today, "day")) {
            return;
        } else if (DateTime.fromISO(lastStreakDateISO).hasSame(today.minus({ days: 1 }), "day")) {
            const newStreak = data[0].streak + 1;
            const { data: data2, error: error2 } = await supabase.from("player").update({ streak: newStreak, lastStreakDateISO: DateTime.now().toISODate() }).eq("id", 1);
            console.log("data", data2);
        } else {
            const { data: data2, error: error2 } = await supabase.from("player").update({ streak: 1, lastStreakDateISO: DateTime.now().toISODate() }).eq("id", 1);
            console.log("data", data2);
        }
    },
}));

export default useStreakStore;
