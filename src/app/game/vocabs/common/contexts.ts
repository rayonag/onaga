import React, { useContext } from "react";
import supabase from "../../../../supabase";

// Create a context to hold the beta/records value
export const PlayerContext = React.createContext<any>({});
export const usePlayer = () => useContext(PlayerContext);
export const BossContext = React.createContext<any>({});
export const useBoss = () => useContext(BossContext);

export const fetchBoss = async () => {
    let { data: boss, error } = await supabase.from("boss").select("*");
    return boss;
};
export const fetchPlayer = async () => {
    let { data: player, error } = await supabase.from("player").select("*");
    return player;
};

export const refreshBoss = async (setBoss: React.Dispatch<React.SetStateAction<any>>) => {
    let { data: boss, error } = await supabase.from("boss").select("*");
    if (error || !boss) return;
    boss = boss?.sort((a: any, b: any) => a.id - b.id);
    console.log("boss", boss);
    setBoss(boss);
};
