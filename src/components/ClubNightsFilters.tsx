
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ClubNightsFiltersProps {
  searchTerm: string;
  filterStatus: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

export function ClubNightsFilters({ 
  searchTerm, 
  filterStatus, 
  onSearchChange, 
  onFilterChange 
}: ClubNightsFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search club nights by title or organizer..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => onFilterChange(e.target.value)}
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
  );
}
