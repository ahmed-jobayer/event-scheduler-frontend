import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import type { IEvent } from "./types/Event";
import axios from "axios";
import NoEvent from "./components/NoEvent";
import EventCard from "./components/EventCard";
import Loading from "./components/Loading";
import AddEventModal from "./components/AddEventModal";
import Swal from "sweetalert2";

function App() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [archivedEvents, setArchivedEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  console.log({ events });
  console.log({ archivedEvents });

  // event fetching function

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/v1/events");
      const allEvents: IEvent[] = res.data.data;

      // /seperate events by archived status

      const active = allEvents.filter((event) => !event.archived);
      const archived = allEvents.filter((event) => event.archived);

      setEvents(active);
      setArchivedEvents(archived);

      // console.log(res.data.success);

      setLoading(false);
    } catch (err) {
      console.log("Failed to fetch events", err);
    }
  };

  // fetch events

  useEffect(() => {
    fetchEvents();
  }, []);

  // archive event

  const handleArchiveEvent = async (id: string) => {
    Swal.fire({
      title: "Do you want to archive this event?",
      showDenyButton: true,
      confirmButtonText: "Archive",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await axios.put(
          `http://localhost:5000/api/v1/events/${id}`
        );
        // console.log(res);
        if (res.data.success) {
          Swal.fire({
            title: "Event archived successfully",
            icon: "success",
            timer: 2000,
          });
          // refetch the fresh data
          fetchEvents();
        }
      } else if (result.isDenied) {
        Swal.fire({
          title: "Not archived",
          icon: "error",
          timer: 1000,
        });
      }
    });
  };
  // delete event

  const handleDeleteEvent = async (id: string) => {
    Swal.fire({
      title: "Do you want to delete this event?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await axios.delete(
          `http://localhost:5000/api/v1/events/${id}`
        );
        console.log(res);
        if (res.data.success) {
          Swal.fire({
            title: "Event deleted successfully",
            icon: "success",
            timer: 2000,
          });
          // refetch the fresh data
          fetchEvents();
        }
      } else if (result.isDenied) {
        Swal.fire({
          title: "Not deleted",
          icon: "error",
          timer: 1000,
        });
      }
    });
  };

  // loading animation

  if (loading) {
    return <Loading />;
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
                <EventCard
                  key={i}
                  event={event}
                  isArchived={false}
                  handleArchiveEvent={handleArchiveEvent}
                  handleDeleteEvent={handleDeleteEvent}
                />
              ))}
            </div>
          )}
        </section>

        {/* Archived Events */}

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Archived Events
          </h2>

          {archivedEvents?.length < 1 ? (
            <NoEvent />
          ) : (
            <div className="space-y-4">
              {archivedEvents.map((event, i) => (
                <EventCard
                  key={i}
                  event={event}
                  isArchived={true}
                  handleDeleteEvent={handleDeleteEvent}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Add Event Modal */}
      {showForm && (
        <AddEventModal setShowForm={setShowForm} fetchEvents={fetchEvents} />
      )}
    </div>
  );
}

export default App;
