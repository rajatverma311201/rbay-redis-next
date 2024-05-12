"use client";

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Bid } from "types";
const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 4567, amt: 2400 },
    { name: "Page C", uv: 300, pv: 1398, amt: 2400 },
    { name: "Page D", uv: 200, pv: 9800, amt: 2400 },
    { name: "Page E", uv: 278, pv: 3908, amt: 2400 },
    { name: "Page F", uv: 189, pv: 4800, amt: 2400 },
];

interface BidHistoryChartProps {
    data: Bid[];
}

export const BidHistoryChart: React.FC<BidHistoryChartProps> = ({ data }) => {
    let minAmt = data[0].amount;

    const dataModified = data.map((bid) => {
        minAmt = Math.min(minAmt, bid.amount);

        return {
            createdAt: new Date(bid.createdAt).toLocaleString(),
            amount: bid.amount,
        };
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle> Bid History </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        // width={600}
                        // height={500}
                        data={dataModified}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                        <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="#2563eb"
                            width={5}
                            className="stroke-primary"
                        />
                        <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
                        <XAxis
                            hide={true}
                            // className="hidden"
                            angle={90}
                            dataKey={"createdAt"}
                        />
                        <YAxis
                            dataKey={"amount"}
                            type="number"
                            domain={["dataMin", "dataMax"]}
                            tickCount={Math.min(10, data.length)}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: "7.5px",
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
            <CardFooter />
        </Card>
    );
};
