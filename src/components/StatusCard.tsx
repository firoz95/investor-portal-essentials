
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cva, type VariantProps } from "class-variance-authority";

const statusCardVariants = cva(
  "transition-all duration-300 hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-card border-border",
        primary: "bg-primary/5 border-primary/20",
        success: "bg-green-50 border-green-200",
        warning: "bg-amber-50 border-amber-200",
        danger: "bg-red-50 border-red-200",
        info: "bg-blue-50 border-blue-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatusCardProps extends VariantProps<typeof statusCardVariants> {
  title: string;
  value: string | number | React.ReactNode;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  subtitle?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon,
  trend,
  variant,
  className,
  subtitle,
}) => {
  return (
    <Card className={cn(statusCardVariants({ variant }), className, "overflow-hidden")}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="opacity-70">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className={cn(
            "text-xs font-medium mt-2 flex items-center",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            <span className="inline-block mr-1">
              {trend.isPositive ? "↑" : "↓"}
            </span>
            {Math.abs(trend.value).toFixed(2)}%
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusCard;
