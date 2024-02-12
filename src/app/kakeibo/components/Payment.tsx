import { FC, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { roboto_mono } from "@/app/fonts";

type PaymentProps = {
    payment: string;
    setPayment: React.Dispatch<React.SetStateAction<string>>;
};

const Payment: FC<PaymentProps> = ({ payment, setPayment }) => {
    const [touched, setTouched] = useState("");
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
    const buttonStyle = (val: string) => `${touched === val ? "bg-gray-300 " : val === payment ? "bg-cyan-600 " : "bg-gray-500 "} mr-1 w-44 h-12 text-white rounded-full justify-center text-xl`;
    const divStyle = "flex justify-center my-2";
    const nextVal = payment === "Cash" ? "Credit Card" : payment === "Credit Card" ? "Bank Transfer" : "Cash";
    const prevVal = payment === "Cash" ? "Bank Transfer" : payment === "Bank Transfer" ? "Credit Card" : "Cash";

    return (
        <div className={divStyle}>
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }} // Allow dragging within the container
                dragElastic={0.5} // Add a bit of elasticity to the drag
                onClick={() => setPayment(nextVal)}
                onDragEnd={(e, info) => {
                    if (info.offset.x <= -40) setPayment(nextVal);
                    else if (info.offset.x >= 40) setPayment(prevVal);
                }}
                style={{ x, opacity }}
            >
                <motion.button className={`${roboto_mono.className + " " + buttonStyle(payment)}`} type="button" onTouchStart={() => setTouched(payment)} onTouchEnd={() => setTouched("")}>
                    {payment}
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Payment;
