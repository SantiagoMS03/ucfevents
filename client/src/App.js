import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./routes/HomePage";
import { EventsContextProvider } from "./context/EventsContext";
import { RSOContextProvider } from "./context/RSOContext";
import EventsPage from "./routes/events/EventsPage";
import UniversityPage from './routes/universities/UniversityPage';
import EventDetailPage from "./routes/events/EventDetailPage";
import EditEventPage from "./routes/events/EditEventPage";
import CreateEventPage from "./routes/events/CreateEventPage";
import CreateUniversityPage from './routes/universities/CreateUniversityPage';
import EditUniversityPage from "./routes/universities/EditUniversityPage";
import UniversityDetailPage from "./routes/universities/UniversityDetailPage";
import UniversityList from './components/Universities/UniversityList';
import LogInPage from "./routes/user/LogInPage";
import RegisterPage from "./routes/user/RegisterPage";
import UserRegisterPage from "./routes/user/UserRegisterPage";
import AdminRegisterPage from "./routes/user/AdminRegisterPage";
import SuperAdminRegisterPage from "./routes/user/SuperAdminRegisterPage";

function App() {
  return (
    <EventsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/events" element={<EventsPage/>}/>
          <Route exact path="/universities" element={<UniversityPage/>}/>
          <Route exact path="/events/:eventid" element={<EventDetailPage/>}/>
          <Route exact path="/events/:eventid/edit" element={<EditEventPage/>}/>
          <Route exact path="/newevent" element={<CreateEventPage/>}/>
          <Route exact path="/newuniversity" element={<CreateUniversityPage/>}/>
          <Route exact path="/universities/:universityid/edit" element={<EditUniversityPage/>}/>
          <Route exact path="/universities/:universityid" element={<UniversityDetailPage/>}/>
          <Route exact path="/login" element={<LogInPage/>}/>
          <Route exact path="/register" element={<RegisterPage/>}/>
          <Route exact path="/register/user" element={<UserRegisterPage/>}/>
          <Route exact path="/register/admin" element={<AdminRegisterPage/>}/>
          <Route exact path="/register/superadmin" element={<SuperAdminRegisterPage/>}/>
        </Routes>
      </BrowserRouter>
    </EventsContextProvider>
  );
}

export default App;
