"use client";
import React, { useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import Numkeys from "./components/Numkeys";
import Currency from "./components/Currency";
import IncomeExpense from "./components/IncomeExpense";
import Type from "./components/Type";
import Who from "./components/Who";
import Input from "./components/Input";
import Payment from "./components/Payment";
import Loading from "./components/Loading";

const Kakeibo = () => {
    function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const day = String(currentDate.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const [isSubmitted, setIsSubmitted] = useState(false);
    const redirect = () => {
        if (isSubmitted) {
            alert("record is saved");
            window.location.reload();
        }
    };

    const [name, setName] = useState("Hosanna");
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("₪");
    const [incomeExpense, setIncomeExpense] = useState("Expense");
    const [type, setType] = useState("");
    const [payment, setPayment] = useState("Cash");
    const [where, setWhere] = useState("");
    const [memo, setMemo] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const controls = useAnimation();
    const x = useMotionValue(-1200);

    const snapPoints = [0, -600, -1200]; // Snap points for each section

    return (
        <div className="h-full py-5">
            <iframe
                name="hidden_iframe"
                className="hidden"
                onLoad={() => {
                    setIsLoading(false);
                    redirect();
                }}
            />
            <form
                onSubmit={() => {
                    setIsLoading(true);
                    setIsSubmitted(true);
                }}
                action="https://docs.google.com/forms/u/0/d/e/1FAIpQLScRJSzD2n3gLiW5VEKCCYa3ZeSoE24tSkTNU0BmmSINT-WFTw/formResponse"
                target="hidden_iframe"
                method="post"
                className={`${isLoading ? "blur-lg" : ""}`}
            >
                <div className="text-center">
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 1200 }}
                        dragElastic={0.5}
                        onDragEnd={(_, info) => {
                            controls.stop();
                            const nearestSnap = snapPoints.reduce((prev, curr) => (Math.abs(curr - info.point.x) < Math.abs(prev - info.point.x) ? curr : prev));
                            console.log(nearestSnap);
                            controls.start({ x: nearestSnap });
                        }}
                        animate={controls}
                        className="text-xl flex w-[300vw]"
                        style={{ x }}
                    >
                        <div className="w-[100vw] h-full">
                            <Who name={name} setName={setName} />
                            <Currency currency={currency} setCurrency={setCurrency} />
                            <Numkeys amount={amount} setAmount={setAmount} />
                            <input className="bg-slate-500" type="date" name="entry.1377508283" defaultValue={getCurrentDate()} />
                        </div>
                        <div className="w-[100vw] h-full">
                            <IncomeExpense incomeExpense={incomeExpense} setIncomeExpense={setIncomeExpense} />
                            <Payment payment={payment} setPayment={setPayment} />
                            <Type type={type} setType={setType} incomeExpense={incomeExpense} />
                        </div>
                        <div className="w-[100vw] h-full">
                            <Input value={where} setValue={setWhere} placeholder="Where?" />
                            <Input value={memo} setValue={setMemo} placeholder="Add Memo" />
                            <button className="bg-cyan-600 w-28 h-12 text-white rounded-full text-2xl" type="submit" value="Submit">
                                Submit
                            </button>
                        </div>
                    </motion.div>
                    <div className="hidden">
                        <input className="hidden" defaultValue={name} name="entry.2013839616" />
                        <input className="hidden" defaultValue={currency} name="entry.1036151169" />
                        <input className="hidden" defaultValue={amount} name="entry.1455952162" />
                        <input className="hidden" defaultValue={incomeExpense} name="entry.1515471867" />
                        <input className="hidden" defaultValue={type} name="entry.501840186" />
                        <input className="hidden" defaultValue={payment} name="entry.1415538140" />
                        <input className="hidden" defaultValue={where} name="entry.279699908" />
                        <input className="hidden" defaultValue={memo} name="entry.1247815831" />
                    </div>
                </div>
            </form>
            {isLoading && <Loading />}
        </div>
    );
};

export default Kakeibo;
