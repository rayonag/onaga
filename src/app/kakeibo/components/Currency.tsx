import { FC, useState } from "react";

type CurrencyProps = {
    currency: string;
    setCurrency: React.Dispatch<React.SetStateAction<string>>;
};
const Currency: FC<CurrencyProps> = ({ currency, setCurrency }) => {
    const handleOnClick = (val: string) => {
        setCurrency(val);
    };
    const [touched, setTouched] = useState("");
    const buttonStyle = (cur: string) => `${touched == cur ? "bg-gray-300 " : cur == currency ? "bg-cyan-600 " : "bg-gray-400 "} mr-3 w-10 h-10 text-white rounded-full justify-center text-4xl shadow-md transition-colors`;
    const divStyle = "flex justify-center m-2";
    return (
        <div className={divStyle}>
            {["₪", "¥"].map((currency) => (
                <div key={currency}>
                    <button className={buttonStyle(currency)} type="button" onTouchStart={() => setTouched(currency)} onTouchEnd={() => setTouched("")} onClick={() => handleOnClick(currency)}>
                        <div>{currency}</div>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Currency;
