import style from './App.module.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar/NavBar';
import Menu from './components/menu/Menu';
import LoginDrawer from './components/login_drawer/LoginDrawer';
import RegistrationForm from './components/registration_form/RegistrationForm';
import SuccessRegistrationMessage from './components/registration_message/SuccessRegistrationMessage';
import BasketDrawer from './components/basket_drawer/BasketDrawer';
import StartPage from './pages/start_page/StartPage';
import LimitedEditionPage from './pages/limited_edition_page/LimitedEditionPage';
import ProductPage from './pages/product_page/ProductPage';
import BasketNavBar from './components/basket_navbar/BasketNavBar';
import BasketPage from './pages/basket_page/BasketPage';
import ScrollToTheTop from './hoc/ScrollToTheTop';
import Footer from './components/footer/Footer';
import { Modal, ThemeProvider } from '@mui/material';
import theme from './theme/theme';


function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openLoginDrawer, setOpenLoginDrawer] = useState(false);
  const [openRegistrationForm, setOpenRegistrationForm] = useState(false);
  const [successRegistrationMessage, setSuccessRegistrationMessage] = useState(false);
  const [openBasketDrawer, setOpenBasketDrawer] = useState(false);
  const [basketNavBar, setBasketNavBar] = useState(false);

  function changeRegistrationMode() {
    setOpenRegistrationForm(!openRegistrationForm);
  }

  function getSuccessRegistrationMessage() {
    setSuccessRegistrationMessage(!successRegistrationMessage);
  }
  
  return (
    <div className="App">
      <BrowserRouter>

        <NavBar 
          openMenu={() => setOpenMenu(true)}
          openLoginDrawer={() => setOpenLoginDrawer(true)} 
          openBasketDrawer={() => setOpenBasketDrawer(true)} 
        /> 
        
        {
          openMenu && <Menu closeMenu={() => setOpenMenu(false)} />
        }
        
        <LoginDrawer 
          openCart={openLoginDrawer} 
          closeCart={() => setOpenLoginDrawer(false)} 
          openRegistrationForm={openRegistrationForm}
          changeRegistrationMode={changeRegistrationMode}
        />

        {
          openRegistrationForm &&
            <Modal open className={style.modalRegistrationWindow} onClose={() => setOpenRegistrationForm(false)}
              sx={{top: 0}}
            >
              <div >
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
            </Modal>  
        }

        <BasketDrawer 
          openCart={openBasketDrawer} 
          closeCart={() => setOpenBasketDrawer(false)} 
          changeStatusOfBasketNavBar={setBasketNavBar}
        />

        {
          basketNavBar && <BasketNavBar  closeBasketNavBar={setBasketNavBar} />
        }

        <ScrollToTheTop />

        <Routes>
          <Route path="/" element={<StartPage />}></Route> 
          <Route path="/collection"></Route>
          <Route path="/limited-edition-page" element={<LimitedEditionPage />}></Route>
          <Route path="/product/:id" element={<ProductPage openBasketNavBar={setBasketNavBar}/>}></Route>
          <Route path="/basket" element={<BasketPage closeBasketNavBar={setBasketNavBar} />}></Route>
        </Routes>

        <div className={style.wrapper}>
          <div className={style.content}></div>
          <Footer />
        </div>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
