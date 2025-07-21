import { Archive, Calendar, Clock, Trash2 } from "lucide-react";
import type { IEvent, TCategory } from "../types/Event";

const EventCard = ({ event }: { event: IEvent }) => {
  const getCategoryColor = (category: TCategory) => {
    switch (category) {
      case "Work":
        return "bg-blue-100 text-blue-800";
      case "Personal":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className=" bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {event.title}
            </h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                event?.category
              )}`}
            >
              {event.category}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{event.time}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm">{event.notes}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Archive event"
          >
            <Archive size={18} />
          </button>
          <button
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete event"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
