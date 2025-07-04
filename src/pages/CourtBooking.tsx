
import { useState } from "react";
import { Calendar, Clock, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Booking {
  id: number;
  court: string;
  time: string;
  date: string;
  member: string;
  duration: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

export function CourtBooking() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [dateError, setDateError] = useState<string | null>(null);
  
  const courts = ["Court 1", "Court 2", "Court 3", "Court 4"];
  const timeSlots = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00"
  ];

  const bookings: Booking[] = [
    {
      id: 1,
      court: "Court 1",
      time: "09:00",
      date: selectedDate,
      member: "John Smith",
      duration: "1 hour",
      status: "Confirmed"
    },
    {
      id: 2,
      court: "Court 2",
      time: "10:00",
      date: selectedDate,
      member: "Sarah Wilson",
      duration: "2 hours",
      status: "Confirmed"
    },
    {
      id: 3,
      court: "Court 1",
      time: "14:00",
      date: selectedDate,
      member: "Mike Johnson",
      duration: "1 hour",
      status: "Pending"
    },
  ];

  const isSlotBooked = (court: string, time: string) => {
    return bookings.some(booking => 
      booking.court === court && 
      booking.time === time && 
      booking.date === selectedDate &&
      booking.status !== "Cancelled"
    );
  };

  const getBookingForSlot = (court: string, time: string) => {
    return bookings.find(booking => 
      booking.court === court && 
      booking.time === time && 
      booking.date === selectedDate &&
      booking.status !== "Cancelled"
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-800 border-green-200";
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Court Booking</h1>
          <p className="text-gray-600">Manage court reservations and schedule</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex items-center gap-4">
          <Calendar className="h-5 w-5 text-emerald-600" />
          <label htmlFor="date" className="font-semibold text-gray-900">Select Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            min={today} // Prevent selecting past dates
            onChange={(e) => {
              const newDate = e.target.value;
              if (newDate < today) {
                setDateError("Cannot select a past date.");
                setSelectedDate(today); // Optionally reset to today or keep invalid date and show error
              } else {
                setDateError(null);
                setSelectedDate(newDate);
              }
            }}
            className={`px-3 py-2 border rounded-lg focus:ring-2 focus:border-emerald-500 ${dateError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'}`}
          />
          {dateError && <p className="text-red-500 text-xs ml-2">{dateError}</p>}
          <span className="text-gray-600 ml-4">
            {new Date(selectedDate).toLocaleDateString('en-US', { // Ensure selectedDate is valid for this formatting
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>

      {/* Court Schedule Grid */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-emerald-600" />
            Court Schedule
          </h2>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header */}
            <div className="grid grid-cols-5 gap-px bg-gray-200">
              <div className="bg-gray-50 p-4 font-semibold text-gray-900">Time</div>
              {courts.map(court => (
                <div key={court} className="bg-gray-50 p-4 font-semibold text-gray-900 text-center">
                  <MapPin className="h-4 w-4 inline mr-1 text-emerald-600" />
                  {court}
                </div>
              ))}
            </div>

            {/* Time slots */}
            {timeSlots.map(time => (
              <div key={time} className="grid grid-cols-5 gap-px bg-gray-200">
                <div className="bg-white p-4 font-medium text-gray-700 border-r">
                  {time}
                </div>
                {courts.map(court => {
                  const booking = getBookingForSlot(court, time);
                  const isBooked = isSlotBooked(court, time);
                  
                  return (
                    <div key={`${court}-${time}`} className="bg-white p-2 min-h-[80px]">
                      {isBooked && booking ? (
                        <div className={`p-3 rounded-lg border-2 h-full ${getStatusColor(booking.status)}`}>
                          <div className="font-semibold text-sm">{booking.member}</div>
                          <div className="text-xs mt-1">{booking.duration}</div>
                          <div className="text-xs mt-1 capitalize">{booking.status}</div>
                        </div>
                      ) : (
                        <button className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-colors flex items-center justify-center text-gray-400 hover:text-emerald-600">
                          <Plus className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Bookings Summary */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Bookings Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">{bookings.filter(b => b.status === "Confirmed").length}</div>
            <div className="text-emerald-700 font-medium">Confirmed Bookings</div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{bookings.filter(b => b.status === "Pending").length}</div>
            <div className="text-yellow-700 font-medium">Pending Bookings</div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((bookings.filter(b => b.status === "Confirmed").length / (courts.length * timeSlots.length)) * 100)}%
            </div>
            <div className="text-blue-700 font-medium">Court Utilization</div>
          </div>
        </div>
      </div>
    </div>
  );
}
