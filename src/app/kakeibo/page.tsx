import React from "react";

const Kakeibo = () => {
    function getCurrentDate() {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const day = String(currentDate.getDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    }
    return (
        <>
            <h1 className="title">問い合わせフォーム</h1>

            <form action="<https://docs.google.com/forms/u/0/d/e/1_JhBXf4qijggyFRdpp0JpXwh4-acsk8P_bJ-H8RGYjU/formResponse>" method="post">
                <label htmlFor="entry.1455952162">Enter Amount</label>
                <input type="number" name="entry.1455952162" />

                <label htmlFor="entry.1036151169">Currency</label>
                <select name="entry.1036151169" defaultValue={"₪"}>
                    <option value="¥">¥</option>
                    <option value="₪">₪</option>
                </select>

                <label htmlFor="entry.1377508283">Date</label>
                <input type="date" name="entry.1377508283" defaultValue={getCurrentDate()} />

                <label htmlFor="entry.1455952162">Enter Amount</label>
                <input type="number" name="entry.1455952162" />

                <label htmlFor="entry.1515471867"></label>
                <select name="entry.1515471867" defaultValue={"Expense"}>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>

                <label htmlFor="entry.501840186">Type</label>
                <select name="entry.501840186" defaultValue={"Grocery"}>
                    <option value="Grocery">Grocery</option>
                    <option value="Daiy">Daiy</option>
                </select>

                <label htmlFor="entry.279699908">Where</label>
                <select name="entry.279699908" defaultValue={"Expense"}>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>

                <input type="submit" value="送信" />
            </form>
        </>
    );
};
export default Kakeibo;
