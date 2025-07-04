import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ScheduleClubNight() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation or data handling can be added here
    console.log({ title, date, time, location, description, maxParticipants });
    // In a real app, you'd send this data to a backend
    // For now, let's navigate back to club nights page after "submission"
    alert('Club Night Scheduled (Simulated)!');
    navigate('/club-nights');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Schedule New Club Night</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Friday Night Social"
            required
            className="mt-1 block w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <Label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="mt-1 block w-full"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</Label>
          <Input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Main Hall - Courts 1 & 2"
            required
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <Label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-1">Max Participants</Label>
          <Input
            id="maxParticipants"
            type="number"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            placeholder="e.g., 20"
            min="1"
            required
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a brief description of the club night..."
            rows={4}
            className="mt-1 block w-full"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/club-nights')}>
            Cancel
          </Button>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
            Schedule Club Night
          </Button>
        </div>
      </form>
    </div>
  );
}
