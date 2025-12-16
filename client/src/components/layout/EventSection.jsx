import React from "react";
import eventsImg from "../../assets/events-img.png";
const EventSection = ({ events = [] }) => {
  if (events.length === 0) return null;
  return (
    <section className="px-8 py-20" id="events">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-6 text-white">
          Events
        </h2>
        <p className="text-center text-gray-400 mb-20 text-lg">
          There are regular events in our pizzeria that will allow you to eat
          delicious food for a lower price!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`relative rounded-3xl overflow-hidden shadow-2xl transform transition hover:scale-105 ${
                index % 2 === 1 ? "lg:-mt-12" : "lg:mt-12"
              } ${
                index % 3 === 1
                  ? "lg:rotate-3"
                  : index % 3 === 2
                  ? "lg:-rotate-3"
                  : ""
              }`}
            >
              <div className="h-64 relative">
                <img
                  src={event.image_url || eventsImg}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
              </div>

              <div className="p-8 absolute bottom-0 left-0 right-0 text-white">
                <h3 className="text-3xl font-bold mb-4">{event.title}</h3>
                <p className="text-gray-300 mb-6 line-clamp-3">
                  {event.description || "Join us for this amazing event!"}
                </p>
                <button className="px-6 py-3 bg-orange-500 rounded-full font-semibold hover:bg-orange-600 transition">
                  {event.button_text || "More"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSection;
