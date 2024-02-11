import Image from "next/image";
import { FC, useState } from "react";

type TypeProps = {
    type: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
};
const Type: FC<TypeProps> = ({ type, setType }) => {
    const handleOnClick = (val: string) => {
        setType(val);
    };
    const [touched, setTouched] = useState("");
    const buttonStyle = (val: string) => `${touched == val ? "bg-gray-300 " : val == type ? "bg-cyan-600 " : "bg-gray-400 "} mr-3 w-10 h-10 text-white rounded-full justify-center text-4xl shadow-md transition-colors`;
    const divStyle = "flex justify-center m-2";

    const allTypes = ["Grocery", "Daily", "Hang out", "Dating", "Apartment", "Transportation", "Studies", "Medical", "BFP Gift", "Offerings", "Other"];

    return (
        <div className={divStyle}>
            {allTypes.map((type) => (
                <div key={type}>
                    <button className={buttonStyle(type)} type="button" onTouchStart={() => setTouched(type)} onTouchEnd={() => setTouched("")} onClick={() => handleOnClick(type)}>
                        <Image height={200} width={200} alt={type} src={`/${type}.jpg`} />
                        <div>{type}</div>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Type;
