import useStreakStore from "@/zustand/game/vocabs/streak";
import usePage from "@/zustand/page";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import Example from "./LineChart";
const Home = () => {
    const [isAttacking, setIsAttacking] = useState(false);
    const [play1] = useSound("/effects/sound/打撃1.mp3");
    const setPage = usePage((state) => state.setPage);
    const { streak, getStreak } = useStreakStore();
    useEffect(() => {
        getStreak();
    }, []);
    const handleClick = async () => {
        play1();
        setIsAttacking(true);
        await setTimeout(() => setIsAttacking(false), 500);
    };
    return (
        <div style={{ backgroundPosition: "center", backgroundSize: "cover", backgroundImage: `url('/vocabs/bg/bg-home.webp')` }} className="overflow-hidden flex flex-col h-screen justify-center text-center items-center">
            {/* <div onClick={handleClick} className="btn-theme">
                Coming Soon...
            </div> */}
            {/* <div className="flex justify-center items-center m-2 bg-theme2 rounded-lg text-white h-1/4 w-48" onClick={() => setPage(page)}>
                <Image className="absolute opacity-40" src={`/vocabs/${imageSrc}.png`} alt={imageSrc} width={150} height={150} />
                <span className="text-2xl z-10">{text}</span>
            </div> */}
            <div className="absolute top-10 flex items-center justify-center text-3xl m-2 bg-orange-600 bg-opacity-50 rounded-full text-white h-12 w-60" onClick={() => setPage("game")}>
                <span className="font-sans font-bold text-white">
                    <p>
                        {streak} day{streak && streak > 1 && "s"} streak
                    </p>
                </span>
            </div>
            <div className="rounded-lg bg-white bg-opacity-30 p-2 relative flex justify-center items-center h-2/4 w-4/5">
                <Example />
            </div>
            <button className="flex justify-center items-center font-bold m-2 bg-theme2 !bg-opacity-90 rounded-full text-white h-16 w-48" onClick={() => setPage("rewards")}>
                {/* <Image className="absolute opacity-40" src={`/vocabs/treasure/treasure_open.png`} alt={"Reward"} width={150} height={150} /> */}
                <span className="text-2xl z-10">お宝をあける</span>
            </button>
            {/* <div className="flex justify-center items-center m-2 bg-theme2 rounded-lg text-white h-1/4 w-48" onClick={() => setPage("shop")}>
                <Image className="absolute opacity-40" src={`/vocabs/treasure/shop.png`} alt={"Reward"} width={150} height={150} />
                <span className="text-2xl z-10">Shop</span>
            </div> */}
        </div>
    );
};
export default Home;
