import { FC, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { roboto_mono } from "@/app/fonts";

type WhoProps = {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
};

const Who: FC<WhoProps> = ({ name, setName }) => {
    const [touched, setTouched] = useState("");
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
    const buttonStyle = (val: string) => `${touched === val ? "bg-gray-300 " : val === "Ray" ? "bg-violet-500 " : "bg-amber-500 "} mr-1 w-40 h-12 text-white rounded-full justify-center text-3xl`;
    const divStyle = "flex justify-center my-2";
    const nextVal = name === "Ray" ? "Hosanna" : "Ray";
    const toggleName = () => {
        const newVal = nextVal;
        setName(newVal);
    };

    return (
        <div className={divStyle}>
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }} // Allow dragging within the container
                dragElastic={0.5} // Add a bit of elasticity to the drag
                onClick={toggleName}
                onDragEnd={(e, info) => {
                    if (info.offset.x <= -40 || info.offset.x >= 40) {
                        toggleName();
                    }
                }}
                style={{ x, opacity }}
                className="w-40 flex justify-center"
            >
                <motion.button className={`${roboto_mono.className + " " + buttonStyle(name)}`} type="button" onTouchStart={() => setTouched(name)} onTouchEnd={() => setTouched("")}>
                    {name}
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Who;
