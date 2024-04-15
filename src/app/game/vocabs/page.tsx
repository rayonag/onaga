"use client";
import React, { useContext, useEffect, useState } from "react";

import Game from "./views/game/game";
import { boss, player, records } from "./beta/records";
import Battle from "./views/game/battle";
import Home from "./views/game/home";
// Create a context to hold the beta/records value
const BetaRecordsContext = React.createContext<{ betaRecords: any; setBetaRecords: React.Dispatch<React.SetStateAction<any>> | null }>({ betaRecords: [], setBetaRecords: null });
export const useBetaRecords = () => useContext(BetaRecordsContext);
const PageContext = React.createContext<{ page: Page; setPage: React.Dispatch<React.SetStateAction<any>> | null }>({ page: "home", setPage: null });
export const usePage = () => useContext(PageContext);
export type Page = "battle" | "home" | "game";
const Page: React.FC = () => {
    // Use the useContext hook to access the beta/records value
    const [betaRecords, setBetaRecords] = useState<any>({ records, boss, player, bossId: 0 });

    const [page, setPage] = useState<Page>("home");
    const [willUpdate, setWillUpdate] = useState(false);
    const togglePage = (page: Page) => {
        setPage(page);
    };
    useEffect(() => {
        if (willUpdate) return;
        else {
            setWillUpdate(true);
            (async () => {
                await setTimeout(() => {
                    //setBetaRecords({ ...betaRecords });
                    setWillUpdate(false);
                    // update supabase
                }, 5000);
            })();
        }
    }, [betaRecords]);
    return (
        <PageContext.Provider value={{ page, setPage }}>
            <BetaRecordsContext.Provider value={{ betaRecords, setBetaRecords }}>
                <div className="page-container">
                    <header className="navbar">{/* Add your navigation links here */}</header>
                    <main className="content">{/* Add your page content here */}</main>
                    <footer className="footer">{/* Add your footer content here */}</footer>
                </div>
                <button onClick={() => togglePage("battle")}>Battle</button>
                <button onClick={() => togglePage("game")}>Game</button>
                {page == "game" && <Game />}
                {page == "battle" && <Battle />}
                {page == "home" && <Home />}
            </BetaRecordsContext.Provider>
        </PageContext.Provider>
    );
};

export default Page;
