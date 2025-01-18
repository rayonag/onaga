import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useBoss } from "../../common/contexts";
import supabase from "@/supabase";
import Star from "./Star";

const LineChartForWeek = () => {
    const [data, setData] = useState<any>([]);
    const { boss } = useBoss();
    const [quiz, setQuiz] = useState<any>([]);
    const [graphData, setGraphData] = useState<any>([]);
    const [presentBoss, setPresentBoss] = useState<any>([]);
    useEffect(() => {
        if (!boss) return;
        setPresentBoss(boss.filter((b: any) => new Date(b.due) > new Date()));
    }, [boss]);
    useEffect(() => {
        (async () => {
            if (!data || !boss || !quiz) return;
            // filter out the bosses/quiz that are not current
            const noQuiz = quiz.filter((q: any) => {
                return (
                    Object.keys(q).findIndex((key) => {
                        if (key == "due" || key == "id" || key == "Sat") return false;
                        return q[key] > 0;
                    }) == -1
                );
            });
            let newGraphData = data.map((d: any, index: number) => {
                Object.keys(d).forEach((key) => {
                    if (key === "day") return;
                    const this_boss = boss.find((g: any) => g.id === parseInt(key));
                    if (!this_boss) return;
                    //if (key == "8") debugger;
                    const this_quiz = quiz.find((q: any) => q.id == key);
                    // get ratio
                    if (d[key] === null) {
                        if (noQuiz.findIndex((q: any) => q.id == key) > -1) {
                            // delete from obj
                            delete d[key];
                        } else if (
                            // if there's any entry for the week
                            this_quiz &&
                            Object.keys(this_quiz).findIndex((q: any) => {
                                if (q == "due" || q == "id" || (q == "Sat" && this_quiz[q] == boss.find((b: any) => b.id == key).maxHp)) return false;
                                return this_quiz[q] > 0;
                            }) > -1
                        ) {
                            // Define the order of days
                            const daysOrder = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
                            const currentDayIndex = daysOrder.indexOf(d["day"]);

                            // Search for any entry after the current day
                            const nextEntryDay = daysOrder.slice(currentDayIndex + 1).find((day) => this_quiz[day] > 0);

                            if (nextEntryDay) {
                                // If there's any entry after the current day, look for the closest existing value from the entry before that day
                                const previousEntryDay = daysOrder
                                    .slice(0, currentDayIndex)
                                    .reverse()
                                    .find((day) => this_quiz[day] > 0);

                                if (previousEntryDay) {
                                    const previousValue = data.find((dd: any) => dd.day == previousEntryDay)[key];
                                    d[key] = previousValue;
                                }
                            }
                        }
                        return;
                    }
                    d[key] = (d[key] / this_boss.maxHp) * 100 >= 0 ? Math.round(100 - (d[key] / this_boss.maxHp) * 100) : 0;
                });
                return d;
            });
            // newGraphData = newGraphData.filter((d: any, index: number) => {
            //     return noQuiz.findIndex((q: any) => q.id == index) == -1;
            // });
            setGraphData(newGraphData);
        })();
    }, [data, quiz, boss]);
    console.log("graphData", graphData);
    useEffect(() => {
        (async () => {
            const { data: quiz, error } = await supabase.from("quiz").select("*");
            setQuiz(quiz);
        })();
    }, []);
    useEffect(() => {
        if (!boss) return;
        const data = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => {
            let returnObj: any = {};
            quiz.forEach((q: any) => {
                returnObj[q.id] = q[day];
            });
            returnObj.day = day;
            return returnObj;
        });
        setData(data);
    }, [boss, quiz]);
    // array of colors for the graph, 18
    const colors = ["#8884d8", "#82ca9d", "#ff7300", "#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#00ffff", "#ffff00", "#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#00ffff", "#ffff00", "#ff0000", "#00ff00", "#ff00ff"];

    const CustomizedDot = (props: any) => {
        const { cx, cy, stroke, payload, value } = props;
        if (!value) return null;
        if (value < 100) return <circle cx={cx} cy={cy} r={2.5} fill={stroke} />;

        return <Star x={cx - 10} y={cy - 10} color={stroke} />;
    };
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={500} height={500} data={graphData} margin={{ top: 10, right: 30, left: -10, bottom: 5 }}>
                <>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="day" domain={["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    {presentBoss.map((b: any) => {
                        return <Line type="monotone" dot={<CustomizedDot />} strokeWidth={1.6} isAnimationActive={false} name={b.name} dataKey={b.id} stroke={colors[b.id - 1]} />;
                    })}
                </>
            </LineChart>
        </ResponsiveContainer>
    );
};
export default LineChartForWeek;
