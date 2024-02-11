import { FC, useState } from "react";
import { roboto_mono } from "@/app/fonts";

type InputProps = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
};

const Input: FC<InputProps> = ({ value, setValue, placeholder }) => {
    const divStyle = "flex justify-center my-2";

    return (
        <div className={divStyle}>
            <input placeholder={placeholder} defaultValue={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    );
};

export default Input;
