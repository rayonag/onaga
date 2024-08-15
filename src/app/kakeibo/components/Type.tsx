import Image from "next/image";
import { FC, useState } from "react";
import { useSwiper } from "swiper/react";

type TypeProps = {
    type: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    incomeExpense: string;
};
const Type: FC<TypeProps> = ({ type, setType, incomeExpense }) => {
    const handleOnClick = (val: string) => {
        setType(val);
    };
    const [touched, setTouched] = useState<number | string>("");
    const buttonStyle = (val: string) => `${touched == val ? "bg-gray-300 " : val == type ? "bg-cyan-600 " : "bg-gray-400 "} m-3 w-24 h-24 text-white rounded-lg justify-center text-xl shadow-md transition-colors`;
    const divStyle = "flex flex-wrap justify-center items-center m-2";

    const incomeTypes = ["BFP Gift", "Offerings", "Other"];
    const expenseTypes = ["Grocery", "Daily", "Hang out", "Dating", "Apartment", "Transportation", "Studies", "Medical", "Offerings", "Other"];
    const nextButtonStyle = (num: number) => `${touched == num ? "bg-gray-300 " : "bg-cyan-600 "} mx-2 w-20 h-20 text-white rounded-full justify-center text-5xl shadow-md transition-colors`;
    const swiper = useSwiper();
    return (
        <div className={divStyle}>
            {incomeExpense == "Income" &&
                incomeTypes.map((type) => (
                    <div key={type}>
                        <button className={buttonStyle(type)} type="button" onTouchStart={() => setTouched(type)} onTouchEnd={() => setTouched("")} onClick={() => handleOnClick(type)}>
                            <Image height={0} width={75} alt={type} src={`/${type}.jpg`} />
                            <div className="text-sm">{type}</div>
                        </button>
                    </div>
                ))}
            {incomeExpense == "Expense" &&
                expenseTypes.map((type) => (
                    <div key={type}>
                        <button className={buttonStyle(type)} type="button" onTouchStart={() => setTouched(type)} onTouchEnd={() => setTouched("")} onClick={() => handleOnClick(type)}>
                            <Image height={0} width={75} alt={type} src={`/${type}.jpg`} />
                            <div className="text-sm">{type}</div>
                        </button>
                    </div>
                ))}
            <button className={nextButtonStyle(100)} type="button" onTouchStart={() => setTouched(100)} onTouchEnd={() => setTouched(-1)} onClick={() => swiper.slideNext()}>
                <div>→</div>
            </button>
        </div>
    );
};

export default Type;
