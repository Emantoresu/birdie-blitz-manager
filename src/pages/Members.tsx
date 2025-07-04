
import { useState } from "react";
import DOMPurify from 'dompurify';
import { Search, Plus, Phone, Mail, MapPin, Filter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  membershipType: "Basic" | "Premium" | "VIP";
  joinDate: string;
  avatar: string;
  status: "Active" | "Inactive";
  gamesPlayed: number;
  location: string;
}

export function Members() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Sanitize search term before using it
  const sanitizedSearchTerm = DOMPurify.sanitize(searchTerm);

  const members: Member[] = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 234 567 8900",
      membershipType: "Premium",
      joinDate: "2024-01-15",
      avatar: "JS",
      status: "Active",
      gamesPlayed: 48,
      location: "Downtown"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+1 234 567 8901",
      membershipType: "VIP",
      joinDate: "2023-11-20",
      avatar: "SW",
      status: "Active",
      gamesPlayed: 72,
      location: "Uptown"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+1 234 567 8902",
      membershipType: "Basic",
      joinDate: "2024-02-01",
      avatar: "MJ",
      status: "Active",
      gamesPlayed: 23,
      location: "Midtown"
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@email.com",
      phone: "+1 234 567 8903",
      membershipType: "Premium",
      joinDate: "2023-12-10",
      avatar: "ED",
      status: "Inactive",
      gamesPlayed: 35,
      location: "Downtown"
    },
  ];

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(sanitizedSearchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(sanitizedSearchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || member.membershipType === filterType;
    return matchesSearch && matchesFilter;
  });

  const getMembershipColor = (type: string) => {
    switch (type) {
      case "Basic": return "bg-gray-100 text-gray-800";
      case "Premium": return "bg-blue-100 text-blue-800";
      case "VIP": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Members</h1>
          <p className="text-gray-600">Manage your badminton club members</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search members by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="All">All Members</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-emerald-600 font-bold text-lg">{member.avatar}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <div className="flex gap-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMembershipColor(member.membershipType)}`}>
                    {member.membershipType}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                    {member.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600 text-sm">
                <Mail className="h-4 w-4 mr-2" />
                {member.email}
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Phone className="h-4 w-4 mr-2" />
                {member.phone}
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                {member.location}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Games Played:</span>
                <span className="font-semibold text-emerald-600">{member.gamesPlayed}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">Member Since:</span>
                <span className="font-semibold">{new Date(member.joinDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1">
                Edit
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                View Profile
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Users className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No members found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  );
}
