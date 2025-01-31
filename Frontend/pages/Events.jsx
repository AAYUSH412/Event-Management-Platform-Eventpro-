import Header from '../src/components/events/Header';
import EventsList from '../src/components/events/Eventslist';


const Events = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <EventsList />
    </div>
  );
};

export default Events;