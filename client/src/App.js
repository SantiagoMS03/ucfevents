import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./routes/HomePage";
import { ContextProvider } from "./context/Context";
import { UniversityContextProvider } from "./context/UniversityContext";
import EventsPage from "./routes/events/EventsPage";
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

function App() {
  return (
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/home" element={<HomePage/>}/>
            <Route exact path="/newuniversity" element={<CreateUniversityPage/>}/>
            <Route exact path="/universities" element={<UniversitiesDirectory/>}/>

            <Route exact path="/universities/:universityid" element={<UniversityDetailPage/>}/>
            <Route exact path="/universities/:universityid/edit" element={<EditUniversityPage/>}/>
            <Route exact path="/universities/:universityid/newrso" element={<CreateRSOPage/>}/>
            {/* <Route exact path="/universities/:universityid/rsos/:rsoid" element={<RSODetailPage/>}/> */}
            <Route exact path="/universities/:universityid/rsos/:rsoid/events" element={<EventsPage/>}/>
            <Route exact path="/universities/:universityid/rsos/:rsoid/events/:eventid" element={<EventDetailPage/>}/>
            <Route exact path="/universities/:universityid/rsos/:rsoid/events/:eventid/edit" element={<EditEventPage/>}/>
            <Route exact path="/universities/:universityid/rsos/:rsoid//newevent" element={<CreateEventPage/>}/>

            <Route exact path="/welcome" element={<WelcomePage/>}/>
            <Route exact path="/login" element={<LogInPage/>}/>
            <Route exact path="/register" element={<RegisterPage/>}/>

            <Route exact path="/register/user" element={<UserRegisterPage/>}/>
            <Route exact path="/register/admin" element={<AdminRegisterPage/>}/>
            <Route exact path="/register/superadmin" element={<SuperAdminRegisterPage/>}/>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
  );
}

export default App;
