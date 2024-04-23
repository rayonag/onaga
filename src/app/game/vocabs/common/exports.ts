import React, { useContext } from "react";
import supabase from "./supabase";

// Create a context to hold the beta/records value
export const PageContext = React.createContext<{ page: Page; setPage: React.Dispatch<React.SetStateAction<any>> | null }>({ page: "home", setPage: null });
export const usePage = () => useContext(PageContext);
export type Page = "battle" | "home" | "game" | "settings" | "addBoss" | "addQuiz";
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
