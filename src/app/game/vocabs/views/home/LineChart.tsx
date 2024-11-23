import React, { PureComponent, useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useBoss } from "../../common/contexts";
import { DateTime } from "luxon";
import supabase from "@/supabase";

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
            const noQuiz = quiz.filter((q: any) => {
                return (
                    Object.keys(q).findIndex((key) => {
                        if (key == "due" || key == "id") return false;
                        return q[key] > 0;
                    }) == -1
                );
            });
            let newGraphData = data.map((d: any, index: number) => {
                Object.keys(d).forEach((key) => {
                    if (key === "day") return;
                    const this_boss = boss.find((g: any) => g.id === parseInt(key));
                    if (!this_boss) return;
                    // get ratio
                    if (d[key] === null) {
                        if (noQuiz.findIndex((q: any) => q.id == index) == -1) {
                            // delete from obj
                            delete d[key];
                        }
                        return;
                    }
                    d[key] = (d[key] / this_boss.maxHp) * 100 > 0 ? 100 - (d[key] / this_boss.maxHp) * 100 : 0;
                });
                return d;
            });
            newGraphData = newGraphData.filter((d: any, index: number) => {
                return noQuiz.findIndex((q: any) => q.id == index) == -1;
            });
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
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={500}
                data={graphData}
                margin={{
                    top: 20,
                    left: -20,
                    bottom: 20,
                }}
            >
                <>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="day" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    {/* <Line type="monotone" dataKey="maxHp" stroke="#8884d8" /> */}
                    {presentBoss.map((b: any) => {
                        return <Line type="monotone" name={b.name} dataKey={b.id} stroke={colors[b.id - 1]} />;
                    })}
                    {/* <Line type="monotone" dataKey="1" stroke="#8884d8" />
                    <Line type="monotone" dataKey="2" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="3" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="4" stroke="#82ca9d" />

                    <Line type="monotone" dataKey="5" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="6" stroke="#82ca9d" />
      
                    <Line type="monotone" dataKey="7" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="8" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="9" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="10" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="11" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="12" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="13" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="14" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="15" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="16" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="17" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="18" stroke="#82ca9d" /> */}
                </>
            </LineChart>
        </ResponsiveContainer>
    );
};
export default LineChartForWeek;
