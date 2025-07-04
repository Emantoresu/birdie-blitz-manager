
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Import Link

export function ClubNightsHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Club Nights</h1>
        <p className="text-gray-600">Manage and schedule club activities</p>
      </div>
      <Link to="/club-nights/new"> {/* Wrap Button with Link */}
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Club Night
        </Button>
      </Link>
    </div>
  );
}
