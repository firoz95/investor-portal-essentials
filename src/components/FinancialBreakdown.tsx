
import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, TooltipProps } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

interface FinancialBreakdownProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  title: string;
  description?: string;
  formatValue?: (value: number) => string;
  className?: string;
  height?: number;
}

const CustomTooltip = ({ 
  active, 
  payload, 
  label,
  formatter
}: TooltipProps<ValueType, NameType> & { formatter?: (value: number) => string }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value as number;
    const displayValue = formatter ? formatter(value) : value;
    
    return (
      <div className="bg-background border border-border p-3 rounded-md shadow-md">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-sm text-muted-foreground mt-1">
          <span className="font-medium text-foreground">{displayValue}</span>
        </p>
      </div>
    );
  }

  return null;
};

const FinancialBreakdown: React.FC<FinancialBreakdownProps> = ({ 
  data, 
  title, 
  description, 
  formatValue = (value) => `$${value.toLocaleString()}`,
  className,
  height = 300
}) => {
  // Map data to include a color if not provided
  const coloredData = data.map((item, index) => {
    if (!item.color) {
      const colors = ["#9b87f5", "#6E59A5", "#D6BCFA", "#FEC6A1", "#D3E4FD"];
      return {
        ...item,
        color: colors[index % colors.length]
      };
    }
    return item;
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height={height}>
            <BarChart
              data={coloredData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis 
                dataKey="name"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
              />
              <YAxis 
                tickFormatter={(value) => `$${(value / 1000)}k`}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
                width={60}
              />
              <Tooltip content={<CustomTooltip formatter={formatValue} />} />
              <Legend formatter={(value) => <span className="text-sm">{value}</span>} />
              <Bar 
                dataKey="value" 
                name="Amount" 
                radius={[4, 4, 0, 0]}
                barSize={30}
                isAnimationActive={true}
                animationBegin={300}
                animationDuration={1000}
                animationEasing="ease-out"
              >
                {coloredData.map((entry, index) => (
                  <Bar 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialBreakdown;
