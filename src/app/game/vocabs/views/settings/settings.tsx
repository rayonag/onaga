import Image from "next/image";
import { Page, usePage } from "../../common/contexts";
import { FC } from "react";

const Settings = () => {
    const { setPage } = usePage();
    if (setPage === null) return null;
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
        <div className="flex h-[90vh] justify-center text-center items-center">
            <SettingPage page="settingBoss" text="Boss" imageSrc="bossBG" />
            {/* <SettingPage page="settingQuiz" text="Quiz" imageSrc="Q" /> */}
        </div>
    );
};
export default Settings;
