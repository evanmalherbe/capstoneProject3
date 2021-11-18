/* React task - Level 2 task 12 - Capstone project - Minesweeper game */ 

// Import bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Import custom stylesheet
import './App.css';

// Import Components for React-Router (to display certain components based on the URL the user chooses)
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

// Import components
import Header from './Components/Header';
import Welcome from './Components/Welcome';
import Help from './Components/Help';
import Gameboard from './Components/Gameboard';

function App() {
  return (
    <div className="App">   
      <BrowserRouter>
            <Header />

            <Routes> 
              <Route exact={true} path="/" element={<Welcome />} />
              <Route path="/Gameboard" element={<Gameboard />} />
              <Route path="/Help" element={<Help />} />
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
