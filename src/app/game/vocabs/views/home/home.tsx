import useStreakStore from "@/zustand/game/vocabs/streak";
import usePage from "@/zustand/page";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import LineChartForWeek from "./LineChart";
import { DateTime } from "luxon";
// import { parseCookies, setCookie } from "nookies";
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
    const getGemini = async () => {
        // post request to get gemini
        const res = await fetch("/api/Gemini", { method: "POST", body: JSON.stringify({ name: "Gemini" }) });
        // const res = await fetch("/api/Gemini");
        const data = await res.json();
        console.log("data", data);
    };
    const [encourageMessages, setEncourageMessages] = useState<string[]>([]);
    const [encourageIndex, setEncourageIndex] = useState(0);
    // useEffect(() => {
    //     const cookies = parseCookies();
    //     const encourageCookie = cookies.encourage;
    //     if (!encourageCookie) encourageMe();
    // }, []);
    // const encourageMe = async () => {
    //     if (encourageMessages.length == 5) {
    //         setEncourageIndex(encourageIndex + 1 > 5 ? 0 : encourageIndex + 1);
    //     }
    //     // set cookie with expiry time of next whole number of hours
    //     setCookie(null, "encourage", "value", { maxAge: (DateTime.now().plus({ hours: 1 }).set({ minute: 0, second: 0, millisecond: 0 }).diff(DateTime.now()) as any).values.milliseconds / 1000 });
    //     // get new messages
    //     const newMessages = await Promise.all(
    //         Array.from({ length: 5 }, async (v, i) => {
    //             const res = await fetch("/api/Gemini");
    //             const data = await res.json();
    //             return data.response;
    //         })
    //     );
    //     console.log("newMessages", newMessages);
    //     setEncourageMessages(newMessages);
    //     setEncourageIndex(encourageIndex + 1 > 5 ? 0 : encourageIndex + 1);
    // };

    return (
        <div style={{ backgroundPosition: "center", backgroundSize: "cover", backgroundImage: `url('/vocabs/bg/bg-home.webp')` }} className="overflow-hidden flex flex-col h-screen justify-center text-center items-center">
            {/* <div onClick={handleClick} className="btn-theme">
                Coming Soon...
            </div> */}
            {/* <div className="flex justify-center items-center m-2 bg-theme2 rounded-lg text-white h-1/4 w-48" onClick={() => setPage(page)}>
                <Image className="absolute opacity-40" src={`/vocabs/${imageSrc}.png`} alt={imageSrc} width={150} height={150} />
                <span className="text-2xl z-10">{text}</span>
            </div> */}
            {/* <div className="absolute bottom-16 right-2 m-2 bg-orange-600 rounded-full h-32 w-32" onClick={() => encourageMe()}></div> */}
            {/* <div className="absolute bottom-16 left-2 m-2 bg-green-600 text-white rounded-full h-32 w-32">{encourageMessages[encourageIndex]}</div> */}
            {/* <div className="absolute top-10 flex items-center justify-center text-3xl m-2 bg-orange-600 bg-opacity-50 rounded-full text-white h-12 w-60" onClick={() => setPage("game")}>
                <span className="font-sans font-bold text-white">
                    <p>
                        {streak} day{streak && streak > 1 && "s"} streak
                    </p>
                </span>
            </div> */}
            <div className="rounded-lg bg-white bg-opacity-30 p-2 relative flex justify-center items-center h-1/2 max-h-[300px] w-4/5 max-w-[300px]">
                <LineChartForWeek />
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
