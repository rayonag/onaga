"use client";
import React, { useRef, useState } from "react";
import Numkeys from "./components/Numkeys";
import Currency from "./components/Currency";
import IncomeExpense from "./components/IncomeExpense";
import Type from "./components/Type";
import Who from "./components/Who";
import Input from "./components/Input";
import Payment from "./components/Payment";

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
    const [where, setWhere] = useState("");
    const [memo, setMemo] = useState("");
    const [payment, setPayment] = useState("Cash");
    return (
        <div className="h-screen">
            <h1 className="title">問い合わせフォーム</h1>
            <iframe name="hidden_iframe" className=" hidden" onLoad={() => redirect()} />
            <form onSubmit={() => setIsSubmitted(true)} action="https://docs.google.com/forms/u/0/d/e/1FAIpQLScRJSzD2n3gLiW5VEKCCYa3ZeSoE24tSkTNU0BmmSINT-WFTw/formResponse" target="hidden_iframe" method="post">
                <div className="text-center">
                    <div className="text-xl">
                        <Who name={name} setName={setName} />
                        <Currency currency={currency} setCurrency={setCurrency} />
                        <Numkeys amount={amount} setAmount={setAmount} />
                        <input type="date" name="entry.1377508283" defaultValue={getCurrentDate()} />
                        <IncomeExpense incomeExpense={incomeExpense} setIncomeExpense={setIncomeExpense} />
                        <Type type={type} setType={setType} incomeExpense={incomeExpense} />
                        <Payment payment={payment} setPayment={setPayment} />
                        <Input value={where} setValue={setWhere} placeholder="Where?" />
                        <Input value={memo} setValue={setMemo} placeholder="Add Memo" />
                    </div>
                    <div className="hidden">
                        <input className="hidden" defaultValue={name} name="entry.2013839616" />
                        <input className="hidden" defaultValue={currency} name="entry.1036151169" />
                        <input className="hidden" defaultValue={amount} name="entry.1455952162" />
                        <input className="hidden" defaultValue={incomeExpense} name="entry.1515471867" />
                        <input className="hidden" defaultValue={type} name="entry.501840186" />
                        <input className="hidden" defaultValue={memo} name="entry.1415538140" />
                        <input className="hidden" defaultValue={where} name="entry.279699908" />
                        <input className="hidden" defaultValue={memo} name="entry.1247815831" />
                    </div>
                </div>

                <input type="submit" value="送信" />
            </form>
        </div>
    );
};
export default Kakeibo;
