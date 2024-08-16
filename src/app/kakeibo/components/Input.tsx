import { FC, useState } from "react";
import { roboto_mono } from "@/app/fonts";

type InputProps = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
};

const Input: FC<InputProps> = ({ value, setValue, placeholder }) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <label className="my-2 w-80 me-5 md:max-w-sm">
            <div className={`font-semibold text-2xl mb-1 transition duration-500 ${isFocused || value.length || "text-gray-400 translate-y-10"}`}>{placeholder}</div>
            <textarea rows={3} value={value} onChange={(e) => setValue(e.currentTarget.value)} className={"text-black border-b-2 py-2 px-3 bg-transparent focus:outline focus:outline-sky-500 focus:ring-4 focus:ring-sky-500/30"} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
        </label>
    );
};

export default Input;
