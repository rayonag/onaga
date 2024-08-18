import usePage from "@/zustand/page";
import Image from "next/image";
import { useState } from "react";
import useSound from "use-sound";
const Home = () => {
    const [isAttacking, setIsAttacking] = useState(false);
    const [play1] = useSound("/effects/sound/打撃1.mp3");
    const [angle, setAngle] = useState(0);
    const setPage = usePage((state) => state.setPage);
    const handleClick = async () => {
        play1();
        setIsAttacking(true);
        await setTimeout(() => setIsAttacking(false), 500);
        setAngle(Math.floor(Math.random() * 90) + 1);
    };
    console.log("angle", angle);
    return (
        <div className="flex flex-col h-screen justify-center text-center items-center">
            {/* <div onClick={handleClick} className="btn-theme">
                Coming Soon...
            </div> */}
            <div className="flex justify-center items-center m-2 bg-theme2 rounded-lg text-white h-1/4 w-2/5" onClick={() => setPage("rewards")}>
                <Image className="absolute opacity-40" src={`/vocabs/treasure/treasure_open.png`} alt={"Reward"} width={150} height={150} />
                <span className="text-2xl z-10">Rewards</span>
            </div>
        </div>
    );
};
export default Home;
