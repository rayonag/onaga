import Image from "next/image";
import { useState } from "react";

const Home = () => {
    const [play, setPlay] = useState(false);
    const [angle, setAngle] = useState(0);
    const handleClick = async () => {
        setPlay(true);
        await setTimeout(() => setPlay(false), 500);
        setAngle(Math.floor(Math.random() * 90) + 1);
    };
    console.log("angle", angle);
    return (
        <div className="flex flex-col h-screen justify-center text-center items-center">
            <div onClick={handleClick} className="btn-theme">
                Coming Soon...
            </div>
            {play && (
                <>
                    <Image className={`rotate-[70deg]`} src="/effects/tktk_Fire_1-ezgif.com-gif-maker.gif" alt="fire" width={100} height={200} />
                    <audio autoPlay>
                        <source src="/effects/火炎魔法1.mp3" type="audio/mpeg" />
                    </audio>
                </>
            )}
        </div>
    );
};
export default Home;
