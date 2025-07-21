import { Archive, Calendar, Clock, Trash2 } from "lucide-react";
import type { IEvent, TCategory } from "../types/Event";

const EventCard = ({
  event,
  isArchived = false,
  handleArchiveEvent,
  handleDeleteEvent,
}: {
  event: IEvent;
  isArchived?: boolean;
  handleArchiveEvent?: (id: string) => void;
  handleDeleteEvent?: (id: string) => void;
}) => {
  const getCategoryColor = (category: TCategory) => {
    switch (category) {
      case "Work":
        return isArchived
          ? "bg-blue-50 text-blue-600"
          : "bg-blue-100 text-blue-800";
      case "Personal":
        return isArchived
          ? "bg-green-50 text-green-600"
          : "bg-green-100 text-green-800";
      default:
        return isArchived
          ? "bg-gray-50 text-gray-600"
          : "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className={`rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow ${
        isArchived ? "bg-gray-50 opacity-75" : "bg-white"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3
              className={`text-lg font-semibold ${
                isArchived ? "text-gray-600" : "text-gray-900"
              }`}
            >
              {event.title}
              {isArchived && (
                <span className="ml-2 text-xs text-gray-400">(Archived)</span>
              )}
            </h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                event?.category
              )}`}
            >
              {event.category}
            </span>
          </div>

          <div
            className={`flex items-center gap-4 text-sm mb-2 ${
              isArchived ? "text-gray-500" : "text-gray-600"
            }`}
          >
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{event.time}</span>
            </div>
          </div>

          {event.notes && (
            <p
              className={`text-sm ${
                isArchived ? "text-gray-500" : "text-gray-600"
              }`}
            >
              {event.notes}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isArchived && (
            <button
              className="p-2 rounded-lg transition-colors text-gray-400 hover:text-blue-500 hover:bg-blue-50"
              title={"Archive event"}
              onClick={() => handleArchiveEvent?.(event._id)}
            >
              <Archive size={18} />
            </button>
          )}
          <button
            className={`p-2 rounded-lg transition-colors ${
              isArchived
                ? "text-gray-400 hover:text-red-500 hover:bg-red-50"
                : "text-gray-500 hover:text-red-600 hover:bg-red-50"
            }`}
            title="Delete event"
            onClick={() => handleDeleteEvent?.(event._id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
