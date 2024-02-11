import { FC, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { roboto_mono } from "@/app/fonts";

type CurrencyProps = {
    currency: string;
    setCurrency: React.Dispatch<React.SetStateAction<string>>;
};

const Currency: FC<CurrencyProps> = ({ currency, setCurrency }) => {
    const [touched, setTouched] = useState("");
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
    const buttonStyle = (val: string) => `${touched === val ? "bg-gray-300 " : val === currency ? "bg-cyan-600 " : "bg-gray-500 "} mr-1 w-16 h-12 text-white rounded-full justify-center text-2xl`;
    const divStyle = "flex justify-center my-2";
    const nextVal = currency === "₪" ? "¥" : "₪";
    const toggleName = () => {
        const newVal = nextVal;
        setCurrency(newVal);
    };

    return (
        <div className={divStyle}>
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }} // Allow dragging within the container
                dragElastic={0.5} // Add a bit of elasticity to the drag
                onDragEnd={(e, info) => {
                    if (info.offset.x <= -40 || info.offset.x >= 40) {
                        toggleName();
                    }
                }}
                style={{ x, opacity }}
                className="w-40 flex justify-center"
            >
                <motion.button className={`${roboto_mono.className + " " + buttonStyle(currency)}`} type="button" onTouchStart={() => setTouched(currency)} onTouchEnd={() => setTouched("")}>
                    {currency}
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Currency;
