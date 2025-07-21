import { Calendar } from "lucide-react";

const NoEvent = () => {
    return (
        <div className="bg-white rounded-xl p-8 text-center">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">
                No upcoming events. Create your first event!
              </p>
            </div>
    );
};

export default NoEvent;