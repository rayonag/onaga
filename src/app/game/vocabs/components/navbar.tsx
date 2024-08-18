import HomeIcon from "./icons/HomeIcon";
import SettingsIcon from "./icons/SettingsIcon";
import GameIcon from "./icons/GameIcon";
import usePage from "@/zustand/page";
import { useShallow } from "zustand/react/shallow";

const Navbar = () => {
    const { page, setPage } = usePage(useShallow((state) => ({ page: state.page, setPage: state.setPage })));

    const iconClass = (icon: string) => `p-5 ${page === icon ? "text-gray-400" : ""}`;
    return (
        <nav className="absolute bottom-0 w-full z-50">
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
