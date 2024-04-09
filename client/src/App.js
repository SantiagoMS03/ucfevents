import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./routes/HomePage";
import { ContextProvider } from "./context/Context";
import { UniversityContextProvider } from "./context/UniversityContext";
import EventsPage from "./routes/events/EventsPage";
import PublicEventsPage from "./routes/events/PublicEventsPage";
import PrivateEventsPage from "./routes/events/PrivateEventsPage";
import RSOEventsPage from "./routes/events/RSOEventsPage";
import UniversitiesDirectory from './routes/universities/UniversitiesDirectory';
import EventDetailPage from "./routes/events/EventDetailPage";
import EditEventPage from "./routes/events/EditEventPage";
import CreateEventPage from "./routes/events/CreateEventPage";
import CreateRSOPage from './routes/rsos/CreateRSOPage';
import CreateUniversityPage from './routes/universities/CreateUniversityPage';
import EditUniversityPage from "./routes/universities/EditUniversityPage";
import UniversityDetailPage from "./routes/universities/UniversityDetailPage";
import LogInPage from "./routes/user/LogInPage";
import RegisterPage from "./routes/user/RegisterPage";
import UserRegisterPage from "./routes/user/UserRegisterPage";
import AdminRegisterPage from "./routes/user/AdminRegisterPage";
import SuperAdminRegisterPage from "./routes/user/SuperAdminRegisterPage";
import WelcomePage from "./routes/WelcomePage";
import RSOsPage from './routes/rsos/RSOsPage';
import EditReview from "./components/events/EditReview"

function App() {
  return (
      <ContextProvider>
        <UniversityContextProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<HomePage/>}/>
              <Route exact path="/home" element={<HomePage/>}/>
              <Route exact path="/newuniversity" element={<CreateUniversityPage/>}/>
              <Route exact path="/universities" element={<UniversitiesDirectory/>}/>

              <Route exact path="/universities/:universityid" element={<UniversityDetailPage/>}/>
              <Route exact path="/universities/:universityid/edit" element={<EditUniversityPage/>}/>
              <Route exact path="/newrso" element={<CreateRSOPage/>}/>
              <Route exact path="/rsos" element={<RSOsPage/>}/>
              <Route exact path="/events" element={<EventsPage/>}/>
              <Route exact path="/publicevents" element={<PublicEventsPage/>}/>
              <Route exact path="/privateevents" element={<PrivateEventsPage/>}/>
              <Route exact path="/rsoevents" element={<RSOEventsPage/>}/>
              <Route exact path="/events/:eventid" element={<EventDetailPage/>}/>
              <Route exact path="/events/:eventid/edit" element={<EditEventPage/>}/>
              <Route exact path="/newevent/:rsoid" element={<CreateEventPage/>}/>
              <Route exact path="/events/:eventid/:reviewid" element={<EditReview/>}/>

              <Route exact path="/welcome" element={<WelcomePage/>}/>
              <Route exact path="/login" element={<LogInPage/>}/>
              <Route exact path="/register" element={<RegisterPage/>}/>

              <Route exact path="/register/user" element={<UserRegisterPage/>}/>
              <Route exact path="/register/admin" element={<AdminRegisterPage/>}/>
              <Route exact path="/register/superadmin" element={<SuperAdminRegisterPage/>}/>
            </Routes>
          </BrowserRouter>
        </UniversityContextProvider>
      </ContextProvider>
  );
}

export default App;
