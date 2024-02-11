import { FC } from "react";

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
    const buttonStyle = "w-16 h-16 text-white bg-stone-400 rounded-full flex items-center justify-center text-4xl shadow-md focus:bg-gray-300 transition-colors";

    return (
        <>
            <div className="flex">
                {[1, 2, 3].map((number) => (
                    <input className={buttonStyle} type="button" value={number} onClick={() => handleOnClick(number.toString())} />
                ))}
                <input className=" " type="button" value="2" onClick={() => handleOnClick("2")} />
                <input type="button" value="delete" onClick={() => handleOnClick("delete")} />
                <div className="">hello wll</div>
            </div>
        </>
    );
};

export default Numkeys;
