import AddEvent from "./components/events/AddEvent";
import LogInPage from "./components/login/LogInPage"

function App() {
  return (
  <div className="App">
    UCF Events!
    <div>
      <AddEvent/>
      <LogInPage/>
    </div>
  </div>
  );
}

export default App;
