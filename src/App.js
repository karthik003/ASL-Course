import {
  BrowserRouter as Router,
  Routes, 
  Route,
} from "react-router-dom";
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Test1 from './pages/Tests/Test1'
import Lesson1 from "./pages/Lessons/Lesson1";
import Test2 from './pages/Tests/Test2'
import Lesson2 from "./pages/Lessons/Lesson2";
import Test3 from './pages/Tests/Test3'
import Lesson3 from "./pages/Lessons/Lesson3";

function App() {
  return (
  <Router>
    <div className="App">
      <header className="App-header">
        <Routes> 
          <Route exact path="/" element={<Login />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/lesson1" element={<Lesson1 />} /> 
          <Route path="/test1" element={<Test1 />} /> 
          <Route path="/lesson2" element={<Lesson2 />} /> 
          <Route path="/test2" element={<Test2 />} /> 
          <Route path="/lesson3" element={<Lesson3 />} /> 
          <Route path="/test3" element={<Test3 />} /> 

        </Routes>
      </header>
    </div>
  </Router>
  );
}

export default App;
