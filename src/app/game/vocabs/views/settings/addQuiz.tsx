import { memo, useEffect, useState } from "react";
import { getColorByType } from "../game/battle";
import CountUp from "react-countup";
import getWeak from "../../common/getWeak";
import toEng from "../../common/toEng";
import { useBoss, usePage, usePlayer } from "../../common/exports";

const AddQuiz = () => {
    const [score, setScore] = useState<number | null>(null);
    const [type, setType] = useState<string | null>(null);
    const [level, setLevel] = useState<string | null>(null);
    const [ratio, setRatio] = useState<number>(1.0);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [result, setResult] = useState<any>(null);
    const { player, setPlayer } = usePlayer();
    const { boss } = useBoss();
    const { page, setPage } = usePage();
    if (!setPage) return null;
    useEffect(() => {
        if (level) {
            switch (level) {
                case "א":
                    setRatio(1.0);
                    break;
                case "ב":
                    setRatio(1.2);
                    break;
                case "ג":
                    setRatio(1.4);
                    break;
            }
        }
    }, [level]);
    useEffect(() => {
        if (showResult) {
            // add quiz to beta/records
            //setShowResult(false);
        }
    }, [showResult]);
    const types = ["名", "動", "形", "他", "パ", "ピ", "ヒト", "ニフ"];
    const levels = ["א", "ב", "ג"];
    const handleAdd = async () => {
        if (!score || !type || !level) return alert("Make sure to enter all fields");
        if (score < 0 || score > 100) return;
        // add quiz to beta/records
        if (!window.confirm("Add this quiz result?")) return;
        setShowResult(true);
        const result = calcResult();
        setResult(result);
        await updateSupabase(result);
    };
    const updateSupabase = async (result: any) => {
        const updateObj = {};
        Object.keys(result).forEach((r) => {
            Object.assign(updateObj, { [toEng(r)]: parseInt(player[toEng(r)] || 0) + result[r] });
        });
        console.log("player", player);
        console.log("result", result);
        console.log("updateObj", updateObj);
        // update supabase
        //await supabase.from("player").update(updateObj).eq("id", 1);
        setPlayer({ ...player, ...updateObj });
    };

    const calcResult = () => {
        if (!score || !type || !level) return;
        const result = score * ratio;
        const currentBoss = boss?.find((b: any) => b.name == type); //edit
        const weak = currentBoss ? getWeak(currentBoss.type) : [];
        const typesCount = weak.length == 0 ? 0 : weak.length == 1 ? 1 : Math.floor(Math.random() * weak.length) + 1; // Random number between 1 and 49
        const splitNumber = (num: number) => {
            num = Math.ceil(num);
            console.log("num", num);
            const returnVal = {};
            const part1 = Math.floor(Math.random() * (num - 1)) + 1; // Random number between 1 and 49
            if (typesCount == 0) {
                Object.assign(returnVal, { ノーマル: num });
            } else if (typesCount > 0) {
                Object.assign(returnVal, { ノーマル: part1 });
                num -= part1;
                if (typesCount > 1) {
                    const part2 = Math.floor(Math.random() * (num - 1)) + 1; // Random number between 1 and 49
                    Object.assign(returnVal, { [weak[1]]: part2 });
                    num -= part2;
                    if (typesCount > 2) {
                        const part3 = Math.floor(Math.random() * (num - 1)) + 1; // Random number between 1 and 49
                        Object.assign(returnVal, { [weak[2]]: part3 });
                        num -= part3;
                        if (typesCount > 3) {
                            const part4 = Math.floor(Math.random() * (num - 1)) + 1; // Random number between 1 and 49
                            Object.assign(returnVal, { [weak[3]]: part4 });
                            num -= part4;
                            if (typesCount > 4) {
                                const part5 = Math.floor(Math.random() * (num - 1)) + 1; // Random number between 1 and 49
                                Object.assign(returnVal, { [weak[4]]: part5 });
                                num -= part5;
                            }
                        }
                    }
                }
                Object.assign(returnVal, { [weak[0]]: num });
            }

            return returnVal;
        };
        console.log("splitNumber(result)", splitNumber(result));
        return splitNumber(result);
    };
    const Result = memo(() => {
        return (
            <div className="flex flex-col justify-center">
                <div className="text-red-500 font-bold">GET!</div>
                <div className="flex justify-center">
                    {result ? (
                        Object.keys(result).map((r) => (
                            <div className={`m-1 p-3 rounded-full w-40 ${getColorByType(r)}`}>
                                {r}: (<CountUp end={result[r]} />)
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
                <div className="btn-theme" onClick={() => setPage("settings")}>
                    Back
                </div>
            </div>
        );
    });
    useEffect(() => {
        setShowResult(false);
    }, [type, level, score]);
    return (
        <div className="h-screen flex flex-col justify-center items-center text-center">
            <select value={type || ""} onChange={(e) => setType(e.currentTarget.value)} className="w-40 max-w-[80%] p-2 m-2 text-xl rounded-full">
                <option value="" disabled>
                    Type
                </option>
                {types.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            <select value={level || ""} onChange={(e) => setLevel(e.currentTarget.value)} className="w-40 max-w-[80%] p-2 m-2 text-xl rounded-full">
                <option value="" disabled>
                    Level
                </option>
                {levels.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            <div>
                <input
                    value={score || ""}
                    onChange={(e) => {
                        if (parseInt(e.currentTarget.value) > 100) return;
                        setScore(parseInt(e.currentTarget.value));
                    }}
                    className="w-40 max-w-[80%] m-2 p-2 rounded-full text-xl text-center"
                    type="number"
                    inputMode="numeric"
                    placeholder="Enter Score"
                />
                <span className="absolute h-5 w-8">×{ratio.toFixed(1)}</span>
            </div>
            <div className="btn-theme text-lg" onClick={handleAdd}>
                Add Quiz Result
            </div>
            {showResult && <Result />}
        </div>
    );
};
export default AddQuiz;
