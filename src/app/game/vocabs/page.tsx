"use client";
import React, { useContext, useEffect, useState } from "react";

import Game from "./views/game/game";
import { boss, player, records } from "./beta/records";
import Battle from "./views/game/battle";
import Home from "./views/home/home";
import Navbar from "./components/navbar";
import Settings from "./views/settings/settings";
import Add from "./views/settings/addBoss";
import AddQuiz from "./views/settings/addQuiz";
import supabase from "./common/supabase";
// Create a context to hold the beta/records value
const BetaRecordsContext = React.createContext<{ betaRecords: any; setBetaRecords: React.Dispatch<React.SetStateAction<any>> | null }>({ betaRecords: [], setBetaRecords: null });
export const useBetaRecords = () => useContext(BetaRecordsContext);
const PageContext = React.createContext<{ page: Page; setPage: React.Dispatch<React.SetStateAction<any>> | null }>({ page: "home", setPage: null });
export const usePage = () => useContext(PageContext);
export type Page = "battle" | "home" | "game" | "settings" | "addBoss" | "addQuiz";
const PlayerContext = React.createContext<any>({});
export const usePlayer = () => useContext(PlayerContext);
const BossContext = React.createContext<any>({});
export const useBoss = () => useContext(BossContext);

export const fetchBoss = async () => {
    let { data: boss, error } = await supabase.from("boss").select("*");
    return boss;
};
export const fetchPlayer = async () => {
    let { data: player, error } = await supabase.from("player").select("*");
    return player;
};
const Page: React.FC = () => {
    // Use the useContext hook to access the beta/records value
    const [betaRecords, setBetaRecords] = useState<any>({ records, bossId: 0 });
    const [player, setPlayer] = useState<any>();
    const [boss, setBoss] = useState<any>();
    const [currentBoss, setCurrentBoss] = useState<any>();
    const [page, setPage] = useState<Page>("addQuiz");
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timeoutId) clearTimeout(timeoutId);
        const id = setTimeout(async () => {
            // update supabase
            await supabase.from("player").update(player).eq("id", 1);
        }, 5000);
        setTimeoutId(id);
    }, [player]);
    useEffect(() => {
        if (!boss) return;
        if (timeoutId) clearTimeout(timeoutId);
        const id = setTimeout(async () => {
            // update supabase
            await Promise.all(
                boss.map((b: any) => {
                    return supabase.from("boss").update(b).eq("id", b.id);
                })
            );
        }, 5000);
        setTimeoutId(id);
    }, [boss]);
    console.log("boss", boss);
    useEffect(() => {
        (async () => {
            let { data: boss, error } = await supabase.from("boss").select("*");
            setBoss(boss);
        })();
    }, []);
    useEffect(() => {
        (async () => {
            let { data, error } = await supabase.from("player").select("*");
            if (error || !data) return;
            console.log("data", data);
            setPlayer(data[0]);
        })();
    }, []);
    console.log("player", player);
    return (
        <BossContext.Provider value={{ boss, setBoss, currentBoss, setCurrentBoss }}>
            <PlayerContext.Provider value={{ player, setPlayer }}>
                <PageContext.Provider value={{ page, setPage }}>
                    <BetaRecordsContext.Provider value={{ betaRecords, setBetaRecords }}>
                        <div className="min-h-screen">
                            <div className="page-container">
                                <header className="navbar">{/* Add your navigation links here */}</header>
                                <main className="content">{/* Add your page content here */}</main>
                                <footer className="footer">{/* Add your footer content here */}</footer>
                            </div>
                            {page == "home" && <Home />}
                            {page == "settings" && <Settings />}
                            {page == "addBoss" && <Add />}
                            {page == "addQuiz" && <AddQuiz />}
                            {page == "game" && <Game />}
                            {page == "battle" && <Battle />}
                            <Navbar page={page} setPage={setPage} />
                        </div>
                    </BetaRecordsContext.Provider>
                </PageContext.Provider>
            </PlayerContext.Provider>
        </BossContext.Provider>
    );
};

export default Page;
