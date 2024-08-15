import Image from "next/image";
import { FC, MouseEvent, useState } from "react";

import { roboto_mono } from "@/app/fonts";
import Currency from "./Currency";
import { useSwiper } from "swiper/react";

type NumkeysProps = {
    amount: string;
    setAmount: React.Dispatch<React.SetStateAction<string>>;
    currency: string;
    setCurrency: React.Dispatch<React.SetStateAction<string>>;
};
const Numkeys: FC<NumkeysProps> = ({ amount, setAmount, currency, setCurrency }) => {
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
    const deleteButtonStyle = (num: number) => `${touched == num ? "bg-gray-300 " : ""} w-14 h-14 text-white rounded-full justify-center text-3xl transition-colors`;
    const nextButtonStyle = (num: number) => `${amount ? "" : "invisible"} ${touched == num ? "bg-gray-300 " : "bg-cyan-600 "} mx-2 w-20 h-20 text-white rounded-full justify-center text-5xl shadow-md transition-colors`;
    const divStyle = "flex justify-center m-2";
    const handleOnContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        return e;
    };
    const swiper = useSwiper();
    return (
        <div>
            <div className={`${roboto_mono.className} text-3xl`}>Enter Amount:</div>
            <div className={`${roboto_mono.className} text-4xl flex justify-center items-center mb-5`}>
                <div className="w-[20%]">
                    <Currency currency={currency} setCurrency={setCurrency} />
                </div>
                <div className="w-32">{amount || 0}</div>
                <div className={`w-[20%] ${amount ? "" : "invisible"}`}>
                    <button className={deleteButtonStyle(-3)} type="button" onTouchStart={() => setTouched(-3)} onTouchEnd={() => setTouched(-1)} onClick={() => handleOnClick("delete")}>
                        <Image width="70" height="70" className="rotate-180" alt="delete" src="/delete-icon-ios-12.jpg" onContextMenu={(e) => handleOnContextMenu(e)} />
                    </button>
                </div>
            </div>
            <div className={divStyle}>
                {[1, 2, 3].map((number) => (
                    <div key={number}>
                        <button className={buttonStyle(number)} type="button" onTouchStart={() => setTouched(number)} onTouchEnd={() => setTouched(-1)} onClick={() => handleOnClick(number.toString())}>
                            <div>{number}</div>
                            <div className={`${number == 1 ? "invisible " : ""}text-sm`}>{number == 1 ? "-" : number == 2 ? "ABC" : "DEF"}</div>
                        </button>
                    </div>
                ))}
            </div>
            <div className={divStyle}>
                {[4, 5, 6].map((number) => (
                    <div key={number}>
                        <button className={buttonStyle(number)} type="button" onTouchStart={() => setTouched(number)} onTouchEnd={() => setTouched(-1)} onClick={() => handleOnClick(number.toString())}>
                            <div>{number}</div>
                            <div className="text-sm">{number == 4 ? "GHI" : number == 5 ? "JKL" : "MNO"}</div>
                        </button>
                    </div>
                ))}
            </div>
            <div className={divStyle}>
                {[7, 8, 9].map((number) => (
                    <div key={number}>
                        <button className={buttonStyle(number)} type="button" onTouchStart={() => setTouched(number)} onTouchEnd={() => setTouched(-1)} onClick={() => handleOnClick(number.toString())}>
                            <div>{number}</div>
                            <div className="text-sm">{number == 7 ? "PQRS" : number == 8 ? "TUV" : "WXYZ"}</div>
                        </button>
                    </div>
                ))}
            </div>
            <div className={divStyle}>
                <div>
                    <button className={buttonStyle(-2)} type="button" onTouchStart={() => setTouched(0)} onTouchEnd={() => setTouched(-1)} onClick={() => handleOnClick(".")}>
                        <div>.</div>
                    </button>
                </div>
                <div>
                    <button className={buttonStyle(0)} type="button" onTouchStart={() => setTouched(0)} onTouchEnd={() => setTouched(-1)} onClick={() => handleOnClick("0")}>
                        <div>0</div>
                        <div className="text-sm invisible">-</div>
                    </button>
                </div>
                <div>
                    <button className={nextButtonStyle(100)} type="button" onTouchStart={() => setTouched(100)} onTouchEnd={() => setTouched(-1)} onClick={() => swiper.slideNext()}>
                        <div>→</div>
                    </button>
                </div>
                <div onContextMenu={(e) => handleOnContextMenu(e)}></div>
            </div>
        </div>
    );
};

export default Numkeys;
