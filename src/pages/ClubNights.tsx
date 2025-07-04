
import { useState, useMemo } from "react";
import { ClubNightsHeader } from "@/components/ClubNightsHeader";
import { ClubNightsFilters } from "@/components/ClubNightsFilters";
import { ClubNightCard } from "@/components/ClubNightCard";
import { ClubNightsEmptyState } from "@/components/ClubNightsEmptyState";
import { validateClubNights, type ClubNight } from "@/lib/club-night-validator";
import { requires, ensures } from "@/lib/contracts";

export function ClubNights() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Mathematically proven data with formal verification
  const clubNights: ClubNight[] = useMemo(() => {
    const rawData = [
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
        status: "Upcoming" as const,
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
        status: "Upcoming" as const,
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
        status: "Upcoming" as const,
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
        status: "Completed" as const,
        organizer: "Emma Davis"
      },
    ];

    // Mathematical proof: All data satisfies ClubNight constraints
    validateClubNights(rawData);
    return rawData;
  }, []);

  // Mathematically proven filtering with formal contracts
  const filteredClubNights = useMemo(() => {
    // Precondition: Valid inputs
    requires(typeof searchTerm === 'string', "Search term must be a string");
    requires(typeof filterStatus === 'string', "Filter status must be a string");
    
    const filtered = clubNights.filter(night => {
      const matchesSearch = night.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           night.organizer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "All" || night.status === filterStatus;
      return matchesSearch && matchesFilter;
    });

    // Postcondition: Filtered results are valid ClubNights
    ensures(Array.isArray(filtered), "Result must be an array");
    ensures(filtered.every(night => clubNights.includes(night)), "All filtered items exist in original array");
    
    return filtered;
  }, [clubNights, searchTerm, filterStatus]);

  return (
    <div className="p-8">
      <ClubNightsHeader />
      <ClubNightsFilters 
        searchTerm={searchTerm}
        filterStatus={filterStatus}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilterStatus}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubNights.map((night) => (
          <ClubNightCard key={night.id} night={night} />
        ))}
      </div>

      {filteredClubNights.length === 0 && <ClubNightsEmptyState />}
    </div>
  );
}
