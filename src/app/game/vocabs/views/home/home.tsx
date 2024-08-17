import Image from "next/image";
import { useState } from "react";
import useSound from "use-sound";
const Home = () => {
    const [isAttacking, setIsAttacking] = useState(false);
    const [play1] = useSound("/effects/sound/打撃1.mp3");
    const [angle, setAngle] = useState(0);
    const handleClick = async () => {
        play1();
        setIsAttacking(true);
        await setTimeout(() => setIsAttacking(false), 500);
        setAngle(Math.floor(Math.random() * 90) + 1);
    };
    console.log("angle", angle);
    return (
        <div className="flex flex-col h-screen justify-center text-center items-center">
            <div onClick={handleClick} className="btn-theme">
                Coming Soon...
            </div>
            {isAttacking && (
                <>
                    <Image className={`rotate-[70deg]`} src="/effects/tktk_Fire_1-ezgif.com-gif-maker.gif" alt="fire" width={100} height={200} />
                </>
            )}
        </div>
    );
};
export default Home;
