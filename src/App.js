import style from './App.module.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectBasket } from './store/slices/slice-basket';
import NavBar from './components/navbar/NavBar';
import Menu from './components/menu/Menu';
import LoginDrawer from './components/login_drawer/LoginDrawer';
import RegistrationForm from './components/registration_form/RegistrationForm';
import SuccessRegistrationMessage from './components/registration_message/SuccessRegistrationMessage';
import BasketDrawer from './components/basket_drawer/BasketDrawer';
import StartPage from './pages/start_page/StartPage';
import LimitedEditionPage from './pages/limited_edition_page/LimitedEditionPage';
import ProductPage from './pages/product_page/ProductPage';
import SearchNavBar from './components/search_navbar/SearchNavBar';
import SearchPage from './pages/search_page/SearchPage';
import BasketNavBar from './components/basket_navbar/BasketNavBar';
import BasketPage from './pages/basket_page/BasketPage';
import ScrollToTheTop from './hoc/ScrollToTheTop';
import Footer from './components/footer/Footer';
import request from './store/request/request';
import { Modal, ThemeProvider } from '@mui/material';
import theme from './theme/theme';


function App() {
  const token = useSelector(selectBasket);
  const [openMenu, setOpenMenu] = useState(false);
  const [openLoginDrawer, setOpenLoginDrawer] = useState(false);
  const [openRegistrationForm, setOpenRegistrationForm] = useState(false);
  const [successRegistrationMessage, setSuccessRegistrationMessage] = useState(false);
  const [openBasketDrawer, setOpenBasketDrawer] = useState(false);
  const [searchNavBar, setSearchNavBar] = useState(false);
  const [basketNavBar, setBasketNavBar] = useState(false);
  const [searchProducts, setSearchProducts] = useState([]);

  function changeRegistrationMode() {
    setOpenRegistrationForm(!openRegistrationForm);
  }

  async function getSearchProducts(inputText) {
    // const products = await request("POST", searchProductLink(inputText), undefined, token.token);
    // setSearchProducts(products);
  }

  function getSuccessRegistrationMessage() {
    setSuccessRegistrationMessage(!successRegistrationMessage);
  }

  // function getSearchProducts(inputText) {
  //   const filterProducts = allRequestProducts.filter(item => item.title.indexOf(inputText) !== -1);
  //   setSearchProducts(filterProducts);
  // }
  
  return (
    <div className="App">
      <BrowserRouter>

        <NavBar 
          openMenu={() => setOpenMenu(true)}
          openLoginDrawer={() => setOpenLoginDrawer(true)} 
          openBasketDrawer={() => setOpenBasketDrawer(true)} 
          openSearchNavBar={setSearchNavBar}
        /> 
        
        {
          openMenu && <Menu closeMenu={() => setOpenMenu(false)} setSearchNavBar={setSearchNavBar} />
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
              {
                successRegistrationMessage === false ? 
                  <RegistrationForm 
                    closeCart={() => setOpenLoginDrawer(false)} 
                    changeRegistrationMode={changeRegistrationMode}
                    getSuccessRegistrationMessage={getSuccessRegistrationMessage}
                    // getToken={getToken}
                  /> : <SuccessRegistrationMessage 
                          getSuccessRegistrationMessage={getSuccessRegistrationMessage}
                          changeRegistrationMode={changeRegistrationMode}
                        />
              }  
            </Modal>  
        }

        <BasketDrawer 
          openCart={openBasketDrawer} 
          closeCart={() => setOpenBasketDrawer(false)} 
          changeStatusOfBasketNavBar={setBasketNavBar}
        />

        {
          searchNavBar && <SearchNavBar  closeSearchNavBar={setSearchNavBar} getSearchProducts={getSearchProducts} />
        }

        {
          basketNavBar && <BasketNavBar  closeBasketNavBar={setBasketNavBar} />
        } 

        <ScrollToTheTop />

        <Routes>
          <Route path="/" element={<StartPage />}></Route> 
          <Route path="/collection"></Route>
          <Route path="/limited-edition-page" element={<LimitedEditionPage />}></Route>
          <Route path="/product/:id" element={<ProductPage openBasketNavBar={setBasketNavBar}/>}></Route>
          <Route path="/search" element={<SearchPage closeSearchNavBar={setSearchNavBar} searchProducts={searchProducts} />}></Route>
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
