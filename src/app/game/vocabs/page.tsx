"use client";
import React, { useEffect, useState } from "react";

import Game from "./views/game/game";
import Battle from "./views/game/battle";
import Home from "./views/home/home";
import Navbar from "./components/navbar";
import Settings from "./views/settings/settings";
import supabase from "../../../supabase";
import { BossContext, PlayerContext } from "./common/contexts";

import SettingBoss from "./views/settings/settingBoss";
import SettingQuiz from "./views/settings/settingQuiz";
import Rewards from "./views/home/rewards";
import usePage from "@/zustand/page";
import Shop from "./views/home/shop";

const Page: React.FC = () => {
    const [player, setPlayer] = useState<any>();
    const [boss, setBoss] = useState<any>();
    const [currentBoss, setCurrentBoss] = useState<any>();
    const page = usePage((state) => state.page);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    console.log("page", page);
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
                    console.log("b", b);
                    return supabase.from("boss").update(b).eq("id", b.id);
                })
            );
        }, 5000);
        setTimeoutId(id);
    }, [boss]);
    console.log("boss", boss);
    useEffect(() => {
        (async () => {
            let { data: boss, error } = await supabase.from("boss").select("*").order("id", { ascending: true });
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
    // set height of the viewport, not to be messed when input is focused
    useEffect(() => {
        const setVh = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        };

        setVh();
        window.addEventListener("resize", setVh);

        return () => {
            window.removeEventListener("resize", setVh);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [page]);
    return (
        <BossContext.Provider value={{ boss, setBoss, currentBoss, setCurrentBoss }}>
            <PlayerContext.Provider value={{ player, setPlayer }}>
                <div className="app-container">
                    <div className="page-container">
                        {page == "game" && <Game />}
                        {page == "battle" && <Battle />}
                        {page == "shop" && <Shop />}
                        {page == "settingBoss" && <SettingBoss />}
                    </div>
                    <div>
                        {page == "home" && <Home />}
                        {page == "rewards" && <Rewards />}
                        {page == "settings" && <Settings />}
                        {page == "settingQuiz" && <SettingQuiz />}
                    </div>
                </div>
                <Navbar />
            </PlayerContext.Provider>
        </BossContext.Provider>
    );
};

export default Page;
