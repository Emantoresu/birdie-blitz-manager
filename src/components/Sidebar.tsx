
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  Trophy, 
  BarChart3, 
  Home, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Members", href: "/members", icon: Users },
  { name: "Court Booking", href: "/booking", icon: Calendar },
  { name: "Events", href: "/events", icon: Trophy },
  { name: "Statistics", href: "/statistics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "bg-gradient-to-b from-emerald-900 to-emerald-800 text-white transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-emerald-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-emerald-300" />
              <div>
                <h1 className="text-xl font-bold">BadmintonPro</h1>
                <p className="text-emerald-300 text-sm">Club Management</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-emerald-600 text-white shadow-lg" 
                      : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span className="font-medium">{item.name}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-emerald-700">
          <div className="text-center text-emerald-300 text-sm">
            <p>© 2024 BadmintonPro</p>
            <p>Version 1.0</p>
          </div>
        </div>
      )}
    </div>
  );
}
