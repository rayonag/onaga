import usePage, { Page } from "@/zustand/page";
import Image from "next/image";
import { FC } from "react";
import { useShallow } from "zustand/react/shallow";

const Settings = () => {
    const { page, setPage } = usePage(useShallow((state) => ({ page: state.page, setPage: state.setPage })));

    type SettingPageProps = {
        page: Page;
        text: string;
        imageSrc: string;
    };
    const SettingPage: FC<SettingPageProps> = ({ page, text, imageSrc }) => (
        <div className="flex justify-center items-center m-2 bg-theme2 rounded-lg text-white h-1/4 w-2/5" onClick={() => setPage(page)}>
            <Image className="absolute opacity-40" src={`/vocabs/${imageSrc}.png`} alt={imageSrc} width={150} height={150} />
            <span className="text-2xl z-10">{text}</span>
        </div>
    );

    return (
        <div className="flex h-screen justify-center text-center items-center">
            <SettingPage page="settingBoss" text="Boss" imageSrc="boss_onepiece/bossBG" />
            {/* <SettingPage page="settingQuiz" text="Quiz" imageSrc="Q" /> */}
        </div>
    );
};
export default Settings;
