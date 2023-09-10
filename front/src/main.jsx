import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import CartContextProvider from './context/addtoCart/context.jsx';
import ContextProvider from './usercontext/context.jsx';


export const GlobalContext = createContext("Initial Value")
const contextData = {
  username: "Maheen Ali"
}


ReactDOM.createRoot(document.getElementById('root')).render(
  

  <React.StrictMode>
    <GlobalContext.Provider value={{ contextData }}>
    <CartContextProvider>
      <BrowserRouter>
          <ContextProvider>
            <App/>
          </ContextProvider>
      </BrowserRouter>
    </CartContextProvider>
  </GlobalContext.Provider>
    </React.StrictMode>
)
