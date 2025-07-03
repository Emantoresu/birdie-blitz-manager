
import { Calendar, Clock, Users, MapPin, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClubNight {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  description: string;
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  organizer: string;
}

interface ClubNightCardProps {
  night: ClubNight;
}

export function ClubNightCard({ night }: ClubNightCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming": return "bg-blue-100 text-blue-800";
      case "Ongoing": return "bg-green-100 text-green-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getParticipationStatus = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg mb-2">{night.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(night.status)}`}>
            {night.status}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600 text-sm">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date(night.date).toLocaleDateString()}
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Clock className="h-4 w-4 mr-2" />
          {night.time} ({night.duration})
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-2" />
          {night.location}
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Users className="h-4 w-4 mr-2" />
          <span className={getParticipationStatus(night.currentParticipants, night.maxParticipants)}>
            {night.currentParticipants}/{night.maxParticipants} participants
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-600 text-sm">{night.description}</p>
      </div>

      <div className="border-t pt-4 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Organizer:</span>
          <span className="font-semibold text-emerald-600">{night.organizer}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Participation</span>
          <span>{Math.round((night.currentParticipants / night.maxParticipants) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(night.currentParticipants / night.maxParticipants) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Eye className="h-3 w-3 mr-1" />
          View
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Edit className="h-3 w-3 mr-1" />
          Edit
        </Button>
        <Button variant="outline" size="sm" className="px-2">
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
