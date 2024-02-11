import { FC, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { caveat } from "@/app/fonts";

type IncomeExpenseProps = {
    incomeExpense: string;
    setIncomeExpense: React.Dispatch<React.SetStateAction<string>>;
};

const IncomeExpense: FC<IncomeExpenseProps> = ({ incomeExpense, setIncomeExpense }) => {
    const [touched, setTouched] = useState("");
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
    const buttonStyle = (val: string) => `${touched === val ? "bg-gray-300 " : val === "Income" ? "bg-cyan-600 " : "bg-rose-600 "} mr-1 w-40 h-12 text-white rounded-full justify-center text-4xl`;
    const divStyle = "flex justify-center my-2";
    const nextVal = incomeExpense === "Income" ? "Expense" : "Income";
    const toggleIncomeExpense = () => {
        const newVal = nextVal;
        setIncomeExpense(newVal);
    };

    const handleDrag = (event, info) => {
        // Update the x position based on the drag
        x.set(info.offset.x);
        // If dragged enough, toggle the incomeExpense
        if (info.offset.x <= -30 || info.offset.x >= 30) {
            toggleIncomeExpense();
        }
    };

    return (
        <div className={divStyle}>
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }} // Allow dragging within the container
                dragElastic={0.2} // Add a bit of elasticity to the drag
                onDrag={handleDrag}
                style={{ x, opacity }}
                className="w-40 flex justify-center"
            >
                <motion.button className={`${caveat.className + " " + buttonStyle(incomeExpense)}`} type="button" onTouchStart={() => setTouched(incomeExpense)} onTouchEnd={() => setTouched("")}>
                    {incomeExpense}
                </motion.button>
            </motion.div>
        </div>
    );
};

export default IncomeExpense;
