import { useEffect, useState } from "react";
import { Calendar, Clock, Plus, Trash2, Archive, X } from "lucide-react";
import type { IEvent } from "./types/Event";
import axios from "axios";
import NoEvent from "./components/NoEvent";
import EventCard from "./components/EventCard";
import Loading from "./components/Loading";

function App() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [archivedEvents, setArchivedEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  console.log(events);

  // etch events

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/v1/events");
        setEvents(res.data.data);
        // console.log(res.data.success);

        setLoading(false);
      } catch (err) {
        console.log("Failed to fetch events", err);
      }
    };

    fetchEvents();
  }, []);

  // const formatDate = (dateStr: string) => {
  //   const date = new Date(dateStr + "T00:00:00");
  //   return date.toLocaleDateString("en-US", {
  //     weekday: "short",
  //     month: "short",
  //     day: "numeric",
  //   });
  // };

  // const formatTime = (timeStr: string) => {
  //   const [hours, minutes] = timeStr.split(":");
  //   const date = new Date();
  //   date.setHours(parseInt(hours), parseInt(minutes));
  //   return date.toLocaleTimeString("en-US", {
  //     hour: "numeric",
  //     minute: "2-digit",
  //     hour12: true,
  //   });
  // };

  // loading animation

  if (loading) {
    return <Loading/>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Event Scheduler
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Event</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Active Events */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Upcoming Events
          </h2>
          {events?.length < 1 ? (
            <NoEvent />
          ) : (
            <div className="space-y-4">
              {events.map((event, i) => (
                <EventCard key={i} event={event} />
              ))}
            </div>
          )}
        </section>

        {/* Archived Events */}

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Archived Events
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-xl p-6 shadow-sm border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 opacity-75">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-700">
                      hkyub
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium `}
                    >
                      tnnukyh
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>muyon</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>uknyb</span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm">byfvy</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Unarchive event"
                  >
                    <Archive size={18} />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete event"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Add Event Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Add New Event
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Time *
                </label>
                <input
                  type="time"
                  id="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, time: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Optional notes about the event"
                />
              </div>

              <p className="text-sm text-gray-500">
                * Category will be automatically assigned based on event title
              </p>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? "Adding..." : "Add Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
