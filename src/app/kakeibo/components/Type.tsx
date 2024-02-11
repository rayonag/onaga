import Image from "next/image";
import { FC, useState } from "react";

type TypeProps = {
    type: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    incomeExpense: string;
};
const Type: FC<TypeProps> = ({ type, setType, incomeExpense }) => {
    const handleOnClick = (val: string) => {
        setType(val);
    };
    const [touched, setTouched] = useState("");
    const buttonStyle = (val: string) => `${touched == val ? "bg-gray-300 " : val == type ? "bg-cyan-600 " : "bg-gray-400 "} m-3 w-28 h-28 text-white rounded-lg justify-center text-4xl shadow-md transition-colors`;
    const divStyle = "flex flex-wrap justify-center m-2";

    const incomeTypes = ["BFP Gift", "Offerings", "Other"];
    const expenseTypes = ["Grocery", "Daily", "Hang out", "Dating", "Apartment", "Transportation", "Studies", "Medical", "Offerings", "Other"];
    return (
        <div className={divStyle}>
            {incomeExpense == "Income" &&
                incomeTypes.map((type) => (
                    <div key={type}>
                        <button className={buttonStyle(type)} type="button" onTouchStart={() => setTouched(type)} onTouchEnd={() => setTouched("")} onClick={() => handleOnClick(type)}>
                            <Image height={0} width={80} alt={type} src={`/${type}.jpg`} />
                            <div className="text-2xl">{type}</div>
                        </button>
                    </div>
                ))}
            {incomeExpense == "Expense" &&
                expenseTypes.map((type) => (
                    <div key={type}>
                        <button className={buttonStyle(type)} type="button" onTouchStart={() => setTouched(type)} onTouchEnd={() => setTouched("")} onClick={() => handleOnClick(type)}>
                            <Image height={0} width={130} alt={type} src={`/${type}.jpg`} />
                            <div className="text-2xl">{type}</div>
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default Type;
