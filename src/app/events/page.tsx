"use client";

import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockEvents = [
  {
    id: 1,
    title: "Tech Conference 2026",
    description:
      "Join us for the biggest tech conference of the year with industry leaders and innovators.",
    date: "March 15, 2026",
    time: "9:00 AM - 6:00 PM",
    location: "Convention Center, Downtown",
    attendees: 1200,
    status: "Registered",
    image: "🚀",
  },
  {
    id: 2,
    title: "Design Workshop",
    description:
      "Learn the latest design trends and techniques from professional designers.",
    date: "March 22, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Creative Hub, Arts District",
    attendees: 45,
    status: "Confirmed",
    image: "🎨",
  },
  {
    id: 3,
    title: "Startup Networking Event",
    description:
      "Connect with entrepreneurs, investors, and fellow startup enthusiasts.",
    date: "April 5, 2026",
    time: "6:00 PM - 9:00 PM",
    location: "Innovation Center",
    attendees: 200,
    status: "Waiting List",
    image: "🤝",
  },
];

export default function EventsPage() {
  const browseEvents = () => {
    console.log("Browse events");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">My Events</h1>
        <Button
          onClick={browseEvents}
          variant="outline"
          className="border border-neutral-300 text-neutral-700 font-medium px-4 py-2 rounded-xl hover:bg-neutral-50 transition-colors"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Browse Events
        </Button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <Card
            key={event.id}
            className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-3">
                <div className="text-3xl">{event.image}</div>
                <Badge
                  variant={
                    event.status === "Confirmed"
                      ? "default"
                      : event.status === "Waiting List"
                        ? "secondary"
                        : "outline"
                  }
                  className="text-xs"
                >
                  {event.status}
                </Badge>
              </div>
              <CardTitle className="text-lg font-semibold text-neutral-900 mt-2">
                {event.title}
              </CardTitle>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {event.description}
              </p>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Calendar className="w-4 h-4 text-neutral-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Users className="w-4 h-4 text-neutral-400" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 text-sm border border-neutral-300 hover:bg-neutral-50"
                >
                  View Details
                </Button>
                <Button className="flex-1 text-sm bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white">
                  Check In
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
