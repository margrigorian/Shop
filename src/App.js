import style from './App.module.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar/NavBar';
import LoginForm from './components/login_form/LoginForm';
import RegistrationForm from './components/registration_form/RegistrationForm';
import SuccessRegistrationMessage from './components/registration_message/SuccessRegistrationMessage';

function App() {
  const [openRegistrationForm, setOpenRegistrationForm] = useState(false);
  const [successRegistrationMessage, setSuccessRegistrationMessage] = useState(false);

  function changeRegistrationMode() {
    setOpenRegistrationForm(!openRegistrationForm);
  }

  function getSuccessRegistrationMessage() {
    setSuccessRegistrationMessage(!successRegistrationMessage);
  }

  return (
    <div className="App">
      {
        openRegistrationForm && 
          <div className={style.modalRegistrationWindow}>
            {
              successRegistrationMessage === false ? 
                <RegistrationForm 
                  changeRegistrationMode={changeRegistrationMode}
                  getSuccessRegistrationMessage={getSuccessRegistrationMessage}
                /> : <SuccessRegistrationMessage 
                        getSuccessRegistrationMessage={getSuccessRegistrationMessage}
                        changeRegistrationMode={changeRegistrationMode}
                      />
            }  
          </div>  
      }
      <NavBar changeRegistrationMode={changeRegistrationMode} /> 
      {/* Функцию передать в подвижную панель, оттуда в LoginForm */}
      <LoginForm changeRegistrationMode={changeRegistrationMode}/>

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
