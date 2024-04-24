"use client";
import React, { useEffect, useState } from "react";

import Game from "./views/game/game";
import Battle from "./views/game/battle";
import Home from "./views/home/home";
import Navbar from "./components/navbar";
import Settings from "./views/settings/settings";
//import Add from "./views/settings/addBoss";
import AddQuiz from "./views/settings/addQuiz";
import supabase from "./common/supabase";
import { BossContext, PlayerContext, PageContext } from "./common/exports";

import type { Page } from "./common/exports";

const Page: React.FC = () => {
    const [player, setPlayer] = useState<any>();
    const [boss, setBoss] = useState<any>();
    const [currentBoss, setCurrentBoss] = useState<any>();
    const [page, setPage] = useState<Page>("home");
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
    useEffect(() => {
        // Disable body scroll
        document.body.style.overflow = "hidden";

        // return () => {
        //     // Re-enable body scroll on cleanup
        //     document.body.style.overflow = "";
        // };
    }, []);
    return (
        <BossContext.Provider value={{ boss, setBoss, currentBoss, setCurrentBoss }}>
            <PlayerContext.Provider value={{ player, setPlayer }}>
                <PageContext.Provider value={{ page, setPage }}>
                    <div className="h-screen">
                        <div className="page-container">
                            <header className="navbar">{/* Add your navigation links here */}</header>
                            <main className="content">{/* Add your page content here */}</main>
                            <footer className="footer">{/* Add your footer content here */}</footer>
                        </div>
                        {page == "home" && <Home />}
                        {page == "settings" && <Settings />}
                        {/* {page == "addBoss" && <Add />} */}
                        {page == "addQuiz" && <AddQuiz />}
                        {page == "game" && <Game />}
                        {page == "battle" && <Battle />}
                        <Navbar page={page} setPage={setPage} />
                    </div>
                </PageContext.Provider>
            </PlayerContext.Provider>
        </BossContext.Provider>
    );
};

export default Page;
