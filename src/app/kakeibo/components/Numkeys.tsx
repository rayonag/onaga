import { FC, useState } from "react";

type NumkeysProps = {
    amount: string;
    setAmount: React.Dispatch<React.SetStateAction<string>>;
};
const Numkeys: FC<NumkeysProps> = ({ amount, setAmount }) => {
    const handleOnClick = (val: string) => {
        switch (val) {
            case "delete":
                setAmount(amount.slice(0, -1));
                break;

            default:
                setAmount(amount + val);
        }
    };
    const [touched, setTouched] = useState(0);
    const buttonStyle = (num: number) => `${touched == num ? "bg-gray-300 " : "bg-stone-400 "}w-16 h-16 text-white rounded-full items-center justify-center text-4xl shadow-md transition-colors`;
    const divStyle = "flex justify-between m-2";
    return (
        <div className="justify-center content-center w-3/5">
            <div className={divStyle}>
                {[1, 2, 3].map((number) => (
                    <div>
                        <button className={buttonStyle(number)} type="button" value={number} onTouchStart={() => setTouched(number)} onTouchEnd={() => setTouched(0)} onClick={() => handleOnClick(number.toString())}>
                            <div>{number}</div>
                            <div className="text-sm">{number == 1 ? "" : 2 ? "ABC" : 3 ? "DEF" : ""}</div>
                        </button>
                    </div>
                ))}
            </div>
            <div className={divStyle}>
                {[4, 5, 6].map((number) => (
                    <input className={buttonStyle(number)} type="button" value={number} onClick={() => handleOnClick(number.toString())} />
                ))}
            </div>
            <div className={divStyle}>
                {[7, 8, 9].map((number) => (
                    <input className={buttonStyle(number)} type="button" value={number} onClick={() => handleOnClick(number.toString())} />
                ))}
            </div>
            <div className={divStyle}>
                {[7, 8, 9].map((number) => (
                    <input className={buttonStyle(number)} type="button" value={number} onClick={() => handleOnClick(number.toString())} />
                ))}
            </div>
        </div>
    );
};

export default Numkeys;
