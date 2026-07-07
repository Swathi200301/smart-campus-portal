"use client";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Plus, Users } from "lucide-react";
import { Badge, getStatusBadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { events } from "@/lib/data";

export default function EventsPage() {
  const [eventsData, setEventsData] = useState(events);

const [showForm, setShowForm] = useState(false);

const [title, setTitle] = useState("");
const [category, setCategory] = useState("");
const [description, setDescription] = useState("");
const [location, setLocation] = useState("");
const [date, setDate] = useState("");
const [time, setTime] = useState("");

const [search, setSearch] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");
  

  const categoryColors: Record<string, string> = {
    Technical: "bg-blue-100 text-blue-700",
    Career: "bg-emerald-100 text-emerald-700",
    Academic: "bg-violet-100 text-violet-700",
    Cultural: "bg-pink-100 text-pink-700",
  };
  useEffect(() => {
    const saved = localStorage.getItem("events");
  
    if (saved) {
      setEventsData(JSON.parse(saved));
    }
  }, []);
  
  const upcoming = eventsData.filter(
    (event) => event.status === "upcoming"
  ).length;
  
  const ongoing = eventsData.filter(
    (event) => event.status === "ongoing"
  ).length;
  
  const completed = eventsData.filter(
    (event) => event.status === "completed"
  ).length;
  
  const totalAttendees = eventsData.reduce(
    (sum, event) => sum + event.attendees,
    0
  );
  
  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());
  
    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;
  
    return matchesSearch && matchesCategory;
  });
  
  const handleCreateEvent = () => {
    const newEvent = {
      id: `EV${Date.now()}`,
      title,
      description,
      category,
      location,
      date,
      time,
      attendees: 0,
      status: "upcoming",
    };
  
    const updated = [...eventsData, newEvent];
  
    setEventsData(updated);
  
    localStorage.setItem(
      "events",
      JSON.stringify(updated)
    );
  
    setTitle("");
    setDescription("");
    setCategory("");
    setLocation("");
    setDate("");
    setTime("");
  
    setShowForm(false);
  };
  
  const deleteEvent = (id: string) => {
    const updated = eventsData.filter(
      (event) => event.id !== id
    );
  
    setEventsData(updated);
  
    localStorage.setItem(
      "events",
      JSON.stringify(updated)
    );
  };
  return (
    <div>
      <PageHeader
        title="Event Management"
        description="Create, manage, and track campus events and activities."
        actions={
          <button
  type="button"
  onClick={() => setShowForm(true)}
  className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
>
            <Plus className="h-4 w-4" />
            Create Event
          </button>
        }
      />
      {showForm && (
  <Card className="mb-6 p-5">
    <h2 className="mb-4 text-lg font-semibold">
      Create New Event
    </h2>

    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Event Title"
      className="mb-2 w-full rounded border p-2"
    />

<select
value={category}
onChange={(e) => setCategory(e.target.value)}
className="mb-2 w-full rounded border p-2"
>
  <option value="">Select Category</option>
  <option>Technical</option>
  <option>Career</option>
  <option>Academic</option>
  <option>Cultural</option>
</select>

    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Description"
      className="mb-2 w-full rounded border p-2"
    />

    <input
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      placeholder="Location"
      className="mb-2 w-full rounded border p-2"
    />

    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="mb-2 w-full rounded border p-2"
    />

    <input
      type="time"
      value={time}
      onChange={(e) => setTime(e.target.value)}
      className="mb-4 w-full rounded border p-2"
    />

    <div className="flex gap-3">
      <button
        onClick={handleCreateEvent}
        className="rounded bg-green-600 px-4 py-2 text-white"
      >
        Save Event
      </button>

      <button
        onClick={() => setShowForm(false)}
        className="rounded bg-gray-500 px-4 py-2 text-white"
      >
        Cancel
      </button>
    </div>
  </Card>
)}
<input
  type="text"
  placeholder="Search Event..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="mb-4 w-full rounded-lg border p-2"
/>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Events"
          value={eventsData.length}
          icon={Calendar}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatCard
          title="Upcoming"
          value={upcoming}
          icon={Calendar}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Ongoing"
          value={ongoing}
          icon={Calendar}
          iconColor="text-violet-600"
          iconBg="bg-violet-50"
        />
        <StatCard
          title="Total Attendees"
          value={totalAttendees.toLocaleString()}
          icon={Users}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {["All", "Technical", "Career", "Academic", "Cultural"].map((cat) => (
          <button
          key={cat}
          type="button"
          onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card key={event.id} hover className="flex flex-col">
            <div className="mb-4 flex items-start justify-between">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  categoryColors[event.category] ?? "bg-slate-100 text-slate-700"
                }`}
              >
                {event.category}
              </span>
              <Badge variant={getStatusBadgeVariant(event.status)}>
                {event.status}
              </Badge>
            </div>

            <h3 className="mb-2 text-lg font-semibold text-slate-900">{event.title}</h3>
            <p className="mb-4 flex-1 text-sm text-slate-500 line-clamp-2">
              {event.description}
            </p>

            <div className="space-y-2 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="h-4 w-4 text-slate-400" />
                {event.date} · {event.time}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-slate-400" />
                {event.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users className="h-4 w-4 text-slate-400" />
                {event.attendees} registered
              </div>
            </div>
            <button
type="button"
onClick={() => alert(event.description)}
className="mt-4 w-full rounded-lg border border-indigo-200 bg-indigo-50 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
>
View Details
</button>
          </Card>
        ))}
      </div>
    </div>
  );
}
