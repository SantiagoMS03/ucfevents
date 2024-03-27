import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./routes/HomePage";
import { EventsContextProvider } from "./context/EventsContext";
import EventsPage from "./routes/events/EventsPage";
import EventDetailPage from "./routes/events/EventDetailPage";
import EditEventPage from "./routes/events/EditEventPage";
import CreateEventPage from "./routes/events/CreateEventPage";
import LogInPage from "./routes/user/LogInPage";
import RegisterPage from "./routes/user/RegisterPage";

function App() {
  return (
    <EventsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/events" element={<EventsPage/>}/>
          <Route exact path="/events/:eventid" element={<EventDetailPage/>}/>
          <Route exact path="/events/:eventid/edit" element={<EditEventPage/>}/>
          <Route exact path="/newevent" element={<CreateEventPage/>}/>
          <Route exact path="/login" element={<LogInPage/>}/>
          <Route exact path="/register" element={<RegisterPage/>}/>
        </Routes>
      </BrowserRouter>
    </EventsContextProvider>
  );
}

export default App;
