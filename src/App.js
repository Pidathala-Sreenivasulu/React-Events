import './App.css';
import EventsComponent from './pages/Events';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

function App() {
  return (
    <div className="App">
      <EventsComponent />
    </div>
  );
}

export default App;
