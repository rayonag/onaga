"use client";
import React, { useRef, useState } from "react";
import Numkeys from "./components/Numkeys";
import Currency from "./components/Currency";
import IncomeExpense from "./components/IncomeExpense";
import Type from "./components/Type";

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
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("₪");
    const [incomeExpense, setIncomeExpense] = useState("Expense");
    const [type, setType] = useState("");
    return (
        <div className="h-screen">
            <h1 className="title">問い合わせフォーム</h1>
            <iframe name="hidden_iframe" className=" hidden" onLoad={() => redirect()} />
            <form onSubmit={() => setIsSubmitted(true)} action="https://docs.google.com/forms/u/0/d/e/1FAIpQLScRJSzD2n3gLiW5VEKCCYa3ZeSoE24tSkTNU0BmmSINT-WFTw/formResponse" target="hidden_iframe" method="post">
                <div className="text-center">
                    <div className="text-xl">
                        <Currency currency={currency} setCurrency={setCurrency} />
                        <input className="hidden" defaultValue={amount} name="entry.1036151169" />
                        <Numkeys amount={amount} setAmount={setAmount} />
                        <input className="hidden" defaultValue={amount} name="entry.1455952162" />
                        <input type="date" name="entry.1377508283" defaultValue={getCurrentDate()} />
                        <IncomeExpense incomeExpense={incomeExpense} setIncomeExpense={setIncomeExpense} />
                        <Type type={type} setType={setType} />
                    </div>
                </div>
                <label htmlFor="entry.1036151169">Currency</label>
                <select name="entry.1036151169" defaultValue={"₪"}>
                    <option value="¥">¥</option>
                    <option value="₪">₪</option>
                </select>

                <label htmlFor="entry.1377508283">Date</label>

                <label htmlFor="entry.1515471867"></label>
                <select name="entry.1515471867" defaultValue={"Expense"}>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>

                <label htmlFor="entry.501840186">Type</label>
                <select name="entry.501840186" defaultValue={"Grocery"}>
                    <option value="Grocery">Grocery</option>
                    <option value="Daily">Daily</option>
                    <option value="Hang out">Hang out</option>
                    <option value="Dating">Dating</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Studies">Studies</option>
                    <option value="Medical">Medical</option>
                    <option value="BFP Gift">BFP Gift</option>
                    <option value="Offerings">Offerings</option>
                    <option value="Other">Other</option>
                </select>

                <label htmlFor="entry.279699908">Where</label>
                <input name="entry.279699908" />

                <label htmlFor="entry.1415538140">Method</label>
                <select name="entry.1415538140" defaultValue={"Cash"}>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                </select>

                <label htmlFor="entry.2013839616">Who</label>
                <select name="entry.2013839616" defaultValue={""}>
                    <option value="Ray">Ray</option>
                    <option value="Hosanna">Hosanna</option>
                </select>

                <label htmlFor="entry.20915564">Monthly Budget</label>
                <select name="entry.20915564" defaultValue={""}>
                    <option value="Food">Food</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Daily">Daily</option>
                    <option value="Tithe">Tithe</option>
                    <option value="Hang out">Hang out</option>
                    <option value="Others">Others</option>
                </select>

                <label htmlFor="entry.1247815831">Memo</label>
                <input name="entry.1247815831" />

                <input type="submit" value="送信" />
            </form>
        </div>
    );
};
export default Kakeibo;
