
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  chart?: boolean;
  chartData?: { value: number }[];
  chartColor?: string;
  icon?: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  chart = false,
  chartData = [],
  chartColor = "#9b87f5",
  icon,
  change,
  className,
}) => {
  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-md overflow-hidden relative h-full",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
            {change && (
              <div
                className={cn(
                  "text-xs font-medium mt-2 flex items-center",
                  change.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                <span className="mr-1">
                  {change.isPositive ? "↑" : "↓"}
                </span>
                {Math.abs(change.value).toFixed(1)}%
                <span className="text-muted-foreground ml-1 font-normal">
                  from previous
                </span>
              </div>
            )}
          </div>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>

        {chart && chartData.length > 0 && (
          <div className="h-16 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
