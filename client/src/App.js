// import AddEvent from "./components/events/AddEvent";
// import LogInPage from "./components/login/LogInPage"
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./routes/HomePage";
import { EventsContextProvider } from "./context/EventsContext";
import EventsPage from "./routes/events/EventsPage";
import EventDetailPage from "./routes/events/EventDetailPage";
import EditEventPage from "./routes/events/EditEventPage";
import CreateEventPage from "./routes/events/CreateEventPage";
import CreateRSOPage from './routes/rsos/CreateRSOPage';

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

          <Route exact path="/newrso" element={<CreateRSOPage/>}/>
          {/* <Route exact path="/rsos/:rsoid" element={<RSODetailPage/>}/> */}

        </Routes>
      </BrowserRouter>
    </EventsContextProvider>
  );
}

export default App;
