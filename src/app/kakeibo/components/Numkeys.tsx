import Image from "next/image";
import { FC, MouseEvent, useState } from "react";

import { roboto_mono } from "@/app/fonts";

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
    const [touched, setTouched] = useState(-1);
    const buttonStyle = (num: number) => `${touched == num ? "bg-gray-300 " : "bg-stone-400 "} mx-2 w-20 h-20 text-white rounded-full justify-center text-5xl shadow-md transition-colors`;
    const divStyle = "flex justify-center m-2";
    const handleOnContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        return e;
    };
    return (
        <div>
            <div className={`${roboto_mono.className} text-3xl`}>Enter Amount:</div>
            <div className={`${roboto_mono.className} text-4xl`}>{amount || 0}</div>
            <div className={divStyle} onContextMenu={(e) => handleOnContextMenu(e)}>
                {[1, 2, 3].map((number) => (
                    <div key={number}>
                        <button className={buttonStyle(number)} type="button" onTouchStart={() => setTouched(number)} onTouchEnd={() => setTouched(-1)} onClick={() => handleOnClick(number.toString())}>
                            <div>{number}</div>
                            <div className={`${number == 1 ? "invisible " : ""}text-lg`}>{number == 1 ? "-" : number == 2 ? "ABC" : "DEF"}</div>
                        </button>
                    </div>
                ))}
            </div>
            <div className={divStyle} onContextMenu={(e) => handleOnContextMenu(e)}>
                {[4, 5, 6].map((number) => (
                    <div key={number}>
                        <button className={buttonStyle(number)} type="button" onTouchStart={() => setTouched(number)} onTouchEnd={() => setTouched(-1)} onClick={() => handleOnClick(number.toString())}>
                            <div>{number}</div>
                            <div className="text-lg">{number == 4 ? "GHI" : number == 5 ? "JKL" : "MNO"}</div>
                        </button>
                    </div>
                ))}
            </div>
            <div className={divStyle} onContextMenu={(e) => handleOnContextMenu(e)}>
                {[7, 8, 9].map((number) => (
                    <div key={number}>
                        <button className={buttonStyle(number)} type="button" onTouchStart={() => setTouched(number)} onTouchEnd={() => setTouched(-1)} onClick={() => handleOnClick(number.toString())}>
                            <div>{number}</div>
                            <div className="text-lg">{number == 7 ? "PQRS" : number == 8 ? "TUV" : "WXYZ"}</div>
                        </button>
                    </div>
                ))}
            </div>
            <div className={divStyle} onContextMenu={(e) => handleOnContextMenu(e)}>
                <div>
                    <button className={buttonStyle(-2)} type="button" onTouchStart={() => setTouched(0)} onTouchEnd={() => setTouched(-1)} onClick={() => handleOnClick(".")}>
                        <div>.</div>
                    </button>
                </div>
                <div>
                    <button className={buttonStyle(0)} type="button" onTouchStart={() => setTouched(0)} onTouchEnd={() => setTouched(-1)} onClick={() => handleOnClick("0")}>
                        <div>0</div>
                        <div className="text-lg invisible">-</div>
                    </button>
                </div>
                <div onContextMenu={(e) => handleOnContextMenu(e)}>
                    <button className={buttonStyle(-3)} type="button" onTouchStart={() => setTouched(-3)} onTouchEnd={() => setTouched(-1)} onClick={() => handleOnClick("delete")}>
                        <Image width="100" height="100" className="rotate-180" alt="delete" src="/delete-icon-ios-12.jpg" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Numkeys;
