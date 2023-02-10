import './App.css';
import {
  BrowserRouter as Router
} from "react-router-dom";

import Main from './pages/Main';


function App() {
  

  

  return (
    <div className="app">
      <Router>
<Main/>
      </Router>
     
      
    </div>
  );
}

export default App;
