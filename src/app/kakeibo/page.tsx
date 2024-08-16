"use client";
import React, { CSSProperties, useState } from "react";
import Numkeys from "./components/Numkeys";
import IncomeExpense from "./components/IncomeExpense";
import Type from "./components/Type";
import Who from "./components/Who";
import Input from "./components/Input";
import Payment from "./components/Payment";
import SwiperWrapper from "./components/swiper/Swiper";
import { PacmanLoader } from "react-spinners";

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
            alert("Submitted successfully!");
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

    const handleTouchStart = (e: React.TouchEvent) => {
        e.stopPropagation();
    };
    const override: CSSProperties = {
        display: "block",
        position: "absolute",
        top: "50%",
        left: "15%",
        margin: "0 auto",
        // add animation to move pacmadn
        animation: "move 3s linear infinite",
    };
    return (
        <div className="h-full">
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
                    <SwiperWrapper>
                        <div className="w-[100vw] h-screen pt-10">
                            <Who name={name} setName={setName} onTouchStart={handleTouchStart} />
                            <Numkeys amount={amount} setAmount={setAmount} currency={currency} setCurrency={setCurrency} />
                            <input className="bg-slate-500 text-white p-1" type="date" name="entry.1377508283" defaultValue={getCurrentDate()} />
                        </div>
                        <div className="w-[100vw] h-screen pt-10">
                            <IncomeExpense incomeExpense={incomeExpense} setIncomeExpense={setIncomeExpense} ontouchStart={handleTouchStart} />
                            <Payment payment={payment} setPayment={setPayment} />
                            <Type type={type} setType={setType} incomeExpense={incomeExpense} />
                        </div>
                        <div className="w-[100vw] h-screen pt-10">
                            <Input value={where} setValue={setWhere} placeholder="Where?" />
                            <Input value={memo} setValue={setMemo} placeholder="Add Memo" />
                            <div>
                                <button className="bg-cyan-600 w-28 h-12 text-white rounded-full text-2xl m-10" type="submit" value="Submit">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </SwiperWrapper>
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
            {isLoading && (
                <div className="absolute top-0 left-0 self-center h-screen w-[80%] mx-[10%] overflow-hidden">
                    <PacmanLoader color="#00BFFF" cssOverride={override} loading={isLoading} size={50} />
                </div>
            )}
        </div>
    );
};

export default Kakeibo;
