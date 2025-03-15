import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { navStatements, formatDate } from "@/utils/mockData";
import AmountDisplay from "@/components/AmountDisplay";

const NAVSection = () => {
  const navData = navStatements.map(statement => ({
    period: statement.period,
    date: formatDate(statement.date),
    navPerUnit: statement.navPerUnit,
    totalNav: statement.totalNav
  }));

  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground mt-1">
            NAV per Unit: <span className="font-medium text-foreground">
              <AmountDisplay amount={payload[0].value as number} fullDisplay={true} />
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value: number) => {
    if (value < 10000) {
      return `₹ ${value}`;
    }
    const valueInCrores = value / 10000000;
    return `₹ ${valueInCrores.toFixed(2)} Cr`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-[#4B2E83]">NAV</CardTitle>
        <CardDescription>Your investment's NAV per unit over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={navData}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="period" 
                tick={{ fontSize: 12 }} 
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis 
                domain={['auto', 'auto']}
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
                width={80}
                tickFormatter={formatYAxis}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="navPerUnit" 
                stroke="#43A66A" 
                strokeWidth={2} 
                dot={{ r: 4, strokeWidth: 2, fill: "white", stroke: "#43A66A" }}
                activeDot={{ r: 6, strokeWidth: 2, fill: "#43A66A", stroke: "white" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {navData.slice(-3).map((item, index) => (
            <div key={index} className="bg-muted/30 rounded-md p-3">
              <p className="text-sm font-medium">{item.period}</p>
              <p className="text-lg font-bold mt-1">
                <AmountDisplay amount={item.navPerUnit} />
              </p>
              <p className="text-xs text-muted-foreground">{item.date}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NAVSection;
