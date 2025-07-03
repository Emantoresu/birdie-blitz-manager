
import { Users, Calendar, Trophy, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";

export function Dashboard() {
  const stats = [
    {
      title: "Total Members",
      value: 142,
      change: "+12 this month",
      icon: Users,
      trend: "up" as const,
    },
    {
      title: "Active Bookings",
      value: 28,
      change: "6 today",
      icon: Calendar,
      trend: "up" as const,
    },
    {
      title: "Tournaments",
      value: 3,
      change: "2 upcoming",
      icon: Trophy,
      trend: "neutral" as const,
    },
    {
      title: "Court Utilization",
      value: "87%",
      change: "+5% from last week",
      icon: TrendingUp,
      trend: "up" as const,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "booking",
      user: "John Smith",
      action: "booked Court 1",
      time: "2 hours ago",
      avatar: "JS",
    },
    {
      id: 2,
      type: "tournament",
      user: "Sarah Wilson",
      action: "registered for Spring Championship",
      time: "4 hours ago",
      avatar: "SW",
    },
    {
      id: 3,
      type: "member",
      user: "Mike Johnson",
      action: "joined the club",
      time: "1 day ago",
      avatar: "MJ",
    },
    {
      id: 4,
      type: "booking",
      user: "Emma Davis",
      action: "cancelled Court 3 booking",
      time: "2 days ago",
      avatar: "ED",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Weekly Mixed Doubles",
      date: "Today, 7:00 PM",
      participants: 16,
      court: "Courts 1-2",
    },
    {
      id: 2,
      title: "Beginner Training Session",
      date: "Tomorrow, 6:00 PM",
      participants: 8,
      court: "Court 3",
    },
    {
      id: 3,
      title: "Spring Championship",
      date: "Next Saturday, 9:00 AM",
      participants: 32,
      court: "All Courts",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at your badminton club.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold text-sm">{activity.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">
                    <span className="text-emerald-600">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{event.date}</span>
                  <span>{event.participants} participants</span>
                </div>
                <p className="text-sm text-emerald-600 mt-1">{event.court}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-lg transition-colors shadow-lg hover:shadow-xl">
            <Calendar className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Book a Court</h3>
            <p className="text-sm opacity-90">Reserve court time</p>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors shadow-lg hover:shadow-xl">
            <Users className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Add Member</h3>
            <p className="text-sm opacity-90">Register new member</p>
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors shadow-lg hover:shadow-xl">
            <Trophy className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Create Event</h3>
            <p className="text-sm opacity-90">Organize tournament</p>
          </button>
        </div>
      </div>
    </div>
  );
}
