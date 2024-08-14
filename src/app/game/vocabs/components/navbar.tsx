import Link from "next/link";
import HomeIcon from "./icons/HomeIcon";
import SettingsIcon from "./icons/SettingsIcon";
import { Dispatch, FC, SetStateAction } from "react";
import type { Page } from "../common/contexts";
import GameIcon from "./icons/GameIcon";

type NavbarProps = {
    page: string;
    setPage: Dispatch<SetStateAction<Page>>;
};
const Navbar: FC<NavbarProps> = ({ page, setPage }) => {
    const iconClass = (icon: string) => `p-5 ${page === icon ? "text-gray-400" : ""}`;
    return (
        <nav className="absolute bottom-0 w-full">
            <div className="flex justify-around  bg-gray-200">
                <div onClick={() => setPage("home")} className={iconClass("home")}>
                    <HomeIcon fill="none" />
                </div>
                <div onClick={() => setPage("settings")} className={iconClass("settings")}>
                    <SettingsIcon fill="none" />
                </div>
                <div onClick={() => setPage("game")} className={iconClass("game")}>
                    <GameIcon />
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
