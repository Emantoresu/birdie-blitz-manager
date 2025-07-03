
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatsCard({ title, value, change, icon: Icon, trend = "neutral", className }: StatsCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={cn(
              "text-sm font-medium mt-2",
              trend === "up" && "text-green-600",
              trend === "down" && "text-red-600",
              trend === "neutral" && "text-gray-600"
            )}>
              {change}
            </p>
          )}
        </div>
        <div className="ml-4">
          <div className="bg-emerald-100 p-3 rounded-full">
            <Icon className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
