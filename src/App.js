import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar/NavBar';
import LoginForm from './components/login_form/LoginForm';

function App() {
  return (
    <div className="App">
      <NavBar />
      <LoginForm />
      <BrowserRouter>
        <Routes>
          <Route path="/"></Route> 
          {/* element={} */}
          <Route path=""></Route>
          <Route path=""></Route>
          <Route path=""></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
