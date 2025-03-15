
import React from "react";
import { AlertTriangle, InfoIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate, drawdownNotices } from "@/utils/mockData";

const NotificationsSection = () => {
  // Filter pending drawdown notices
  const pendingNotices = drawdownNotices.filter(notice => notice.status === "Pending");
  
  if (pendingNotices.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-6">
      {pendingNotices.map((notice) => (
        <Card 
          key={notice.id} 
          className="bg-red-50 border-red-200 mb-4 last:mb-0"
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-red-100 p-2 rounded-full mt-1">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-red-800">
                  Capital Call Due: {formatDate(notice.dueDate)}
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  Please arrange for a payment of {formatCurrency(notice.amount)} ({notice.percentage}% of your commitment).
                </p>
                <div className="mt-2 flex items-center">
                  <InfoIcon className="h-4 w-4 text-red-600 mr-1" />
                  <span className="text-xs text-red-700">
                    Please ensure the payment is made on or before the due date to avoid any penalties.
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NotificationsSection;
