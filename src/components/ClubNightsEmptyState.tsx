
import { Calendar } from "lucide-react";

export function ClubNightsEmptyState() {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <Calendar className="h-16 w-16 mx-auto" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No club nights found</h3>
      <p className="text-gray-600">Try adjusting your search terms or filters.</p>
    </div>
  );
}
