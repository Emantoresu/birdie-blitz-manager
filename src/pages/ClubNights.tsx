
import { useState } from "react";
import { Calendar, Clock, Users, MapPin, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export function ClubNights() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const clubNights: ClubNight[] = [
    {
      id: 1,
      title: "Weekly Training Session",
      date: "2024-07-10",
      time: "19:00",
      duration: "2 hours",
      location: "Court 1 & 2",
      maxParticipants: 20,
      currentParticipants: 16,
      description: "Regular training session focusing on doubles play and technique improvement.",
      status: "Upcoming",
      organizer: "John Smith"
    },
    {
      id: 2,
      title: "Beginners Workshop",
      date: "2024-07-12",
      time: "18:30",
      duration: "1.5 hours",
      location: "Court 3",
      maxParticipants: 12,
      currentParticipants: 8,
      description: "Introduction to badminton basics for new members.",
      status: "Upcoming",
      organizer: "Sarah Wilson"
    },
    {
      id: 3,
      title: "Monthly Tournament",
      date: "2024-07-15",
      time: "10:00",
      duration: "4 hours",
      location: "All Courts",
      maxParticipants: 32,
      currentParticipants: 28,
      description: "Monthly singles and doubles tournament with prizes.",
      status: "Upcoming",
      organizer: "Mike Johnson"
    },
    {
      id: 4,
      title: "Social Night",
      date: "2024-07-05",
      time: "19:30",
      duration: "2.5 hours",
      location: "Court 1 & 2",
      maxParticipants: 24,
      currentParticipants: 22,
      description: "Casual games and social gathering with refreshments.",
      status: "Completed",
      organizer: "Emma Davis"
    },
  ];

  const filteredClubNights = clubNights.filter(night => {
    const matchesSearch = night.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         night.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || night.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Club Nights</h1>
          <p className="text-gray-600">Manage and schedule club activities</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Club Night
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search club nights by title or organizer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="All">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Club Nights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubNights.map((night) => (
          <div key={night.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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

            {/* Progress Bar */}
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
        ))}
      </div>

      {filteredClubNights.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No club nights found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  );
}
