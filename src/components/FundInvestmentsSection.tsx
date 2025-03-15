
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { fundInvestments } from "@/utils/mockData";
import AmountDisplay, { formatAmountInCrores } from "@/components/AmountDisplay";

const FundInvestmentsSection = () => {
  const data = fundInvestments.map(investment => ({
    name: investment.name,
    value: investment.amount,
    color: investment.color
  }));

  const RADIAN = Math.PI / 180;
  
  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent, 
    index 
  }: { 
    cx: number; 
    cy: number; 
    midAngle: number; 
    innerRadius: number; 
    outerRadius: number; 
    percent: number; 
    index: number; 
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-md text-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-xs mt-1">
            <AmountDisplay amount={payload[0].value} fullDisplay={true} />
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-[#4B2E83]">Fund Investments</CardTitle>
        <CardDescription>Breakdown of investments made by the fund</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || "#43A66A"} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {fundInvestments.map((investment) => (
            <div key={investment.id} className="border rounded-md p-3">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: investment.color || "#43A66A" }}
                ></div>
                <span className="font-medium text-sm">{investment.name}</span>
              </div>
              <div className="mt-1">
                <AmountDisplay amount={investment.amount} className="text-sm" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FundInvestmentsSection;
